import React, {Component, PropTypes} from 'react'
import Modal from 'components/ModalAntd'
import Button from 'components/Button'
import QueueAnim from 'rc-queue-anim'

import './style.scss'

class UserList extends Component {
    constructor (props) {
        super(props)

        this.state = {
            // 是否展示
            isShow: false
        }
    }

    static propTypes = {
        className: PropTypes.string,
        // 用户列表 (User数组)
        users: PropTypes.array.isRequired,
        // 默认显示最大列表长度 (-1: 全部)
        length: PropTypes.number,
        // 图标 (Icon)
        icon: PropTypes.element,
        // 大小
        size: PropTypes.oneOf(['sm', 'x-sm']),
        // 是否有动画
        isAnimate: PropTypes.bool
    }

    static defaultProps = {
        // 默认显示最大列表长度 (-1: 全部)
        length: -1,
        // 图标 (Icon)
        icon: null,
        // 大小
        size: 'sm',
        // 是否有动画
        isAnimate: true
    }

    // 展示
    show = () => {
        this.setState({isShow: true})
    }

    // 关闭
    close = () => {
        this.setState({isShow: false})
    }

    render () {
        let className = 'component-UserList'
        let componentClassName = `${className} ${className}-${this.props.size}`
        if (this.props.className) {
            componentClassName += ` ${this.props.className}`
        }
        if (this.props.icon) {
            componentClassName += ` ${className}-haveIcon`
        }

        let users = []
        let more = null
        if (this.props.length === -1) {
            users = this.props.users
        } else {
            this.props.users.map((v, k) => {
                if (k < this.props.length) {
                    users.push(v)
                } else {
                    more = <span key={`${className}-more`} className={`${className}-more`} onClick={this.show}>等{this.props.users.length}人</span>
                    return false
                }
            })
        }

        let usersDom = null
        if (this.props.isAnimate) {
            usersDom =
                <QueueAnim
                    type={'left'}
                    ease={'easeOutQuart'}
                >
                    {users}{more}
                </QueueAnim>
        } else {
            usersDom =
                <div>
                    {users}{more}
                </div>
        }

        let userList = null
        if (users.length > 0) {
            userList =
                <div className={componentClassName}>
                    {this.props.icon}
                    {usersDom}
                    <Modal className={`${className}-modal`} visible={this.state.isShow} position={'bottom'}>
                        <div className={`${className}-show-border`}>
                            <div className={`${className}-show`}>
                                {this.props.users}
                            </div>
                            <Button className={`${className}-button`} name={'关闭'} action={this.close} />
                        </div>
                    </Modal>
                </div>
        }

        return userList
    }
}

export default UserList
