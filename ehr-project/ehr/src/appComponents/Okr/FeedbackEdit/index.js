import React, {Component, PropTypes} from 'react';
import Icon from 'components/Icon';
import {List, Toast, Accordion} from 'antd-mobile';
import InputItem from 'components/InputItem';
import {createForm} from 'rc-form';

import './style.scss';

let form = null;
class FeedbackEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        // form = props.form;

    }

    // static propTypes =
    // {
    //     // 初始数据
    //     data        : React.PropTypes.object,
    //     // 设置异常
    //     setErrors   : React.PropTypes.func,
    //     // 设置值
    //     setValues   : React.PropTypes.func
    // }

    componentDidMount() {
        // 初始验证
        // validateFields(this.props);
    }

    componentWillUnmount() {
        // this.props.setDefaultLayout();
    }

    render()
    {
        let className = 'appComponentOkrFeedbackEdit';

        const {getFieldProps} = this.props.form;
        const {data} = this.props;
        // onChange = (key) => {
        //     console.log(key);
        // }
        return(
            <div>

                <List
                    renderHeader={() =>
                        <span>
                        <span style={{color: '#d92c2b',marginRight:'8px',fontWeight:700}}>|</span>
                        <span style={{color: '#000'}}>OKRS</span>
                    </span>
                    }
                >

                    <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header= {
                            <span>
                                {/*<span style={{color:'#d92c2b'}}>-</span>*/}
                                {/*<span style={{marginLeft:'10px'}}>*/}
                                    目标一：
                                {/*</span>*/}
                            </span>
                        } className="pad">
                            <List className="my-list">
                                <List.Item>
                                    <InputItem
                                        {...getFieldProps('companyLocation',{initialValue : data && data.companyLocation, rules: [
                                            {required : true, message : '请输入工作反馈'},
                                            {whitespace : true, message : '请输入工作反馈'},
                                        ]})}
                                        clear={true}
                                        placeholder="请输入目标"
                                        value="我是工作目标目标我是工作目标目标我是工作目标目标我是工作目标目标我是工作目标目标"
                                        style={{color:'red'}}
                                    >
                                        工作目标
                                    </InputItem>
                                </List.Item>
                                <List.Item>我是目标反馈反馈反馈</List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>

                    <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header= {
                            <span>
                                {/*<span style={{color:'#d92c2b'}}>-</span>*/}
                                {/*<span style={{marginLeft:'10px'}}>*/}
                                    目标二：
                                {/*</span>*/}
                            </span>
                        } className="pad">
                            <List className="my-list">
                                <List.Item>
                                    <InputItem
                                        {...getFieldProps('companyLocation',{initialValue : data && data.companyLocation, rules: [
                                            {required : true, message : '请输入工作反馈'},
                                            {whitespace : true, message : '请输入工作反馈'},
                                        ]})}
                                        clear={true}
                                        placeholder="请输入目标"
                                        value="我是工作目标目标我是工作目标目标我是工作目标目标我是工作目标目标我是工作目标目标"
                                    >
                                    </InputItem>
                                </List.Item>
                                <List.Item>content 2</List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                </List>





                <br/>
                <br/>
                <br/>
                <br/>

                <List
                    renderHeader={() =>
                        <span>
                            <span style={{color: '#d92c2b',marginRight:'8px',fontWeight:700}}>|</span>
                            <span style={{color: '#000'}}>OKRS</span>
                        </span>
                    }
                >
                    <InputItem
                        {...getFieldProps('companyLocation',{initialValue : data && data.companyLocation, rules: [
                            {required : true, message : '请输入目标'},
                            {whitespace : true, message : '请输入目标'},
                        ]})}
                        clear={true}
                        placeholder="请输入目标一"

                    >
                        目标
                    </InputItem>
                    <InputItem
                        {...getFieldProps('companyLocation',{initialValue : data && data.companyLocation, rules: [
                            {required : true, message : '请输入目标'},
                            {whitespace : true, message : '请输入目标'},
                        ]})}
                        clear={true}
                        placeholder="请输入目标一">
                        目标结果多个
                    </InputItem>
                    <InputItem
                        {...getFieldProps('companyLocation',{initialValue : data && data.companyLocation, rules: [
                            {required : true, message : '请输入目标'},
                            {whitespace : true, message : '请输入目标'},
                        ]})}
                        clear={true}
                        placeholder="请输入目标一">
                        目标反馈
                    </InputItem>
                </List>
                <List
                    renderHeader={() =>
                    <span>
                        <span style={{color: '#d92c2b',marginRight:'8px',fontWeight:700}}>|</span>
                        <span style={{color: '#000'}}>工作反馈</span>
                    </span>
                    }
                >
                    <InputItem
                        {...getFieldProps('companyLocation',{initialValue : data && data.companyLocation, rules: [
                            {required : true, message : '请输入工作反馈'},
                            {whitespace : true, message : '请输入工作反馈'},
                        ]})}
                        clear={true}
                        placeholder="请输入工作反馈">

                    </InputItem>
                </List>
                <List
                    renderHeader={() =>
                    <span>
                        <span style={{color: '#d92c2b',marginRight:'8px',fontWeight:700}}>|</span>
                        <span style={{color: '#000'}}>工作问题</span>
                    </span>
                    }
                >
                    <InputItem
                        {...getFieldProps('companyLocation',{initialValue : data && data.companyLocation, rules: [
                            {required : true, message : '请输入工作问题'},
                            {whitespace : true, message : '请输入工作问题'},
                        ]})}
                        clear={true}
                        placeholder="请输入工作问题">

                    </InputItem>
                </List>
                <List
                    renderHeader={() =>
                        <span>
                        <span style={{color: '#d92c2b',marginRight:'8px',fontWeight:700}}>|</span>
                        <span style={{color: '#000'}}>工作成果</span>
                    </span>
                    }
                >
                    <InputItem
                        {...getFieldProps('companyLocation',{initialValue : data && data.companyLocation, rules: [
                            {required : true, message : '请输入工作成果'},
                            {whitespace : true, message : '请输入工作成果'},
                        ]})}
                        clear={true}
                        placeholder="请输入工作成果">
                    </InputItem>
                </List>
            </div>
        )
    }
}

/**
 * 表单验证
 * @param props
 */
const validateFields = props => {
    form.validateFields((errorList, valueList) => {
        if(errorList)
        {
            let errors = [];
            for(const k1 in errorList) {
                for(const k2 in errorList[k1]['errors']) {
                    errors.push(<div key={`${k1}_${k2}`}>{errorList[k1]['errors'][k2]['message']}<br/></div>);
                }
            }

            // props.children[1](<div key={'error-offer'}>{errors}</div>);   //setErrors
            // props.children[3](null);    //setValues

        }
        else
        {
            let values = {};
            // values.applicantName        =   valueList.applicantName;

            // props.children[3](values);    //setValues
            // props.children[1](null);    //setErrors

        }
    })
}

export default createForm({
    // 任一表单值发生改变时回调
    onValuesChange : props => {
        setTimeout(
            () => {
                validateFields(props);
            },100
        );
    }
})(FeedbackEdit);





// const mapStateToProps = state => ({
//
//     })
//
// const mapDispatchToProps = {
//
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(FeedbackEdit);