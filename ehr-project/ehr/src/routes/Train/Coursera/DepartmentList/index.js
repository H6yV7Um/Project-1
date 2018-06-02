import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast,Grid,DatePicker,List} from 'antd-mobile';
import {Button as AntButton, Spin, Tabs as AntTabs} from 'antd';
import {injectReducer} from 'store/reducers';
import {searchPersonalList, clear, searchCourseraByDepartment} from './action';
import './style.scss';
import {browserHistory} from 'react-router'
import Chart from 'appComponents/Train/Coursera/Chart';
import moment from 'moment';
import browserAttr from 'utils/browserAttr'
let ismobile = browserAttr.versions.mobile;//判断设备类型
let className = `coursera-departmentList`;
const now = moment().locale('zh-cn').utcOffset(8);
// 判断设备类型
class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state={
            dailyDate: now,
        }
    }
    static propTypes =
    {
        // 获取所有的courseralist
        searchPersonalList          : React.PropTypes.func,
        searchCourseraByDepartment  : React.PropTypes.func,
        departmentUsers              : React.PropTypes.array,
        itemlist                    : React.PropTypes.array,
    }
    componentWillMount() {
        this.props.searchCourseraByDepartment({val: this.props.params.name},(data)=>{
            // 获取到部门里面的所有成员和部门里面已经获取了证书的人员
        })
        this.props.searchPersonalList({
            val: this.props.params.name,
            searchPage: this.props.reducer.searchPage,
        },()=>{},()=>{})
    }
    componentWillUnmount() {
        this.props.clear()
    }
    insertSort(array){//数组排序算法
        /*start根据已排列好的项数决定*/
        let start=1;
        /*按顺序，每一项检查已排列好的序列*/
        for(let i=start; i<array.length; start++,i++){
            /*跟已排好序的序列做对比，并插入到合适的位置*/
            for(let j=0; j<start; j++){
                /*小于或者等于时（我们是升序）插入到该项前面*/
                if(array[i].count<=array[j].count){
                    array.splice(j,0,array[i]);
                    /*删除原有项*/
                    array.splice(i+1,1);
                    break;
                }
            }
        }
        return array
    }

    // 计算一个部门里面没有获取证书的人员有哪些
    getNoCourseraUsers(itemlist = [],departmentUsers)
    {
        const unique = (array)=>{
            let r = [];
            for(let i = 0, l = array.length; i < l; i++) {
                for(let j = i + 1; j < l; j++)
                    if (array[i].user.name === array[j].user.name) j = ++i;
                r.push({
                    name: array[i].user.name
                });
            }
            return r;
        }
        // 算出获取了证书的有哪些人
        let courseraUsers = unique(itemlist)
        // 跟现有的
        let newUser = []
        for(let val of departmentUsers)
        {
            let isin = false
            for(let courseraUser of courseraUsers)
            {
                if(val.name == courseraUser.name)
                {
                    isin = true
                }
            }
            if(!isin)
            {
                newUser.push(val)
            }
        }
        return newUser
        // departmentUser从部门成员中剔出已经获得证书的成员
    }
    // 数组去重
    unique(array){
        let r = [];
        for(let i = 0, l = array.length; i < l; i++) {
            for(let j = i + 1; j < l; j++)
                if (array[i].count === array[j].count) j = ++i;
            r.push(array[i]);
        }
        return r;
    }
    // 统计数组中每个人获取了多少证书
    formatOptionData(itemList, departmentUsers)
    {
        let ergodic = [],
            yAxis_data = [],
            series_data = [],
            dataArr = [],
            itemStyle={},
            newData = [],
            tooltipObj= []

        // 把没有证书的人加进去
        // let newUsers = this.getNoCourseraUsers(itemList,departmentUsers)
        // for(let val of newUsers)
        // {
        //
        //     let color = "#35bfff"
        //     series_data.push({
        //         value:0,
        //         linHeight: '15px',
        //         itemStyle: {
        //             normal: {
        //                 color: color,
        //             },
        //         },
        //     })
        //     yAxis_data.push({value:val.name,textStyle:{fontSize:'14px',color:'#5FB5D8'}})
        // }

        for (let i = 0; i < itemList.length;i++) {
            let count = 0;
            for (let j = i; j < itemList.length; j++) {
                if (itemList[i].user_id === itemList[j].user_id) {
                    let is = false
                    for(let val of ergodic)
                    {
                        if(val == itemList[i].user_id)
                        {
                            is = true
                        }
                    }
                    if(!is)
                    {
                        count++;
                    }
                }
            }
            if(count)
            {
                ergodic.push(itemList[i].user_id)
                dataArr.push({name:itemList[i].user.name,count: count,department: itemList[i].department})
                dataArr = this.insertSort(dataArr)
            }
        }
        let newDataArr = [...dataArr]
        newDataArr =this.insertSort(this.unique(newDataArr))
        let length = newDataArr.length
        for(let val of dataArr)
        {
            let color = "#35bfff"
            if(val.count == newDataArr[length-1].count )
            {
                color = "#fc4420"
            }
            else if(val.count == newDataArr[length-2].count )
            {
                color = "#ffa72a"
            }
            else if(val.count == newDataArr[length-3].count )
            {
                color = "#3dde7a"
            }
            series_data.push({
                value:val.count,
                linHeight: '15px',
                itemStyle: {
                    normal: {
                        color: color,
                    },
                },
            })
            let department = [...val.department]
            let current = ''
            for(let d of department)
            {
                current = current + d.department_name + ''
            }
            tooltipObj.push({name: val.name,department: current,count: val.count})
            yAxis_data.push({value:val.name,textStyle:{fontSize:'14px',color:'#5FB5D8'}})
        }
        return {yAxis_data: yAxis_data,series_data: series_data,tooltipObj: tooltipObj}
    }
    // 格式化总排行的数据
    formatData(itemList,departmentUsers)
    {
        let yAxis_data = [],
            series_data = [],
            newData = this.formatOptionData(itemList,departmentUsers),
            option = {}
        option.title = {
            text: `证书总计${itemList.length}（部门平均${this.props.location.state.value}）`,
            x: '50%',
            y: '25',
            textStyle: {
                'fontSize':"14",
                'color': "#FF3433",
                'fontWeight':'normal'
            },
            textAlign: 'center'
        }
        option.tooltip = {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        }
        option.legend={

        }
        option.tooltip = {
            padding: 5,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1,
            formatter: (obj) => {
                for(let val of newData.tooltipObj)
                {
                    if(val.name == obj.name)
                    {
                        return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 部门：' +
                                val.department + '<br>' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 姓名：' +
                            val.name  + '<br>' +
                            '证书数量：' + val.count + '<br>' +
                            '部门平均：' + this.props.location.state.value
                    }
                }
            }
        }
        option.grid = {
            left: "3%",
            right: "10%",
            bottom: '20',
            containLabel: true,
        }
        option.xAxis = {

        }
        option.yAxis = {
            type: 'category',
            data: newData.yAxis_data,
            axisLabel:{
                interval:0,
            },
            axisTick:{
                alignWithLabel: true,
            },
        }
        option.series = [
            {
                type:'bar',
                data: newData.series_data,
                barWidth:15,
                barCategoryGap: '1%',
                label: {
                    normal: {
                        show: true,
                        position: 'right'
                    }
                },
            }
        ]
        return {option:option,itemLength: newData.series_data.length}
    }
    render() {
        let height = 15,{itemList,departmentUsers} = this.props.reducer
        let data = this.formatData(itemList, departmentUsers)
        const CurrentChart = ()=>{
            // 总排行
            console.log(height*3*data.itemLength)
            return  <div className={`${className}-current-chart-all`}>
                        <Chart
                            height = {height*2*data.itemLength+90}
                            data = {data.option}
                            onClick = {(data)=>{
                                browserHistory.push({pathname: `/train/coursera/personal/${data.name}`,state:{backurl: `/train/coursera/departmentlist/${this.props.params.name}`,value: this.props.location.state.value}})
                            }}
                        />
                    </div>
        }
        if(ismobile)
        {
            return<div>
                {(
                    !this.props.reducer.fetchSearchCourseraByDepartment
                        ?
                        <div className={`${className}`}>
                            {CurrentChart()}
                        </div>

                        :
                        <div className={`${className}-spin`} >
                            <Spin/>
                        </div>
                )}
            </div>
        }
        else
        {
            return  <div>
                    {(
                        !this.props.reducer.fetchSearchCourseraByDepartment
                        ?
                            <div className={`${className}-pc`}>
                                <div className = {`${className}-back`}>
                                    <a
                                        onClick={()=>{
                                            browserHistory.push('/train/coursera/chart')
                                        }}
                                    >
                                        返回
                                    </a>
                                </div>
                                {CurrentChart()}
                            </div>
                        :
                            <div className={`${className}-spin`} >
                                <Spin/>
                            </div>
                    )}
                </div>
        }
    }
}
const mapStateToProps = state => ({
    reducer: state.departmentlist,
})
const mapDispatchToProps = {
    searchPersonalList,
    clear,
    searchCourseraByDepartment

}
export default store => ({
    path: 'coursera/departmentlist/:name',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'departmentlist', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(DepartmentList))
        })
    }
})