import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Echarts from 'echarts';

import {getOkrScore} from './action';

// okr个人分数图表
class UserScoreChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 数据
            data : null,
            // 图表高
            height : props.height,
            //图标宽
            width : props.width
        };
        // 是否已初始化
        this.isInit = false;
    }

    static propTypes =
    {
        // 图表高
        height              :   React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        // 图表宽
        width               :   React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        // 最大分
        maxScore            :   React.PropTypes.number,
        // 最小分
        minScore            :   React.PropTypes.number,
        // 数据 __AUTO__时将不依赖父组件获取数据
        data                :   React.PropTypes.oneOfType([React.PropTypes.oneOf(['__AUTO__']), React.PropTypes.array]),
        // 时段  时段 [年份, 阶段1, 阶段2]
        period              :   React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.array])
    }

    static defaultProps =
    {
        width               :   '100%',
        height              :   '160px',
        maxScore            :   120,
        minScore            :   70,
        data                :   '__AUTO__',
        period              :   [],
    }

    componentDidUpdate() {
        if(this.isInit)
        {
            this.buildChart();
        }
    }

    componentWillMount() {
        if(this.props.period && this.props.userId){
            this.getData(this.props.userId, this.props.period);
        }
    }

    componentDidMount() {
        this.isInit = true;
        this.buildChart();
    }

    /**
     * 绘制图表
     */
    buildChart = () => {
        if(this.data()){
            const chart = Echarts.init(this.refs.echarts);
            let basicScore = [];
            let highScore = [];
            let chartScores = this.data();
            let scores = [chartScores.score, chartScores.composite_score, chartScores.process_score, chartScores.achievement_score];
            scores.map((v,k) => {
                if(v>100){
                    basicScore.push(100);
                    highScore.push((v+'').indexOf('.') != -1?(v-100).toFixed(1):v-100);
                }
                else if(v==100){
                    basicScore.push('100.0');
                    highScore.push('');
                }
                else{
                    basicScore.push(v);
                    highScore.push(0);
                }
            });

            let option = {
                grid: {
                    top:4,
                    left:56,
                    bottom:19,
                    right:10
                },
                animation: false,

                xAxis: {
                    type: 'value',
                    min : this.props.minScore,
                    max : this.props.maxScore
                },
                yAxis: {
                    type: 'category',
                    data: ['当季总分','综合得分','工作过程','工作成果']
                },
                series: [
                    {
                        type: 'bar',
                        stack: '分数',
                        data: basicScore,
                        itemStyle: {
                            normal: {
                                color: '#C23531',
                            },
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                formatter: v => {
                                    if(v.data == 100 && v.data.toString().length == 5)
                                    {
                                        return 100;
                                    }
                                    else
                                    {
                                        v = parseFloat(v.data);
                                        return v >= 100 ? '' : v;
                                    }
                                }
                            }
                        },
                        barWidth: 18
                    },
                    {
                        type: 'bar',
                        stack: '分数',
                        data: highScore,
                        itemStyle: {
                            normal: {
                                color: '#942925',
                            },
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                formatter: v => {
                                    v = parseFloat(v.data);
                                    return v == 0 ? '' : v + 100;
                                }
                            }
                        },
                        barWidth: 18
                    }
                ]
            };
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
    }

    /**
     * 获取数据
     * @param userId 用户ID列表
     * @param period  时段 [年份, 阶段1, 阶段2]
     */
    getData = (userId, period) => {
        this.isFetch = true;
        this.props.getOkrScore(userId, period, data => {
            this.isFetch = false;
            this.setData(data);
        });
    }

    render() {
        let className = 'appComponentsOkrUserScoreChart';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return(
            <div className={componentClassName} style={{height : this.state.height}} ref="echarts"/>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    getOkrScore
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScoreChart);
