import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast,Grid,DatePicker,List} from 'antd-mobile';
import {Button as AntButton, Spin, Tabs as AntTabs} from 'antd';
import {injectReducer} from 'store/reducers';
import {getAllCourseraList, getDepartment, changeType, isClear} from './action';
import './style.scss';
import {browserHistory} from 'react-router'
import Chart from 'appComponents/Coursera/Chart';
import SegmentedControl from 'components/SegmentedControl';
import moment from 'moment';
import browserAttr from 'utils/browserAttr'
let className = `Coursera-Chart`;
const now = moment().locale('zh-cn').utcOffset(8);
const Item = List.Item;
const AntTabPane = AntTabs.TabPane;
// 判断设备类型
let ismobile = browserAttr.versions.mobile
class CourseraChart extends Component {
    constructor(props) {
        super(props);
        this.state={
        	dailyDate: now,
            company_num: 1
        };
        this.departmentRido = []

    }
    static propTypes =
    {
    	// 获取所有的courseralist
        getAllCourseraList          : React.PropTypes.func,
    	// 获取单日的courseralist
        getDailyCourseraList        : React.PropTypes.func,

        fetchGetAllCourseraList     : React.PropTypes.bool,
        // 获取所有部门
        getDepartment               : React.PropTypes.func,
        // 更改type
        changeType                  : React.PropTypes.func,
    }
    componentWillMount() {
        this.props.getAllCourseraList()
        this.props.getDepartment({},(data)=>{
            this.setState({company_num: data[0].company_num})
        })
        document.documentElement.scrollTop = 0
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
    formatOptionData(itemList)
    {
        let ergodic = [],
            yAxis_data = [],
            series_data = [],
            dataArr = [],
            itemStyle={},
            newData = [],
            tooltipObj = []
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
                barWidth:15,
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
    formatData(itemList)
    {
        let yAxis_data = [],
            series_data = [],
            newData = this.formatOptionData(itemList),
            option = {}
        option.title = {
            text: `证书总计${itemList.length}（公司平均${Math.round(itemList.length/this.state.company_num * 100) / 100}）`,
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
            padding: 5,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1,
            formatter: function (obj) {
                for(let val of newData.tooltipObj)
                {
                    if(val.name == obj.name)
                    {
                        return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;部门：&nbsp;' +
                            val.department + '<br>' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓名：&nbsp;' +
                            val.name  + '<br>' +
                            '证书数量：&nbsp;' +
                            val.count
                    }
                }
            }
        }
        if(browserAttr.versions.ios)
        {
            option.dataZoom =  [
                {
                    type: 'inside',
                    yAxisIndex: [0],
                    start: 90,
                    end: 100,
                    show:true,
                    // 表示鼠标滚轮不能触发缩放
                    // zoomOnMouseWheel: false,
                    filterMode: 'empty',
                    throttle: 100,
                    zoomLock: true
                }
            ]
            // animation: false,
            option.animation = false
        }
        option.legend={
                
            },
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
    formatDepartmentAverageSeriesData(departments,itemList)
    {
        let ergodic = [],
            yAxis_data = [],
            series_data = [],
            dataArr = [],
            tooltipObj = []

        // 计算每个部门里面获取证书人
        let departmentOfCoursera = []
        for(let department of departments)
        {
            let newdepartment = {name: department.department_name,user: []}
            for(let val of itemList)
            {
                for(let d of val.department)
                {
                    if(department.department_name == d.department_name)
                    {
                        newdepartment.user.push({
                            name: val.user.name
                        })
                    }
                }
            }
            const unique = (array)=>{
                let r = [];
                for(let i = 0, l = array.length; i < l; i++) {
                    for(let j = i + 1; j < l; j++)
                        if (array[i].name === array[j].name) j = ++i;
                    r.push({
                        name: array[i].name
                    });
                }
                return r;
            }
            // 算出获取了证书的有哪些人
            let courseraUsers = unique(newdepartment.user)
            newdepartment.user = courseraUsers
            departmentOfCoursera.push(newdepartment)
        }
        for(let department of departments)
        {
            let count = 0//证书数量
            for(let val of itemList)
            {
                for(let d of val.department)
                {
                    if(department.department_name == d.department_name)
                    {
                        count++
                    }
                }
            }
            let courseraUser = 0
            for(let val of departmentOfCoursera)
            {
                if(val.name == department.department_name)
                {
                    courseraUser = val.user.length
                }
            }
            dataArr.push({
                name: department.department_name,
                // 部门人数
                num: department.user_num,
                // 部门证书总数
                allcount: count,
                // 部门平均
                count: Math.round(count/department.user_num * 100) / 100,
                // 部门获取证书人数
                courseraUser: courseraUser
            })
            dataArr = this.insertSort(dataArr)
        }
        let newDataArr = [...dataArr]
        newDataArr = this.insertSort(this.unique(newDataArr))
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
                value:val.count ,
                linHeight: '15px',
                itemStyle: {
                    normal: {
                        color: color,
                    },
                },
            })
            // 需要部门人数，证书数量 部门平均 获证人员占比
            tooltipObj.push({name: val.name,num: val.num,allCount: val.allcount,count: val.count,courseraUser: val.courseraUser})
            yAxis_data.push({value:val.name,textStyle:{fontSize:'14px',color:'#5FB5D8'}})
        }

        return {yAxis_data: yAxis_data,series_data: series_data,tooltipObj: tooltipObj}
    }

