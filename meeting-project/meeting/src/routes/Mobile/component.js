import React, {Component} from 'react'
import getSrc from '../../utils/imgSrc'

import './style.scss'

class Mobile extends Component {
    constructor (props) {
        super(props)

        this.state = {}
    }

    render () {
        let className = 'routeMobile'

        return (
            <div className={className}>
                <div className={`${className}-image-border`}>
                    <img className={`${className}-image`} src={getSrc('mobile.png')}/>
                </div>
                <div className={`${className}-message`}>
                    暂不支持移动端
                    <br/>
                    请通过钉钉PC版进入
                </div>
            </div>
        )
    }
}

export default Mobile
