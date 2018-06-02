import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import './style.scss'

class ShowMore extends Component {
    constructor (props) {
        super(props)
        this.state = {
            // 展开还是收起
            hidden: false,
            // 展示的内容
            content: '',
            // 是否需要折叠
            fold: false
        }
    }

    static propTypes = {
        // 接收内容
        content: PropTypes.string,
        // 内容长度大于hiddenLength时收起
        hiddenLength: PropTypes.number,
        // 组件的宽度
        width: PropTypes.string
    }

    componentWillMount () {
        let {content, hiddenLength} = this.props
        if (content.length > hiddenLength) {
            this.setState({hidden: true, content: content.slice(0, hiddenLength - 1) + '...', fold: true})
        } else {
            this.setState({content: content})
        }
    }

    render () {
        const componentClassName = 'app-components-meeting-show-more'
        let {hidden, content, fold} = this.state
        let {width, hiddenLength} = this.props
        return (
            <div
                className={componentClassName}
                ref={dom => {
                    this.dom = dom
                }}
                style={{width: width}}
            >
                {content}
                {(
                    fold
                        ? <a onClick={() => {
                            if (hidden) { // 显示更多
                                this.setState({hidden: false, content: this.props.content})
                            } else { // 收起
                                this.setState({
                                    hidden: true,
                                    content: this.props.content.slice(0, hiddenLength - 1) + '...'
                                })
                            }
                        }}>
                            {(
                                hidden ? '更多详情>>' : '<<收起'
                            )}
                        </a>
                        : null
                )}

            </div>)
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ShowMore)
