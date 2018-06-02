import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import Search from 'components/Search'
import ScrollLoad from 'components/ScrollLoad';
import CheckBoxGroup from 'components/CheckBoxGroup';
import Summary from 'appComponents/Book/Summary';
import Module from 'components/Search/Module';
import Item from 'components/Search/Item';

import {getRecommend} from './action';
import {setLayout, setDefaultLayout} from 'layouts/BookLayout/action';

import './style.scss';

class BookSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result : [],
            checkedList : []
        };

        this.searchData = [];
    }

    componentWillMount() {
        this.props.setLayout({title: '搜索', footer: ' '});
    }

    componentDidMount() {
        if(this.props.reducer.recommend.length === 0){
            this.props.getRecommend(4);
        }
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
    }

    search = val => {
        console.log(val);
        // 将搜索之后的数据传入search组件中
        this.setState({
            result : this.searchData
        })
        console
    }

    onChange = (e) => {
        console.log(e.target.value);
    }

    action = val => {
        console.log(val);
    }

    render() {
        let module = null,
            moduleList = [],
            item = null,
            itemList = [];

        this.props.reducer.searchInfo.info.map((v1, k1) => {
            itemList = [];
            v1.data.map((v2, k2) => {
                item =
                    <Item
                        key={k2}
                        content={v2.name}
                        num={k1 == 1 ? k2 + 1 : 0}
                        choose={() => {
                            this.search(v2.name);
                        }}
                    />
                itemList.push(item);
            });
            module =
                <Module
                    key={k1}
                    title={v1.title}
                    isClear={true}
                    clear={() => {
                        console.log(v1)
                    }}
                >
                    {itemList}
                </Module>
            moduleList.push(module);
        })

        console.log(moduleList)
        // 热门推荐
        let recommend = null;
        let search = null;
        let searchList = [];
        if(this.props.reducer.recommend)
        {
            // 搜索结果
            if(this.props.reducer.recommend.length > 0){
                this.props.reducer.recommend.map((item, index) => {
                    searchList.push(
                        <Summary
                            key={index}
                            book={item}
                        />
                    )
                });
            }

            // search =
            //     <ScrollLoad
            //         loadingClassName={'recommend-list-loading'}
            //         isLoad={this.props.reducer.hasRecommendData}
            //         offset={0}
            //         isLoading={this.props.reducer.fetchGetRecommend}
            //         load={() => {}}
            //         isAutoFirst={true}
            //         autoTimes={-1}
            //     >
            //         {searchList}
            //     </ScrollLoad>
            search =
                <CheckBoxGroup
                    option={searchList}
                    onChange={this.onChange}
                    value={this.state.checkedList}
                    action={this.action}
                />

            // 作为暂时的搜索之后的数据
            this.searchData = search;
        }
        return(
            <Search
                search={val => {
                    this.search(val);
                }}
                default={"岛上书店"}
                result={this.state.result}
                type={"input"}
                interval={200}
            >
                {moduleList}
            </Search>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.bookSearch,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    getRecommend, setDefaultLayout, setLayout
}

export default store => ({
    path : 'search',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'bookSearch', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(BookSearch));
        })
    }
})
