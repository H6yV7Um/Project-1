import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {WingBlank, SwipeAction, Modal, Toast} from 'antd-mobile';
import ModularContainer from 'components/ModularContainer';
import Module from 'components/Search/Module';
import Item from 'components/Search/Item';
import Icon from 'components/Icon';
import SearchLink from 'components/SearchLink';
import Summary from 'appComponents/Book/Summary';
import ScrollLoad from 'components/ScrollLoad';
import BookShow from 'appComponents/Book/Show';
import Grid from 'components/Grid';

import {getRecommend, getLike} from './action';
import {setLayout, setDefaultLayout} from 'layouts/BookLayout/action';

import './style.scss';

class Library extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 搜索结果
            result : []
        };
    }

    componentWillMount() {
        this.props.setLayout({title: '图书馆'});
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
    }

    componentDidMount() {
        if(!this.props.reducer.recommend)
        {
            const limit = Math.floor((document.body.clientWidth - 15) / (75 + 15));
            // 获取热门推荐
            this.props.getRecommend(limit,
                data => {
                    // 获取猜你喜欢
                    this.props.getLike(data.got_ids, limit);
                }
            );
        }
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
                            console.log(v2)
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

        // 热门推荐
        let recommend = null;
        let search = null;
        let searchList = [];
        if(this.props.reducer.recommend)
        {
            let recommendBooks = [];
            this.props.reducer.recommend.map((v, k) => {
                recommendBooks.push(
                    <BookShow
                        key={k}
                        book={v}
                        size={'small'}
                    />
                );
            })
            recommend =
                <Grid
                    style={{marginBottom : -7}}
                    width={75}
                    itemList={recommendBooks}
                />
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

            search =
                <ScrollLoad
                    loadingClassName={'recommend-list-loading'}
                    isLoad={this.props.reducer.hasRecommendData}
                    offset={0}
                    isLoading={this.props.reducer.fetchGetRecommend}
                    load={() => {}}
                    isAutoFirst={true}
                    autoTimes={-1}
                >
                    {searchList}
                </ScrollLoad>
        }

        // 猜你喜欢
        let like = null;
        if(this.props.reducer.like)
        {
            like = <BookShowList books={this.props.reducer.like} size={'small'} />;
        }



        return(
            <div className="Book-Library">


                <SearchLink
                    default={"岛上书店"}
                    type={"input"}
                    path={"/book/search"}
                />
                {/*热门推荐*/}
                <ModularContainer name={'热门推荐'} borderTop={false} extra={<Link to="/book/recommend_list"><div className="books-more"><Icon type={'angle-right'} /></div></Link>}>
                    {recommend}
                </ModularContainer>

                {/*猜你喜欢*/}
                <ModularContainer name={'猜你喜欢'} extra={<Link to="/book/like_list"><div className="books-more"><Icon type={'angle-right'} /></div></Link>}>
                    {like}
                </ModularContainer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.library,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    getRecommend, getLike, setLayout, setDefaultLayout
}

export default store => ({
    path : 'library',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'library', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Library));
        })
    }
})
