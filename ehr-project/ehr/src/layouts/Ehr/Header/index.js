import React, {Component} from 'react';
import {connect} from 'react-redux';
import Icon from 'components/Icon';
import Avatar from 'components/Avatar';
import {SearchBar} from 'antd-mobile';

import {setPage} from '../action';

import './style.scss';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let className = 'layoutEhrHeader';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        // 筛选
        let select = null;
        if(this.props.reducer.leftBody)
        {
            select =
                <div className={`${className}-select`} onClick={() => this.props.setPage('select')}>
                    <Icon type={'sliders'} />
                </div>
        }

        return (
            <div className={componentClassName}>
                {select}
                {/*搜索*/}
                <div className={`${className}-search-border`}>
                    <SearchBar
                        className={`${className}-search`}
                        placeholder={'你想知道些什么。。'}
                    />
                </div>
                {/*菜单*/}
                <div className={`${className}-menu`} onClick={() => this.props.setPage('menu')}>
                    <Avatar url={this.props.publicReducer.userInfo.avatar} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reducer : state.layoutEhr,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);