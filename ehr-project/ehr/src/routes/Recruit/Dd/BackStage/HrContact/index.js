import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Table, Button, Modal, Input, Form, Row, Col, message } from 'antd';
import {injectReducer} from 'store/reducers';
import Icon from 'components/Icon';
import ToastContent from 'components/ToastContent';
import Pattern from 'config/pattern';
import {hostName} from 'config/wechat';
import $ from 'jquery';

import {getHrContact, AddHrContact, deleteHrContact} from './action';

import './style.scss';

const FormItem = Form.Item;
const confirm = Modal.confirm;

// 面试综合信息
class HrContactForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hrInfoModal             :   false,
            isCallCheck             :   false
        };

        this.hideItems = [];
        this.error = null;
        this.values = null;
        // 表格的列定义
        this.columns = [{
            title: 'Name',
            dataIndex: 'name',
            width: '20%',
            render: text => <a href="#">{text}</a>,
        },  {
            title: 'Phone',
            width: '40%',
            dataIndex: 'phone',
        }, {
            title : 'Action',
            key : 'action',
            width : '40%',
            render : (text, record) => (
                <span>
      <a onClick={() => {this.handleDelete(record, 'job')}}>删除</a>
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
        this.props.getHrContact();
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
        this.setState({ hrInfoModal: false });
    }

    // 添加事件
    handleAdd = () => {
        this.setState({ hrInfoModal: true })
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
                if (!err) {
                    this.setState({ hrInfoModal: false });
                    this.props.AddHrContact(values, () => {
                        setTimeout(()=> {
                            this.props.getHrContact();
                            this.message('success', '新增HR成功');
                        }, 10);
                    });
                }
            },
        );
    }

    deleteHrContact = record => {
        this.props.deleteHrContact(record._id, () => {
            this.props.getHrContact();
            this.message('success', '删除成功');
        })
    }

    handleDelete = record => {
        let deleteHrContact = this.deleteHrContact.bind(this);
        confirm({
            title: `您确认要删除 ${record.name} 这个联系人吗?`,
            content: '确认后该信息将被删除!请谨慎操作!',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteHrContact(record);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        let hrInfo = [];
        const { getFieldDecorator } = this.props.form;

        if(this.props.reducer.hrs && this.props.reducer.hrs.length != 0) {
            this.props.reducer.hrs.map((v, k) => {
                let hr = {
                    _id : v._id,
                    key : k + 1,
                    name : v.name,
                    phone : v.phone
                }
                hrInfo.push(hr);
            })
        }

        return(
            <div className="Recruit-BackStage-HrContact">
                <div className="btns-job-type-container">
                    <Button type="primary" onClick={() => {
                        this.handleAdd()
                    }}>
                        <Icon className="icon" type="plus" style={{color: '#fff'}}>&nbsp;新增HR</Icon>
                    </Button>
                </div>
                <div className="table-job-type-container">
                    <Table columns={this.columns} dataSource={hrInfo}  scroll={{ y: 340 }}/>
                </div>
                {/*模态框*/}
                <Modal
                    visible={this.state.hrInfoModal}
                    title={'新增HR'}
                    onOk={this.handleOk}
                    className={'hrInfoModal'}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" size="large" onClick={this.handleCancel}>关闭</Button>,
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>
                            确认
                        </Button>,
                    ]}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem {...this.formItemLayout} label="HR姓名">
                                {getFieldDecorator('name', {
                                    rules: [
                                        {required: true, message: 'HR姓名不能为空!'}
                                        ],
                                })(
                                    <Input placeholder="请输入HR姓名" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem {...this.formItemLayout} label="HR联系方式">
                                {getFieldDecorator('phone', {
                                    rules: [{required: true, message: 'HR联系方式不能为空!'},
                                        {pattern : Pattern.PHONE, message : '请输入正确的电话号码'}
                                        ],
                                })(
                                    <Input placeholder="请输入HR联系方式" />
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
    reducer : state.recruitHrContact,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    getHrContact, AddHrContact, deleteHrContact
}

const HrContact = Form.create()(HrContactForm);

export default store => ({
    path: 'backstage/hr',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'recruitHrContact', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(HrContact));
        })
    }
})