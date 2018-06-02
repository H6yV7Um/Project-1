import React, {Component, PropTypes} from 'react'
import 'font-awesome/css/font-awesome.min.css'

class IconFa extends Component {
    static propTypes =
    {
        // 类名   你可以做出很多不一样的效果,参考: http://www.fontawesome.com.cn/examples
        className : React.PropTypes.string,
        // ID
        id        : React.PropTypes.string,
        // css样式
        style     : React.PropTypes.object,
        // 类型   图标列表(可能版本不同步): http://www.fontawesome.com.cn/faicons
        type      : React.PropTypes.string.isRequired
    }

    render()
    {
        let className = `fa fa-${this.props.type}`
        if(!this.props.className)
        {
            className += ` ${this.props.className}`
        }

        return(
            <i className={className} id={this.props.id} style={this.props.style} aria-hidden="true"></i>
        )
    }
}

export default IconFa
