import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast,List} from 'antd-mobile';
import {injectReducer} from 'store/reducers';
import $ from 'jquery';
import {} from './action';
import './style.scss';
import getSrc from 'utils/imgSrc';

const Item = List.Item;
const Brief = Item.Brief;
let className = `Coursera-Table`;

class Table extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes =
    {

    }
    render() {
        let table = getSrc(`Coursera/table.png`)
        return(
            <div className={`${className}`}>
                <List>
                    <Item
                          multipleLine
                    >
                        <div 
                            className="userProfile Grid" 
                        >
                            <p 
                                className="Grid-cell"
                                style={{
                                    backgroundImage:`url(${table})`,
                                    backgroundSize:"100% 100%"
                                }}
                            />
                            <div
                                className="Grid-cell"

                            >
                                <p>姓名: 汪乐</p>
                                <p>部门: BI</p>
                                <p>获得时间: 2017/10/26</p>
                                <p>课程证书: 
                                    <a className="certificate" href="https://www.coursera.org/account/accomplishments/certificate/PTPZ4JYNKJYX">
                                        Capstone: Retrieving, Processing, and Visualizing Data with Python
                                    </a>
                                </p>
                            </div>
                        </div>
                        {/*<div className="userProfile">
                            <img
                                className="header"
                                src={`${table}`}
                            />
                            <span className="name">汪乐</span>
                            <span className="department">BI</span>
                            <span className="date">2017/10/25</span>
                        </div>
                        <p>课程名称:
                            <a href="https://www.coursera.org/account/accomplishments/certificate/PTPZ4JYNKJYX">
                                学会如何学习:帮助你掌握复杂学科的强大智力工具(Learning How to Learn）
                            </a>
                        </p>*/}
                    </Item>
                </List>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    reducer : state.table
})
const mapDispatchToProps = {
}
export default store => ({
    path : 'table',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'table', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Table))
        })
    }
})