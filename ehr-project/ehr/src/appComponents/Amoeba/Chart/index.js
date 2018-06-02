import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Echarts from 'echarts';
import MessageTitle from 'components/MessageTitle';
import Icon from 'components/Icon';
import {Spin} from 'antd';
import $ from 'jquery';

import {getAmoeba} from './action';

import './style.scss';

// 阿米巴图表
class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 数据
            data : null,
            // 图表宽
            width : props.width,
            // 图表高
            height : props.height
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
        maxMoney            :   React.PropTypes.number,
        // 最小金额(单位: 万  实际最小金额小于此数将以实际最小金额)
        minMoney            :   React.PropTypes.number,
        // 最大系数 (实际最大系数大于此数将以实际最大系数)
        maxCoefficient      :   React.PropTypes.number,
        // 最小系数 (实际最小系数小于此数将以实际最小系数)
        minCoefficient      :   React.PropTypes.number
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
        maxMoney            :   500,
        minMoney            :   -500,
        maxCoefficient      :   10,
        minCoefficient      :   0
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
            if(this.buildChartData && this.buildChartData.concat(newBuildChartData).filter(v => this.buildChartData.indexOf(v) == -1 || newBuildChartData.indexOf(v) == -1).length == 0)
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
                    right : 32,
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
                yAxis : [
                    {
                        type : 'value',
                        name : '￥(万)'
                    },
                    {
                        type : 'value',
                        name : '系数'
                    }
                ],
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

            let department = [];
            let maxMoney = this.props.maxMoney;
            let minMoney = this.props.minMoney;
            let maxCoefficient = this.props.maxCoefficient;
            let minCoefficient = this.props.minCoefficient;

            this.data().map(amoeba => {
                maxCoefficient = maxCoefficient < amoeba.feedback.coefficient ? amoeba.feedback.coefficient : maxCoefficient;
                minCoefficient = minCoefficient > amoeba.feedback.coefficient ? amoeba.feedback.coefficient : minCoefficient;

                const date = `${amoeba.attr.year.toString().substr(2, 2)}-${amoeba.attr.stage}`;
                if(department.indexOf(amoeba.department_id) == -1)
                {
                    const name = this.props.departmentIds.length == 1 ? '' : `${amoeba.name}-`;
                    department.push(amoeba.department_id);
                    option.legend.data.push(`${name}收入`);
                    option.legend.data.push(`${name}支出`);
                    option.legend.data.push(`${name}系数`);
                    option.series.push(
                        {
                            name : `${name}收入`,
                            type : 'bar',
                            yAxisIndex : 0,
                            stack : amoeba.department_id,
                            barGap : 0,
                            barMaxWidth : 40,
                            dimensions : [date, `${name}收入`, `${name}利润`],
                            encode : {x : 0, y : 1, tooltip : [1, 2]},
                            tooltip : {
                                formatter : v => {
                                    const name = v.seriesName.split('-收入');
                                    return `${v.value[0]}<br/>${v.marker}${v.seriesName}：${v.value[1]}<br/><span style="width : 14px; height : 9px; display: inline-block;"></span>${name.length > 1 ? `${name[0]}-利润` : '利润'}：${v.value[2]}`;
                                }
                            },
                            itemStyle,
                            data : []
                        }
                    );
                    option.series.push(
                        {
                            name : `${name}支出`,
                            type : 'bar',
                            yAxisIndex : 0,
                            stack : amoeba.department_id,
                            barGap : 0,
                            barMaxWidth : 40,
                            tooltip : {
                                formatter : v => `${v.name}<br/>${v.marker}${v.seriesName}：${v.value}`
                            },
                            itemStyle,
                            data : []
                        }
                    );
                    option.series.push(
                        {
                            name : `${name}系数`,
                            type : this.props.departmentIds.length > 1 ? 'scatter' : 'line',
                            yAxisIndex : 1,
                            symbolSize : this.props.departmentIds.length > 1 ? 15 : 5,
                            tooltip : {
                                formatter : v => `${v.name}<br/>${v.marker}${v.seriesName}：${v.value}`
                            },
                            data : []
                        }
                    );
                }
                let key1 = department.indexOf(amoeba.department_id) * 3;
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

                // 收入、利润
                option.series[key1].data[key2] = [date, (amoeba.feedback.income / 10000).toFixed(2), (amoeba.feedback.profit / 10000).toFixed(2)];
                // 支出
                option.series[key1 + 1].data[key2] = ((amoeba.feedback.income - amoeba.feedback.profit) / 10000 * -1).toFixed(2);
                // 系数
                option.series[key1 + 2].data[key2] = amoeba.feedback.coefficient;

                maxMoney = maxMoney < option.series[key1].data[key2] ? option.series[key1].data[key2] : maxMoney;
                minMoney = minMoney > option.series[key1 + 1].data[key2] ? option.series[key1 + 1].data[key2] : minMoney;
            })

            maxMoney = Math.ceil(Math.abs(maxMoney) > Math.abs(minMoney) ? Math.abs(maxMoney) : Math.abs(minMoney));
            minMoney = maxMoney * -1;

            option.grid.top = Math.ceil(option.legend.data.length * (this.props.departmentIds.length == 1 ? 70 : 150) / this.width) * 25 + 30;
            option.grid.left = minMoney.toString().length * 8.5;
            option.yAxis[0].max = maxMoney;
            option.yAxis[0].min = minMoney;
            option.yAxis[0].interval = (maxMoney - minMoney) / 5;
            option.yAxis[1].max = maxCoefficient;
            option.yAxis[1].min = minCoefficient;
            option.yAxis[1].interval = (maxCoefficient - minCoefficient) / 5;

            // console.log(option)
            const height = this.height + option.grid.top;
            const chart = Echarts.init($(this.dom).get(0), null, {width : this.width, height});
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
        this.props.getAmoeba(departmentIds, date, data => {
            this.isFetch = false;
            this.setData(data);
        });
    }

    render() {
        let className = 'appComponentsAmoebaChart';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        const hasData = this.data() && this.data().length > 0;

        return(
            <div className={componentClassName}>
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
    getAmoeba
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
