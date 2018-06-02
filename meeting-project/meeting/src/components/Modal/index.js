import React, {Component, PropTypes} from 'react'
import Scroll from 'components/Scroll'
import $ from 'jquery'
import 'jquery-easing'

import './style.scss'

class Modal extends Component {
    constructor (props) {
        super(props)

        this.state = {

        }
    }

    static propTypes = {
        // 类名
        className           :   PropTypes.string,
        // 样式
        style               :   PropTypes.object,
        // children
        children            :   PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
        // 是否显示
        isShow              :   PropTypes.bool,
        // 水平位置
        positionX           :   PropTypes.oneOf(['top', 'center', 'bottom']),
        // 垂直位置
        positionY           :   PropTypes.oneOf(['top', 'center', 'bottom']),
        // 内容样式
        contentStyle        :   PropTypes.object,
        // 隐藏宽
        hideWidth           :   PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        // 隐藏高
        hideHeight          :   PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        // 模态层显示时间
        modalShowTime       :   PropTypes.number,
        // 模态层隐藏时间
        modalHideTime       :   PropTypes.number,
        // 内容显示时间
        contentShowTime     :   PropTypes.number,
        // 内容隐藏时间
        contentHideTime     :   PropTypes.number,
        // 显示动画
        showAnimateName     :   PropTypes.oneOf(['linear', 'swing', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad',
            'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeOutQuint',
            'easeInOutQuint', 'easeInExpo', 'easeOutSine', 'easeInOutSine', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc',
            'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack',
            'easeInBounce', 'easeOutBounce', 'easeInOutBounce'
        ]),
        // 隐藏动画
        hideAnimateName     :   PropTypes.oneOf(['linear', 'swing', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad',
            'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeOutQuint',
            'easeInOutQuint', 'easeInExpo', 'easeOutSine', 'easeInOutSine', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc',
            'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack',
            'easeInBounce', 'easeOutBounce', 'easeInOutBounce'
        ]),
        // 点击背景
        onClickBg           :   PropTypes.func
    }

    static defaultProps = {
        // 是否显示
        isShow              :   false,
        // 水平位置
        positionX           :   'center',
        // 垂直位置
        positionY           :   'center',
        // 内容样式
        contentStyle        :   {},
        // 隐藏宽
        hideWidth           :   0,
        // 隐藏高
        hideHeight          :   0,
        // 模态层显示时间
        modalShowTime       :   500,
        // 模态层隐藏时间
        modalHideTime       :   500,
        // 内容显示时间
        contentShowTime     :   500,
        // 内容隐藏时间
        contentHideTime     :   500,
        // 显示动画
        showAnimateName     :   'easeOutBack',
        // 隐藏动画
        hideAnimateName     :   'easeInBack',
        // 点击背景
        onClickBg           :   () => {}
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.isShow !== nextProps.isShow) {
            // 显示
            if (nextProps.isShow) {
                $(this.contentDom).finish().css({width : 'auto', height : 'auto'})
                $(this.dom).finish().css({display : 'block'})
                const width = $(this.contentDom).outerWidth(true)
                const height = $(this.contentDom).outerHeight(true)
                $(this.contentDom).css({width : this.props.hideWidth, height : this.props.hideHeight})
                $(this.dom).animate(
                    {
                        opacity : 1
                    }, this.props.modalShowTime,
                    () => {
                        $(this.contentDom)
                            .animate({width, height}, this.props.contentShowTime, this.props.showAnimateName, () => $(this.contentDom)
                            .css({width : 'auto', height : 'auto'}))
                    }
                )
            } else {
                // 隐藏
                $(this.contentDom)
                    .finish()
                    .css({width : 'auto', height : 'auto'})
                    .animate({width : this.props.hideWidth, height : this.props.hideHeight}, this.props.contentHideTime, this.props.hideAnimateName, () => {
                        $(this.dom).finish().animate({opacity : 0}, this.props.modalHideTime, () => { $(this.dom).css('display', 'none') })
                    })
            }
        }
    }

    render () {
        let className = `component-Modal`
        let componentClassName = className
        if (this.props.className) {
            componentClassName += ` ${this.props.className}`
        }

        // 水平位置
        let justifyContent = null
        switch (this.props.positionX) {
            // 上
        case 'top':
            justifyContent = 'flex-start'
            break
            // 中
        case 'center':
            justifyContent = 'center'
            break
            // 下
        case 'bottom':
            justifyContent = 'flex-end'
            break
        }

        // 垂直位置
        let alignItems = null
        switch (this.props.positionY) {
            // 上
        case 'top':
            alignItems = 'flex-start'
            break
            // 中
        case 'center':
            alignItems = 'center'
            break
            // 下
        case 'bottom':
            alignItems = 'flex-end'
            break
        }

        return (
            <div
                className={componentClassName}
                ref={dom => {
                    this.dom = dom
                }}
                style={this.props.style}
                onClick={this.props.onClickBg}
            >
                <Scroll className={`${className}-border`} style={{justifyContent, alignItems}}>
                    <div className={`${className}-content`} ref={dom => {
                        this.contentDom = dom
                    }} style={this.props.contentStyle} onClick={e => {
                        e.stopPropagation()
                    }}>
                        {this.props.children}
                    </div>
                </Scroll>
            </div>
        )
    }
}

export default Modal
