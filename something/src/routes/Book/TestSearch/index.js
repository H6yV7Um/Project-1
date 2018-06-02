import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Row, Tag, Spin} from 'antd';
import Col from 'components/Col';
import Module from 'components/Search/Module';
import Item from 'components/Search/Item';
import Summary from 'appComponents/Book/Summary';
import Button from 'components/Button';
import CheckBoxGroup from 'components/CheckBoxGroup';

import {getRecommend} from './action';
import {setLayout, setDefaultLayout} from 'layouts/BookLayout/action';

// 以下为搜索框测试组件 需删
import Search from 'components/Search';

import './style.scss';

let returnData = null;
class TestSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedList : [],
            indeterminate : true,
            checkAll : false,
            res : [],
            data : null
        }
    }

    componentWillMount() {
        window.scrollTo(0,0);
        this.props.setLayout({title: '搜索', footer: ' '});
        this.props.getRecommend();
    }

    componentDidMount() {
        if(this.props.reducer.recommend.length === 0){
            this.props.getRecommend(4);
        }
        console.log(this.state.status)
        this.props.setLayout({
            title : "搜索",
            footer:
                <Row key={new Date().getTime()}>
                    <Col span={24}>
                        <Button name={'确定'} style={{}} type={'normal'} action={this.confirm} />
                    </Col>
                </Row>
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.props.setDefaultLayout();

    }

    confirm = () => {
        console.log(this.state.checkedList)
    }

    // onChange = e => {
    //     console.log(e.target.checked);
    // }

    onChange = (e) => {
        let arr = [].concat([], this.state.checkedList);
        if(e.target.checked) {
            this.props.reducer.recommend.map((v, k) => {
                if(v.book_id == returnData.book_id) {
                    arr.push(v)
                }
            })
        }else {
            this.props.reducer.recommend.map((v, k) => {
                if(v.book_id == returnData.book_id) {
                    arr.splice(k, 1);
                }
            })
        }
        this.setState({
            checkedList : arr
        })
    }
    // onCheckAllChange = (e) => {
    //     let arr = [];
    //     if(e.target.checked) {
    //         arr = this.props.reducer.recommend;
    //     }else {
    //         arr = [];
    //     }
    //     this.setState({
    //         checkedList : arr
    //     })
    //     console.log(arr);
    // }
    test = data => {
        if(data.props) {
            returnData = data.props.book;
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

        let content = null,
            contentList = [];

        this.props.reducer.recommend.map((v, k) => {
            content =
                <Summary
                    key={k}
                    book={v}
                />
            contentList.push(content);
        });

        return(
            <div className="Book-RecommendList">
                <Search
                    default={this.props.reducer.default}
                    search={value => {
                        console.log(value);
                    }}
                >
                    {moduleList}
                </Search>
                {/*<div style={{ borderBottom: '1px solid #E9E9E9' }}>*/}
                    {/*<CheckBox*/}
                        {/*indeterminate={this.state.indeterminate}*/}
                        {/*onChange={this.onCheckAllChange}*/}
                        {/*checked={this.state.checkAll}*/}
                        {/*action={this.test}*/}
                    {/*>*/}
                        {/*Check all*/}
                    {/*</CheckBox>*/}
                {/*</div>*/}
                {/*<br />*/}
                <CheckBoxGroup
                    option={contentList}
                    onChange={this.onChange}
                    value={this.state.checkedList}
                    action={this.test}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.testSearch,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    getRecommend, setDefaultLayout, setLayout
}

export default store => ({
    path : 'test',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'testSearch', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(TestSearch));
        })
    }
})