    formatDepartmentAverageData(departments, itemList)
    {
        let yAxis_data = [],series_data = [],newData = this.formatDepartmentAverageSeriesData(departments,itemList)
        let option = {}
        option.title = {
            text: `部门人均排行榜（公司平均${Math.round(itemList.length/344 * 100) / 100}）`,
            x: '50%',
            y: '5%',
            textAlign: 'center',
            textStyle: {
                'fontSize':"14",
                'color': "#FF3433",
                'fontWeight':'normal'
            },
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
                            let  riao = val.courseraUser/val.num
                            // let riao = '0.016674623764723647236746'
                            if(riao>1)
                            {
                                riao = 100
                            }
                            else if(riao == 1)
                            {
                                riao = 100
                            }
                            else
                            {
                                if(riao*100%1 !== 0)
                                {
                                    let num = new Number(riao*100);
                                    riao = num.toPrecision(2);
                                }
                                else {
                                    riao = riao*100
                                }
                            }
                            this.departmentRido.push({'department': val.name,riao: riao})
                            // + '人员占比：'+ `${val.courseraUser/val.num*100}%`
                            return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;部门：&nbsp;' +
                                val.name + '<br>' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人数：&nbsp;' +
                                val.num  + '<br>' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;证书数量：&nbsp;' + val.allCount + '<br>'+
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;部门平均：&nbsp;'+ val.count + '<br>'+
                                '获证人员占比：'+ `${riao}%`
                        }
                    }
                }
        }
        option.legend={
                
            },
        option.grid = {
            left: "3%",
            right: "10%",
            bottom: '3%',
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
                alignWithLabel: true
            },
        }
        option.series = [
            {
                type:'bar',
                name: '平均',
                data: newData.series_data,
                barWidth: 15,
                barGap:15,
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
        let height = 15,{itemList,department} = this.props.reducer
        let data = this.formatData(itemList)
        let departmentAverageData = this.formatDepartmentAverageData(department,itemList)
        const CurrentChart = (type)=>{
            // 总排行
            if(type == 0)
            {
                return  <div className={`${className}-current-chart-all`}>
                            <Chart
                                height = {height*1.5*data.itemLength+90}
                                data = {data.option}
                                onClick = {(data)=>{
                                    this.props.isClear()
                                    browserHistory.push(`/personal/${data.name}`)
                                }}
                            />
                        </div>
            }
            else if(type == 1)//部门平均排行
            {
                return  <div className={`${className}-current-chart-department`}>
                            <div>
                                <Chart
                                    onClick = {(data)=>{
                                        this.props.isClear()
                                        let riao = 0
                                        for(let val of this.departmentRido)
                                        {
                                            if(val.department == data.name)
                                            {
                                                riao = val.riao
                                            }
                                        }
                                        browserHistory.push({pathname: `/departmentlist/${data.name}`,state:{value: data.value,riao: riao}})
                                    }}
                                    height = {document.documentElement.clientHeight-30}
                                    data={departmentAverageData.option}
                                />
                            </div>
                        </div>
            }
        }
        if(ismobile)
        {
            return  <div className={`${className}`}>
                        {(this.props.reducer.fetchGetAllCourseraList ?
                                <div className={`${className}-spin`} >
                                    <Spin/>
                                </div>
                            :
                               <div>
                                   <SegmentedControl
                                    values={['总排行榜', '部门统计']}
                                    initIndex={this.props.reducer.type}
                                    color={'#5FB5D8'}
                                    onChange={index => {
                                        this.props.changeType(index)
                                    }}
                                    style={{borderRadius: 0}}
                                    />
                                    {CurrentChart(this.props.reducer.type)}
                                </div>
                        )}
                    </div>
        }
        else
        {
          return   <div>
                      {(this.props.reducer.fetchGetAllCourseraList ?
                          <div className={`${className}-spin`} >
                              <Spin/>
                          </div>
                          :
                          <div className={`${className}-pc`}>
                              <div>
                                  <div className = {`${className}-back`}>
                                      <a
                                          onClick={()=>{
                                              browserHistory.push('/')
                                          }}
                                      >
                                          返回
                                      </a>
                                  </div>
                                  <AntTabs
                                      defaultActiveKey={`${this.props.reducer.type}`}
                                      size="small"
                                      onChange={index => {
                                          this.props.changeType(index)
                                      }}
                                  >
                                      <AntTabPane tab="总排行榜" key="0">{CurrentChart(0)}</AntTabPane>
                                      <AntTabPane tab="部门统计" key="1">{CurrentChart(1)}</AntTabPane>
                                  </AntTabs>
                              </div>
                          </div>
                      )}
                </div>


        }
    }
}
const mapStateToProps = state => ({
    reducer: state.courseraChart,
})
const mapDispatchToProps = {
	getAllCourseraList,
    getDepartment,
    changeType,
    isClear
}
export default store => ({
    path : '/chart',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'courseraChart', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(CourseraChart))
        })
    }
})