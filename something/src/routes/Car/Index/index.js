import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Spin, Row, Col} from 'antd';
import {WingBlank, SwipeAction, Modal, Toast} from 'antd-mobile';
import Icon from 'components/Icon';
import MessageTitle from 'components/MessageTitle';
import ToastContent from 'components/ToastContent';
import dd from 'utils/dingding';
import getSrc from 'utils/imgSrc';
import {getList, deleteCar} from './action';

import './style.scss';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        // 获取列表
        this.props.getList(data => {
            this.setState({list : data});
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const Alert = Modal.alert;
        let render =
            <div className="none">
                <MessageTitle type="danger" icon={<Icon type="exclamation-circle" />} title="暂无爱车"/>
                <Link to="/car/add">
                    <WingBlank>
                        <div className="button-action add">
                            <Icon type="plus" /><span>添加一辆~</span>
                        </div>
                    </WingBlank>
                </Link>
            </div>

        if(this.props.reducer.list && this.props.reducer.list.length > 0)
        {
            render = [];
            this.props.reducer.list.map((v, k) => {
                // 操作按钮
                let actionRight = [];
                // pc处理
                if(dd.os == 'pc')
                {
                    actionRight.push(
                        {
                            className : 'cancel',
                            text : '取消'
                        }
                    );
                }

                actionRight.push(
                    {
                        className : 'edit',
                        text : '编辑',
                        onPress : () => this.props.router.push(`/car/edit/${v.car_id}`)
                    }
                );
                actionRight.push(
                    {
                        className : 'delete',
                        text : '删除',
                        onPress : () => {
                            Alert('删除爱车', '你确定删除该爱车吗？', [
                                {text: '再想想', style: 'default'},
                                {text: '删除', onPress: () => {this.props.deleteCar(v.car_id)}, style: {fontWeight: 'bold', color: '#ff3433'}},
                            ]);
                        }
                    }
                );

                render.push(
                    <div className="car" key={`car_${k}`}>
                        <div className="photo"><img src={getSrc(v.photo)} alt="爱车靓照" /></div>
                        <div className="info-border">
                            <SwipeAction
                                className="info-action"
                                autoClose
                                onOpen={() => this.setState({list : {...this.state.list , [k] : {...this.state.list[k], open : true}}})}
                                onClose={() => this.setState({list : {...this.state.list , [k] : {...this.state.list[k], open : false}}})}
                                right={actionRight}>
                                <div className="info-content">
                                    <div className="info">
                                        <div>
                                            <span className="num"><span>{v.num}</span></span>
                                        </div>
                                    </div>
                                    <div className="operation">
                                        <div>
                                            <Icon type={this.state.list && this.state.list[k].open ? 'angle-double-right' : 'angle-double-left'} />
                                        </div>
                                    </div>
                                </div>
                            </SwipeAction>
                        </div>
                    </div>
                );
            });
        }

        return(
            <div className="Car-Index" style={{display : this.props.reducer.fetchGetList ? 'none' : 'block'}}>
                {render}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.car,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    getList, deleteCar
}

export default store => ({
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'car', reducer : require('./reducer').default})
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Index))
        })
    }
})
