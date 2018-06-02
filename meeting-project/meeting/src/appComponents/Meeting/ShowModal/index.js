import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Modal} from 'antd'
import Icon from 'components/Icon'
import './style.scss'

class ShowModal extends Component {
    constructor (props) {
        super(props)
        this.state = {
            // 展示的内容
            content: '',
            // 是否需要折叠
            fold: false,
            // 是否显示弹框
            showModal: false
        }
    }

    static propTypes = {
        // 接收内容
        content: PropTypes.string,
        // 内容长度大于hiddenLength时显示点击按钮
        hiddenLength: PropTypes.number,
        // 组件的宽度
        width: PropTypes.string
    }

    componentWillMount () {
        let {content, hiddenLength} = this.props
        if (content.length > hiddenLength) {
            this.setState({content: content.slice(0, hiddenLength - 1) + '...', fold: true})
        } else {
            this.setState({content: content})
        }
    }

    showModal = () => {
        this.setState({
            showModal: true
        })
    }
    handleOk = () => {
        this.setState({
            showModal: false
        })
    }
    handleCancel = () => {
        this.setState({
            showModal: false
        })
    }

    render () {
        const componentClassName = 'app-components-meeting-show-modal'
        let {content, fold} = this.state
        let {width} = this.props
        return (
            <div
                className={componentClassName}
                ref={dom => {
                    this.dom = dom
                }}
                style={{width: width}}
            >
                <span className={`${componentClassName}-content`}>{content}</span>
                {(
                    fold
                        ? <span>
                            <span type='primary' onClick={this.showModal}>
                                <Icon type='angle-double-right' className={`${componentClassName}-icon`} />
                            </span>
                            <Modal
                                visible={this.state.showModal}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={false}
                                width={400}>
                                <pre>{this.props.content}</pre>
                            </Modal>
                        </span>
                        : null
                )}
            </div>)
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ShowModal)
