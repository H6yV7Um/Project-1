import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Cover from 'appComponents/Book/Cover';
import Rate from 'components/Rate';
import browserAttr from 'utils/browserAttr';

import './style.scss';

class Show extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        // 大小
        this.size = this.getSize(props.size);
    }

    static propTypes =
    {
        // 书数据
        book            :   React.PropTypes.object.isRequired,
        // 大小
        size            :   React.PropTypes.oneOf(['x-small', 'small', 'normal'])
    }

    static defaultProps =
    {
        // 大小
        size            :   'normal'
    }

    componentWillReceiveProps(nextProps) {
        this.size = this.getSize(nextProps.size);
    }

    getSize = size => {
        // 非移动端
        if(!browserAttr.versions.mobile)
        {
            if(size == 'x-small')
            {
                size = 'small';
            }
        }
        return size;
    }

    render()
    {
        let className = `appComponent-Book-Show`;
        let componentClassName = `${className} ${className}-${this.size}`;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return(
            <div className={componentClassName} style={this.props.style}>
                {/*封面*/}
                <Link to={`/book/detail/${this.props.book.book_id}`}>
                    <Cover cover={this.props.book.cover} size={this.size} />
                </Link>
                {/*书名*/}
                <div className={`${className}-name`}>{this.props.book.name}</div>
                {/*评分*/}
                <Rate className={`${className}-rate`} value={this.props.book.score} size={this.size} disabled={true} allowHalf={true} />
            </div>
        )
    }
}

export default Show;
