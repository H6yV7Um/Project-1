import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Table, Button, Modal, Input, Form, Row, Col, message } from 'antd';
import {injectReducer} from 'store/reducers';
import Icon from 'components/Icon';
import ToastContent from 'components/ToastContent';
import Pattern from 'config/pattern';
import {hostName} from 'config/wechat';
import $ from 'jquery';

import {getJobType, addJobType, deleteJobType} from './action';

import './style.scss';

const FormItem = Form.Item;
const confirm = Modal.confirm;


// 面试综合信息
class JobTypeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobTypeModal             :   false,
            isCallCheck             :   false
        };

        this.hideItems = [];
        this.error = null;
        this.values = null;
        // 表格的列定义
        this.columns = [{
            title : 'Name',
            dataIndex : 'name',
            key : 'name',
            width : '50%'
        }, {
            title : 'Action',
            key : 'action',
            width : '50%',
            render : (text, record) => (
                <span>
      <a onClick={() => {this.handleDelete(record)}}>删除</a>
    </span>
            ),
        }];
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };
        // 表单相关
        this.formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };
        this.formTailLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8, offset: 4 },
        };
    }

    componentDidMount() {

    }

    componentWillMount() {
        // 获取职位分类
        this.props.getJobType();
    }

    componentWillUnmount() {
    }

    showMessage = (type, content) => {
        let res = null;
        switch (type) {
            case 'success':
                res = content || '面试官已经收到您的消息'+"\r\n"+'请在大厅就坐等待面试!';
                Toast.info(<ToastContent type="success" content={res} />, 2, null, false);
                break;
            case 'error':
                res = content || '网络开小差了!请刷新后重试!';
                Toast.info(<ToastContent type="fail" content={res} />, 2, null, false);
                break;
        }
    }

    // 点击pc端模态框确认按钮
    handleOk = () => {
        this.check();
    }

    // 点击pc端返回按钮
    handleCancel = () => {
        this.setState({ jobTypeModal: false });
    }

    // 添加事件
    handleAdd = () => {
        this.setState({ jobTypeModal: true })
    }

    // 消息提示
    message = (type, msg = '这是一条提示信息') => {
        switch (type) {
            case 'success':
                message.success(msg);
                break;
            case 'error':
                message.error(msg);
                break;
        }
    }

    // 表单检验
    check = () => {
        this.props.form.validateFields(
            (err, values) => {
                console.log(err)
                if (!err) {
                    this.setState({ jobTypeModal: false });
                    this.props.addJobType(values, () => {
                        setTimeout(()=> {
                            this.props.getJobType();
                            this.message('success', '新增岗位分类成功');
                        }, 10);
                    });
                }
            },
        );
    }

    deleteJobType = record => {
        this.props.deleteJobType(record._id, () => {
            this.props.getJobType();
            this.message('success', '删除成功');
        })
    }

    handleDelete = record => {
        let deleteJobType = this.deleteJobType.bind(this);
        confirm({
            title: `您确认要删除 ${record.name} 这个分类吗?`,
            content: '该分类删除后, 所有属于该分类的岗位都会被删除!请谨慎操作!',
            onOk() {
                deleteJobType(record);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        let jobTypeInfo = [],
            jobInfo = [],
            jobTypes = [];
        const {getFieldDecorator} = this.props.form;

        // 格式化职位类型数据
        if (this.props.reducer.jobType) {
            this.props.reducer.jobType.map((v, k) => {
                let jobType = {
                    _id : v._id,
                    key : k + 1,
                    name : v.name
                }
                jobTypeInfo.push(jobType);
            })
        }

        return(
            <div className="Recruit-BackStage-JobType">
                <div className="btns-job-type-container">
                    <Button type="primary" onClick={this.handleAdd}>
                        <Icon className="icon" type="plus" style={{color: '#fff'}}>&nbsp;新增岗位类别</Icon>
                    </Button>
                </div>
                <div className="table-job-type-container">
                    <Table columns={this.columns} dataSource={jobTypeInfo}  scroll={{ y: 340 }}/>
                </div>
                {/*职位类别模态框*/}
                <Modal
                    visible={this.state.jobTypeModal}
                    title={'新增岗位类别'}
                    onOk={() => {this.handleOk}}
                    className={'jobTypeModal'}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" size="large" onClick={this.handleCancel}>关闭</Button>,
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确认</Button>,
                    ]}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem {...this.formItemLayout} label="类别名称">
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '职位类别名称不能为空!'} ],
                                })(<Input style={{width:'100%'}} placeholder="请输入职位类别名称" />)}
                            </FormItem>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.recruitJobType,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    getJobType, addJobType, deleteJobType
}

const JobType = Form.create()(JobTypeForm);

export default store => ({
    path: 'backstage/jobtype',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'recruitJobType', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(JobType));
        })
    }
})