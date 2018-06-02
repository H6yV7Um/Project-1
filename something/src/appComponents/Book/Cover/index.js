import React, {Component, PropTypes} from 'react';
import getSrc from 'utils/imgSrc';

import './style.scss';

class Cover extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        // 宽高比例
        this.scale = 380 / 528;
    }

    static propTypes =
    {
        // 封面
        cover           :   React.PropTypes.string.isRequired,
        // 大小
        size            :   React.PropTypes.oneOfType([React.PropTypes.oneOf(['x-small', 'small', 'normal']), React.PropTypes.number])
    }

    static defaultProps =
    {
        // 大小
        size            :   'normal'
    }

    render()
    {
        let className = `appComponent-Book-Cover`;
        let componentClassName = `${className} ${className}-${this.props.size}`;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        // 宽
        let width = 0;
        switch (this.props.size)
        {
            case 'normal':
                width = 115;
                break;
            case 'small':
                width = 75;
                break;
            case 'x-small':
                width = 55;
                break;
            default:
                width = this.props.size;
        }

        // 高
        const height = width / this.scale;

        return(
            <div className={componentClassName} style={{...this.props.style, width, height}}>
                <img className={`${className}-cover`} src={getSrc(this.props.cover)} />
            </div>
        )
    }
}

export default Cover;
