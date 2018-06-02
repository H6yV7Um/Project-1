import React, {Component, PropTypes} from 'react'
import {Spin} from 'antd'
import Icon from 'components/Icon'
import $ from 'jquery'
import './style.scss'

class ScrollLoad extends Component {
    constructor (props) {
        super(props)

        this.state = {

        }

        // 命名
        this.name = new Date().getTime() + Math.random()
        // 当前自动加载次数
        this.autoTimes = 0
    }

    static propTypes =
    {
        // 类名
        className           :   PropTypes.string,
        // children
        children            :   PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
        // 是否可加载
        isLoad              :   PropTypes.bool,
        // 加载
        load                :   PropTypes.func.isRequired,
        // 是否正在加载
        isLoading           :   PropTypes.bool,
        // 首次加载是否自动加载
        isAutoFirst         :   PropTypes.bool,
        // 自动加载次数   (当达到此次数将只能通过点击加载,点击加载后将重置自动加载次数;-1将一直自动)
        autoTimes           :   PropTypes.number,
        // 偏移量
        offset              :   PropTypes.number,
        // 延迟(ms)
        delay               :   PropTypes.number,
        // loading类名
        loadingClassName    :   PropTypes.string
    }

    static defaultProps =
    {
        // 是否可加载
        isLoad              :   false,
        // 是否正在加载
        isLoading           :   false,
        // 首次加载是否自动加载
        isAutoFirst         :   false,
        // 自动加载次数   (当达到此次数将只能通过点击加载,点击加载后将重置自动加载次数;-1将一直自动)
        autoTimes           :   2,
        // 偏移量
        offset              :   0,
        // 延迟(ms)
        delay               :   0
    }

    componentDidMount () {
        $(window).on(`scroll.${this.name}`, () => {
            if (this.props.isLoad &&
                (this.autoTimes === 0 && this.props.isAutoFirst || this.autoTimes > 0 && this.autoTimes < this.props.autoTimes ||
                this.props.autoTimes === -1) &&
                $(document).scrollTop() + $(window).height() >= $(this.loadingDom).offset().top + this.props.offset
            ) {
                this.autoTimes++
                this.load()
            }
        })
    }

    componentWillUnmount () {
        $(window).off(`scroll.${this.name}`)
    }

    // 加载
    load = () => {
        if (!this.props.isLoading) {
            setTimeout(() => {
                if (!this.props.isLoading) {
                    this.props.load()
                }
            }, this.props.delay)
        }
    }

    render () {
        let className = 'component-ScrollLoad'
        let componentClassName = className
        if (this.props.className) {
            componentClassName += ` ${this.props.className}`
        }

        let loadingClassName = `${className}-loading`
        if (this.props.loadingClassName) {
            loadingClassName += ` ${this.props.loadingClassName}`
        }

        let loading = null

        if (this.props.isLoad) {
            loading =
                <Spin spinning={this.props.isLoading}>
                    <div className={loadingClassName} ref={dom => {
                        this.loadingDom = dom
                    }} onClick={() => {
                        this.autoTimes = 1
                        this.load()
                    }}>
                        <Icon type={'ellipsis-h'} />
                    </div>
                </Spin>
        }

        return (
            <div className={componentClassName}>
                {this.props.children}
                {loading}
            </div>
        )
    }
}

export default ScrollLoad
