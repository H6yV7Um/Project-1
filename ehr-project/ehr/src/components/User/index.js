import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Avatar from 'components/Avatar';

import './style.scss';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    static propTypes =
    {
        // 头像url
        userAvatar      : React.PropTypes.string,
        // ID
        userId          : React.PropTypes.string,
        // 名字
        userName        : React.PropTypes.string,
        // 大小
        size            : React.PropTypes.oneOf(['sm', 'x-sm']),
        // 链接 (完整链接为该链接+ID)
        link            : React.PropTypes.string
    }

    static defaultProps =
    {
        // 大小
        size            : 'sm',
        // 链接 (完整链接为该链接+ID)
        link            : '/user/home/'
    }

    render()
    {
        let className = 'component-User';
        let componentClassName = `${className} ${className}-${this.props.size}`;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        let userName = this.props.userName || this.props.children;
        if(this.props.userId)
        {
            userName = <Link className={`${className}-link`} to={this.props.link + this.props.userId}>{userName}</Link>;
        }

        return(
            <span className={componentClassName}>
                <Avatar className={`${className}-avatar`} url={this.props.userAvatar} userId={this.props.userId} size={this.props.size} />
                {userName}
            </span>
        )
    }
}

export default User;
