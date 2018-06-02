import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Echarts from 'echarts';
import MessageTitle from 'components/MessageTitle';
import Icon from 'components/Icon';
import {Spin} from 'antd';
import $ from 'jquery';
import Switch from 'components/Switch';
import { List } from 'antd-mobile';

import {getLove} from './action';

import './style.scss';

// PL多部门图表
class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 数据
            data : null,
            // 图表宽
            width : props.width,
            // 图表高
            height : props.height,
            // 参数
            show : props.show
        };
        // 是否已初始化
        this.isInit = false;
        // 初始化图表宽
        this.width = props.width;
        // 初始化图表高
        this.height = props.height;
        // 是否正在获取数据
        this.isFetch = false;
        // 是否卸载
        this.isUnmount = false;
        // 绘制图表定时器
        this.buildChartTimer = null;
        // 记录绘制图表数据
        this.buildChartData = null;
        //参数开关
        this.buttonChange = false;
    }

    static propTypes =
    {
        // 部门ID列表 (data不存在时将通过此ID取数据)
        departmentIds       :   React.PropTypes.array,
        // 数据 __AUTO__时将不依赖父组件获取数据
        data                :   React.PropTypes.oneOfType([React.PropTypes.oneOf(['__AUTO__']), React.PropTypes.array]),
        // 是否自取数据
        isGetData           :   React.PropTypes.bool,
        // 时段 [起始年, 终止年] || -1:全部
        date                :   React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.array]),
        // 图表宽
        width               :   React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        // 图表高
        height              :   React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        /**
         * 事件:数据更新后
         * @param data 新数据
         */
        onChange            :   React.PropTypes.func,
        // 无数据提示
        message             :   React.PropTypes.string,
        // 最大金额(单位: 万  实际最大金额大于此数将以实际最大金额)
        maxScore            :   React.PropTypes.number,
        // 最小金额(单位: 万  实际最小金额小于此数将以实际最小金额)
        minScore            :   React.PropTypes.number,
        // 最大系数 (实际最大系数大于此数将以实际最大系数)
        maxCoefficient      :   React.PropTypes.number,
        // 最小系数 (实际最小系数小于此数将以实际最小系数)
        minCoefficient      :   React.PropTypes.number,
        // 参数 [评分，系数]
        show                :   React.PropTypes.array,
        // 改变参数
        onChangeShow        :   React.PropTypes.func
    }

    static defaultProps =
    {
        data                :   '__AUTO__',
        isGetData           :   true,
        date                :   -1,
        width               :   '100%',
        height              :   300,
        onChange            :   data => {},
        message             :   '暂无数据',
        maxScore            :   20,
        minScore            :   0,
        maxCoefficient      :   5,
        minCoefficient      :   -5,
        show                :   [true,true],
        onChangeShow        :   show => {},
    }

    componentWillMount() {
        // 初始化数据
        if(!this.data() && this.props.departmentIds && this.props.isGetData)
        {
            this.getData(this.props.departmentIds, this.props.date);
        }
    }

    componentDidMount() {
        let initNum = 0;
        const init = () => {
            initNum++;
            setTimeout(() => {
                if(!$(this.dom)[0]) return;
                const width = $(this.dom)[0].clientWidth;
                if(width == 0)
                {
                    if(initNum < 100)
                    {
                        init();
                    }
                }
                else
                {
                    this.isInit = true;
                    this.width = width;
                    this.height = $(this.dom)[0].clientHeight;
                    this.setState({width : 'auto', height : 'auto'});
                    setTimeout(this.buildChart, 50);
                }
            }, 50);
        }
        init();
    }

    componentDidUpdate() {
        if(this.isInit)
        {
            if(this.buildChartTimer)
            {
                window.clearTimeout(this.buildChartTimer);
            }
            this.buildChartTimer = setTimeout(this.buildChart, 100);
        }
    }

    componentWillUnmount() {
        this.isUnmount = true;
        this.props.onChange(null);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.isGetData && this.isUpdate(this.props, nextProps))
        {
            this.getData(nextProps.departmentIds, nextProps.date);
        }
    }

    /**
     * 是否更新
     * @param prevProps  上props
     * @param nextProps  下props
     */
    isUpdate = (prevProps, nextProps) => {
        let isUpdate = false;
        // 数据更新
        if(prevProps.departmentIds.length != nextProps.departmentIds.length)
        {
            isUpdate = true;
        }
        else
        {
            isUpdate = prevProps.departmentIds.concat(nextProps.departmentIds).filter(v => prevProps.departmentIds.indexOf(v) == -1 || nextProps.departmentIds.indexOf(v) == -1).length > 0;
        }

        if(!isUpdate)
        {
            const oldDatePrototype = Object.prototype.toString.call(prevProps.date);
            const newDatePrototype = Object.prototype.toString.call(nextProps.date);
            if(oldDatePrototype != newDatePrototype)
            {
                isUpdate = true;
            }
            else
            {
                if(newDatePrototype == '[object Array]')
                {
                    isUpdate = prevProps.date.concat(nextProps.date).filter(v => prevProps.date.indexOf(v) == -1 || nextProps.date.indexOf(v) == -1).length > 0;
                }
                else if(prevProps.date != nextProps.date)
                {
                    isUpdate = true;
                }
            }
        }

        return isUpdate;
    }

    /**
     * 绘制图表
     */
    buildChart = () => {
        if(this.data() && !this.isUnmount)
        {
            const newBuildChartData = Array.from(this.data()).map(v => v._id);
            // 数据无更新
            if(!this.buttonChange && this.buildChartData && this.buildChartData.concat(newBuildChartData).filter(v => this.buildChartData.indexOf(v) == -1 || newBuildChartData.indexOf(v) == -1).length == 0)
            {
                return;
            }

            // 记录绘制图表数据
            this.buildChartData = newBuildChartData;

            let option = {
                tooltip : {
                    trigger : 'item',
                    // axisPointer : {
                    //     type : 'cross',
                    //     crossStyle : {
                    //         color : '#999'
                    //     }
                    // }
                },
                grid : {
                    left : 32,
                    bottom : 20
                },
                legend : {
                    data : []
                },
                xAxis : {
                    type : 'category',
                    data : [],
                    axisPointer : {
                        type : 'shadow'
                    },
                    axisLabel : {
                        interval : 0
                    }
                },
                yAxis : [],
                series : []
            };

            const itemStyle = {
                normal: {},
                emphasis: {
                    barBorderWidth : 1,
                    shadowBlur : 10,
                    shadowOffsetX : 0,
                    shadowOffsetY : 0,
                    shadowColor : 'rgba(0,0,0,0.5)'
                }
            };
            let scoreLegend = [];
            let coefficientLegend = [] ;
            let scoreSeries = [];
            let coefficientSeries = [] ;
            let department = [];
            let maxScore = this.props.maxScore;
            let minScore = this.props.minScore;
            let maxCoefficient = this.props.maxCoefficient;
            let minCoefficient = this.props.minCoefficient;


            this.data().map(love => {

                const date = `${love.attr.year.toString().substr(2, 2)}-${love.attr.stage}`;
                if(department.indexOf(love.department_id) == -1)
                {
                    const name = this.props.departmentIds.length == 1 ? '' : `${love.name}-`;
                    department.push(love.department_id);

                    scoreLegend.push(`${name}评分`);
                    scoreSeries.push(
                        {
                            name : `${name}评分`,
                            type : 'bar',
                            yAxisIndex : 0,
                            stack : love.department_id,
                            barGap : 0,
                            barMaxWidth : 40,
                            tooltip : {
                                formatter : v => {
                                    const name = v.seriesName.split('-评分');
                                    return `${v.name}<br/>${v.marker}${v.seriesName}：${v.data}`;
                                }
                            },
                            itemStyle,
                            data : []
                        }
                    );

                    coefficientLegend.push(`${name}系数`);
                    coefficientSeries.push(
                        {
                            name : `${name}系数`,
                            type : this.props.departmentIds.length > 1 ? 'scatter' : 'line',
                            yAxisIndex : this.state.show[0] ? 1 : 0,
                            symbolSize : this.props.departmentIds.length > 1 ? 15 : 5,
                            tooltip : {
                                formatter : v => `${v.name}<br/>${v.marker}${v.seriesName}：${v.value}`
                            },
                            data : []
                        }
                    );
                }
                let key1 = department.indexOf(love.department_id);
                let key2 = -1;
                option.xAxis.data.map((v, k) => {
                    if(v == date)
                    {
                        key2 = k;
                    }
                })
                if(key2 == -1)
                {
                    option.xAxis.data.push(date);
                    key2 = option.xAxis.data.length - 1;
                }
                love.feedbacks.map(feedback => {
                    minCoefficient = minCoefficient > feedback.comment_info.coefficient ? feedback.comment_info.coefficient : minCoefficient;
                    maxCoefficient = maxCoefficient < feedback.comment_info.coefficient ? feedback.comment_info.coefficient : maxCoefficient;
                    //评分
                    scoreSeries[key1].data[key2] = feedback.comment_info.score;
                    //系数
                    coefficientSeries[key1].data[key2] = feedback.comment_info.coefficient;
                })


                maxScore = maxScore < scoreSeries[key1].data[key2] ? scoreSeries[key1].data[key2] : maxScore;
                minScore = minScore > scoreSeries[key1].data[key2] ? scoreSeries[key1].data[key2] : minScore;
            })

            if(this.state.show[0]){
                option.yAxis.push(
                    {
                        type : 'value',
                        name : '评分',
                        max  : maxScore,
                        min  : minScore,
                        interval : (maxScore - minScore) / 5
                    }
                )
                option.legend.data = option.legend.data.concat(scoreLegend);
                option.series = option.series.concat(scoreSeries);
            }
            if(this.state.show[1]){
                option.yAxis.push(
                    {
                        type : 'value',
                        name : '系数',
                        max  : maxCoefficient,
                        min  : minCoefficient,
                        interval : (maxCoefficient-minCoefficient) / 5
                    }
                )
                option.legend.data = option.legend.data.concat(coefficientLegend);
                option.series = option.series.concat(coefficientSeries);
            }

            option.grid.top = Math.ceil(option.legend.data.length * (this.props.departmentIds.length == 1 ? 70 : 150) / this.width) * 25 + 30;

            // console.log(option)
            this.buttonChange = false;
            const height = this.height + option.grid.top;
            const chart = Echarts.init($(this.dom).get(0), null, {width : this.width, height});
            this.setState({width : 'auto', height : 'auto'});
            if(!this.state.show[0]&&!this.state.show[1]){
                chart.clear();
                this.setState({height:0})
                return
            }
            chart.clear();
            chart.setOption(option);
        }
    }

    /**
     * 当前数据
     */
    data = () => {
        return this.props.data == '__AUTO__' ? this.state.data : this.props.data;
    }

    /**
     * 设置数据
     * @param data 数据
     */
    setData = data => {
        if(this.props.data == '__AUTO__')
        {
            this.setState({data});
        }
        this.props.onChange(data);
    }

    /**
     * 获取数据
     * @param departmentIds 部门ID列表
     * @param date 时段 [起始年, 终止年] || -1:全部
     */
    getData = (departmentIds, date) => {
        this.isFetch = true;
        this.props.getLove(departmentIds, date, data => {
            this.isFetch = false;
            this.setData(data);
        });
    }

    render() {
        let className = 'appComponentsPLChart';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        const hasData = this.data() && this.data().length > 0;

        return(
            <div className={componentClassName}>
                <div className={`${className}-switch`}>
                    <div className={`${className}-switch-block`}>
                        <div className={`${className}-switch-name`}>评分</div>
                        <Switch
                            checked={this.state.show[0]}
                            onChange={
                                checked =>{
                                    this.setState({show:[checked,this.state.show[1]]},()=>{
                                        this.buttonChange = true
                                        this.buildChart();
                                        this.props.onChangeShow(this.state.show);
                                    })
                                }
                            }
                        />
                    </div>
                    <div className={`${className}-switch-block`}>
                        <div className={`${className}-switch-name`}>系数</div>
                        <Switch
                            checked={this.state.show[1]}
                            onChange={
                                checked => {
                                    this.setState({show:[this.state.show[0],checked]},()=>{
                                        this.buttonChange = true
                                        this.buildChart();
                                        this.props.onChangeShow(this.state.show);
                                    })
                                }}
                        />
                    </div>
                </div>
                {/*图表*/}
                <div className={`${className}-chart`} style={{width : this.state.width, height : this.state.height, display : hasData || !this.isInit ? 'block' : 'none'}} ref={dom => this.dom = dom} />
                {
                    this.isFetch
                        ?
                    <Spin><div/></Spin>
                        :
                    <MessageTitle
                        className={`${className}-message`}
                        type={'danger'}
                        icon={<Icon type="exclamation-circle"/>}
                        style={{display : hasData ? 'none' : 'block'}}
                    >
                        {this.props.message}
                    </MessageTitle>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    getLove
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
