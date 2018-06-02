import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Echarts from 'echarts';
import MessageTitle from 'components/MessageTitle';
import Icon from 'components/Icon';
import {Spin} from 'antd';
import $ from 'jquery';

import {getOkr} from './action';

import './style.scss';

// okr个人图表
class UserChart extends Component {
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
        // 用户ID (data不存在时将通过此ID取数据)
        userId              :   React.PropTypes.string,
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
        // 最大分
        maxScore            :   React.PropTypes.number,
        // 最小分
        minScore            :   React.PropTypes.number
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
        maxScore            :   120,
        minScore            :   80
    }

    componentWillMount() {
        // 初始化数据
        if(!this.data() && this.props.userId && this.props.isGetData)
        {
            this.getData(this.props.userId, this.props.date);
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
                    this.setState({width, height : $(this.dom)[0].clientHeight});
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
            this.getData(nextProps.userId, nextProps.date);
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
        if(prevProps.userId != nextProps.userId) isUpdate = true;
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

            const chart = Echarts.init($(this.dom).get(0));
            let option = {
                tooltip : {
                    trigger : 'axis',
                    axisPointer: {
                        type : 'cross',
                        crossStyle : {
                            color : '#999'
                        }
                    }
                },
                grid : {
                    top : this.state.width >= 330 ? 30 : 60,
                    right : 15,
                    bottom : 20,
                    left : 27
                },
                legend : {
                    data : ['总计', '综合', '工作成果', '工作过程']
                },
                xAxis : {
                    data : [],
                    boundaryGap : false,
                    axisLabel : {
                        interval : 0
                    }
                },
                yAxis : {
                    type : 'value',
                    min : this.props.minScore,
                    max : this.props.maxScore
                },
                series : []
            };

            let score = [];
            let compositeScore = [];
            let achievementScore = [];
            let processScore = [];
            this.data().map(okr => {
                okr.feedbacks.map(feedback => {
                    option.xAxis.data.push(`${okr.attr.year.toString().substr(2, 2)}-${feedback.stage + (okr.attr.stage == 1 ? 0 : 2)}`);
                    score.push(feedback.comment_info.score);
                    compositeScore.push(feedback.comment_info.composite_score);
                    achievementScore.push(feedback.comment_info.achievement_score);
                    processScore.push(feedback.comment_info.process_score);
                })
            })
            option.series.push(
                {
                    name : option.legend.data[0],
                    type : option.xAxis.data.length > 1 ? 'line' : 'scatter',
                    symbolSize : option.xAxis.data.length > 1 ? 5 : 15,
                    data : score,
                    itemStyle : {
                        normal : {
                            lineStyle : {
                                width : 2
                            }
                        }
                    }
                }
            );
            option.series.push(
                {
                    name : option.legend.data[1],
                    type : option.xAxis.data.length > 1 ? 'line' : 'scatter',
                    data : compositeScore,
                    itemStyle : {
                        normal : {
                            lineStyle : {
                                width : 1
                            }
                        }
                    }
                }
            );
            option.series.push(
                {
                    name : option.legend.data[2],
                    type : option.xAxis.data.length > 1 ? 'line' : 'scatter',
                    data : achievementScore,
                    itemStyle : {
                        normal : {
                            lineStyle : {
                                width : 1
                            }
                        }
                    }
                }
            );
            option.series.push(
                {
                    name : option.legend.data[3],
                    type : option.xAxis.data.length > 1 ? 'line' : 'scatter',
                    data : processScore,
                    itemStyle : {
                        normal : {
                            lineStyle : {
                                width : 1
                            }
                        }
                    }
                }
            );

            // chart.clear();
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
     * @param userId 用户ID
     * @param date 时段 [起始年, 终止年] || -1:全部
     */
    getData = (userId, date) => {
        this.isFetch = true;
        this.props.getOkr(userId, date, data => {
            this.isFetch = false;
            this.setData(data);
        });
    }

    render() {
        let className = 'appComponentsOkrUserChart';
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
    getOkr
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChart);
