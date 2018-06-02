import React, {Component, PropTypes} from 'react'
import $ from 'jquery'
import './style.scss'

class Grid extends Component {
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
        // item列表
        itemList            :   PropTypes.array,
        // 宽度
        width               :   PropTypes.number,
        // 行数 (auto: 自动)
        rowNum              :   PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
        // 单行时是否可溢出 (仅rowNum为1时有效)
        isOverflow          :   PropTypes.bool,
        // 父容器宽度
        containerWidth      :   PropTypes.number,
        // 最小边距
        minMargin           :   PropTypes.number,
        // 是否设置下边距
        isSetMarginBottom   :   PropTypes.bool
    }

    static defaultProps = {
        // item列表
        itemList            :   [],
        // 宽度
        width               :   100,
        // 行数 (auto: 自动)
        rowNum              :   'auto',
        // 单行时是否可溢出 (仅rowNum为1时有效)
        isOverflow          :   false,
        // 父容器宽度
        containerWidth      :   $(window).width() - 30,
        // 最小边距
        minMargin           :   15,
        // 是否设置下边距
        isSetMarginBottom   :   false
    }

    render () {
        let className = `component-Grid`
        let componentClassName = className
        if (this.props.className) {
            componentClassName += ` ${this.props.className}`
        }

        let rowLength = Math.floor((this.props.containerWidth + this.props.minMargin) / (this.props.width + this.props.minMargin))
        const marginLeft = (this.props.containerWidth - this.props.width * rowLength) / (rowLength - 1)
        let containerWidth = (this.props.width + marginLeft) * rowLength - marginLeft

        if (this.props.rowNum === 1 && this.props.isOverflow) {
            rowLength = this.props.itemList.length
            containerWidth = (this.props.width + this.props.minMargin) * rowLength - this.props.minMargin
        }

        let itemList = []
        this.props.itemList.map((v, k) => {
            if (!(this.props.rowNum === 1 && this.props.isOverflow) && k >= rowLength * this.props.rowNum) {
                return
            }

            const style = {marginLeft : k % rowLength === 0 ? 0 : this.props.rowNum === 1 && this.props.isOverflow ? this.props.minMargin : marginLeft}
            if (this.props.isSetMarginBottom) {
                style.marginBottom = marginLeft
            }

            itemList.push(
                <div
                    className={`${className}-item`}
                    key={k}
                    style={style}
                >
                    {v}
                </div>
            )
        })

        return (
            <div
                className={componentClassName}
                style={{...this.props.style, overflowX : this.props.rowNum === 1 && this.props.isOverflow ? 'scroll' : 'hidden'}}
            >
                <div className={`${className}-container`} style={{width : containerWidth}}>
                    {itemList}
                </div>
            </div>
        )
    }
}

export default Grid
