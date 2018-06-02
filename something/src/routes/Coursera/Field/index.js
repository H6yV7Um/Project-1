import React, {Component} from 'react';
import {connect} from 'react-redux';
import { List, InputItem, Toast,DatePicker,Picker,Button } from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import { createForm } from 'rc-form';
import {injectReducer} from 'store/reducers';
import $ from 'jquery';
import {add} from './action';
import './style.scss';
let className = `Coursera-Field`;

class Field extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes =
    {
    }
    state = {
        name:'',
        date:'',
        department:'',
        school:'',
        courseraname:'',
        certificate:''
    }
    onClick()
    {
        let { name,date,department,school,courseraname,certificate} = this.state
        if(!name)
        {
            Toast.info(<ToastContent type="fail" content={'姓名不能为空'} />, 3, null, false);
        }
        else if(!date)
        {
            Toast.info(<ToastContent type="fail" content={'请选择时间'} />, 3, null, false);
        }
        else if(!department)
        {
            Toast.info(<ToastContent type="fail" content={'请选择部门'} />, 3, null, false);
        }
        else if(!school)
        {
            Toast.info(<ToastContent type="fail" content={'请填写学校'} />, 3, null, false);
        }
         else if(!courseraname)
        {
            Toast.info(<ToastContent type="fail" content={'请填写证书名称'} />, 3, null, false);
        }
        else if(!certificate)
        {
            Toast.info(<ToastContent type="fail" content={'请填写证书'} />, 3, null, false);
        }
        else
        {
            let data = {}
            data.name=name
            data.data = data
            data.department = department
            data.school = school
            data.courseraname = courseraname
            data.certificate = certificate
            
            this.props.add(data,()=>{
                this.props.router.push('/coursera/table');
            },()=>{
                Toast.info(<ToastContent type="fail" content={'提交失败'} />, 3, null, false);
            })
        }
    }
    render() {
        const { getFieldProps } = this.props.form;
        let { name,date,department,school,courseraname,certificate} = this.state
        const district =  [
            {
              label: '董事会',
              value: '董事会',
            },
            {
              label: '项目支持中心',
              value: '项目支持中心',
            },
            {
              label: '3号美术',
              value: '3号美术',
            },
            {
              label: 'DevOps',
              value: 'DevOps',
            },{
              label: 'HR',
              value: 'HR',
            },
            {
              label: 'IT',
              value: 'IT',
            },{
              label: 'N1',
              value: 'N1',
            },
            {
              label: '301',
              value: '301',
            },{
              label: '303',
              value: '303',
            },
            {
              label: '财务',
              value: '财务',
            },{
              label: '发行',
              value: '发行',
            },
            {
              label: 'BA',
              value: 'BA',
            },{
              label: '特斯拉',
              value: '特斯拉',
            },
            {
              label: 'GL',
              value: 'GL',
            },
            {
              label: 'RE/SW/GE',
              value: 'RE/SW/GE',
            },{
              label: 'KE',
              value: 'KE',
            },
            {
              label: 'BI',
              value: 'BI',
            },{
              label: '内审部',
              value: '内审部',
            }
        ];
        return (
            <div className={`${className}`}>
                <List>
                    <InputItem
                        type="text"
                        placeholder="输入你的姓名"
                        onChange={name=>this.setState({ name })}
                        value={name}
                    >
                        姓名
                    </InputItem>
                    <Picker 
                        data={district} 
                        cols={1}  
                        className="forss"
                        onChange={department => this.setState({ department })}
                        value={department}

                    >
                        <List.Item arrow="horizontal">部门</List.Item>
                    </Picker>
                    <DatePicker
                        mode="date"
                        title="选择时间"
                        extra="请选择"
                        value={date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">时间</List.Item>
                    </DatePicker>

                    
                    <InputItem
                        type="text"
                        placeholder="输入学校名称"
                        onChange={school => this.setState({ school })}
                        value={school}
                    >
                        学校名称
                    </InputItem>
                    <InputItem
                        type="text"
                        placeholder="请填写课程名称"
                        onChange={courseraname => this.setState({ courseraname })}
                        value={courseraname}
                    >
                        课程名称
                    </InputItem>
                    <InputItem
                        type="text"
                        placeholder="请填写证书链接"
                        onChange={certificate => this.setState({ certificate })}
                        value={certificate}
                    >
                        证书链接
                    </InputItem>
                </List>
                <div className="btn-submit">
                    <Button activeStyle={false} type="primary" onClick={()=>{
                        this.onClick()
                    }}>提交</Button>
                </div>
            </div>
        );
  }

}
const mapStateToProps = state => ({
    reducer : state.field
})
const mapDispatchToProps = {
    add
}

Field = createForm()(Field);
export default store => ({
    path : 'field',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'field', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Field))
        })
    }
})