import React, {Component, PropTypes} from 'react'
import CheckBox from 'components/CheckBox'

import './style.scss'

class CheckBoxGroup extends Component {
    constructor (props) {
        super(props)

        this.state = {
            checkList: []
        }
    }

    static propTypes = {
        // 类名
        className: PropTypes.string,
        // 变化时回调函数
        onChange: PropTypes.func,
        // 选项
        option: PropTypes.array,
        // 点击事件的回调函数
        action: PropTypes.func
    }

    static defaultProps = {
        // 变化时回调函数
        onChange: () => {
        },
        // 选项
        option: [],
        // 点击事件的回调函数
        action: () => {
        }
    }

    componentWillReceiveProps (nextProps) {

    }

    render () {
        let className = `component-CheckBoxGroup`
        let componentClassName = `${className}`
        if (this.props.className) {
            componentClassName += ` ${this.props.className}`
        }

        let checkbox = null
        let checkboxList = []
        this.props.option.map((v, k) => {
            checkbox =
                <CheckBox
                    key={k}
                    id={k}
                    checked={this.state.checkList[k]}
                    onChange={this.props.onChange}
                    action={this.props.action}
                >
                    {v}
                </CheckBox>
            checkboxList.push(checkbox)
        })

        return (
            <div className={componentClassName}>
                {/* <Button name={'全选'}  style={{}} type={'weaken'} */}
                {checkboxList}
            </div>
        )
    }
}

export default CheckBoxGroup
