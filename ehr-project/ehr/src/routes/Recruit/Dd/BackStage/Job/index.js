import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Table, Button, Modal, Input, Form, Row, Col, message, Select} from 'antd';
import {injectReducer} from 'store/reducers';
import UserProfile from 'appComponents/Recruit/UserProfile';
import Interview from 'appComponents/Recruit/Interview';
import ScrollLoad from 'components/ScrollLoad';
import Icon from 'components/Icon';
import ToastContent from 'components/ToastContent';
import getSrc from 'utils/imgSrc';
import browserAttr from 'utils/browserAttr';
import Pattern from 'config/pattern';
import {hostName} from 'config/wechat';
import $ from 'jquery';
import 'jquery-easing';

import {addJob, getJob, deleteJob, getJobType, addJobType, deleteJobType} from './action';

import './style.scss';

const FormItem = Form.Item;
const confirm = Modal.confirm;


class JobForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobModal                :   false,
            title                   :   null
        };

        this.hideItems = [];
        this.error = null;
        this.values = null;

        // 表格列定义
        this.jobColumns = [{
            title : 'Name',
            dataIndex : 'name',
            key : 'name',
            width : '20%'
        }, {
            title : 'Type',
            dataIndex : 'job_type_id',
            key : 'job_type_id',
            width : '40%'
        },{
            title : 'Action',
            key : 'action',
            width : '40%',
            render : (text, record) => (
                <span>
      <a onClick={() => {this.handleDelete(record)}}>删除</a>
    </span>
            ),
        }];
    }

    componentDidMount() {

    }

    componentWillMount() {
        // 获取职位列表
        this.props.getJob();
        // 获取职位分类
        this.props.getJobType();
    }

    componentWillUnmount() {
    }


    deleteJob = record => {
        this.props.deleteJob(record._id, () => {
            this.props.getJob();
            this.message('success', '删除成功');
        })
    }

    handleDelete = record => {
        let deleteJob = this.deleteJob.bind(this);
        confirm({
            title: `您确认要删除 ${record.name} 这个岗位吗?`,
            content: '确认后该信息将被删除!请谨慎操作!',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteJob(record);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
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

    getJobTypeById = id => {
        let res = null
        if(this.props.reducer.jobType) {
            this.props.reducer.jobType.map(v => {
                if(v._id == id) {
                    res = v.name;
                }
            })
        }
        return res;
    }

    // 点击pc端模态框确认按钮
    handleOk = () => {
        this.check();
    }

    // 点击pc端返回按钮
    handleCancel = () => {
        this.setState({jobModal : false});
    }


    handleAdd = () => {
        this.setState({jobModal : true});
    }

    // 表单检验
    check = () => {
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    this.setState({jobModal : false});
                    this.props.addJob(values, () => {
                        this.props.getJob();
                        setTimeout(()=> {
                            this.message('success', '新增职位成功');
                        }, 10);
                    });
                }
            },
        );
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

        // 格式化职位数据
        if(this.props.reducer.jobs) {
            this.props.reducer.jobs.map((v, k) => {
                let job = {
                    _id : v._id,
                    key : k + 1,
                    name : v.name,
                    job_type_id : this.getJobTypeById(v.job_type_id)
                }
                jobInfo.push(job);
            })
        }

        // 格式化选择器数据
        if(this.props.reducer.jobType) {
            this.props.reducer.jobType.map((v, k) => {
                let item = (<Select.Option value={v._id} key={k}>{v.name}</Select.Option>);
                jobTypes.push(item);
            })
        }

        return (
            <div className="Recruit-BackStage-Job">
                <div className="btns-job-container">
                    <Button type="primary" onClick={() => {this.handleAdd('job')}}>
                        <Icon className="icon" type="plus" style={{color : '#fff'}}>&nbsp;添加职位</Icon>
                    </Button>
                </div>
                <div className="table-job-container">
                    <Table columns={this.jobColumns} dataSource={jobInfo} scroll={{y : 340}}/>
                </div>

                {/*职位模态框*/}
                <Modal
                    visible={this.state.jobModal}
                    title={'新增职位'}
                    onOk={this.handleOk}
                    className={'jobModal'}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" size="large" onClick={this.handleCancel}>关闭</Button>,
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确认</Button>,
                    ]}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem {...this.formItemLayout} label="职位名称">
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '职位名称不能为空!'}],
                                })(<Input placeholder="请输入职位名称" />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem {...this.formItemLayout} label="职位类别">
                                {getFieldDecorator('job_type_id', {
                                    rules: [{required: true, message: '职位类别不能为空!'}],
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder={'请选择职位类别'}
                                        optionFilterProp="children"
                                        onChange={value => {
                                        }}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {jobTypes}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.showJobManage,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    getJob, getJobType, addJobType, deleteJobType, addJob, deleteJob
}

const Job = Form.create()(JobForm);

export default store => ({
    path : 'backstage/job',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'showJobManage', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Job));
        })
    }
})