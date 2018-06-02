import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import Button from 'components/Button';
import {Spin} from 'antd';
import $ from 'jquery';
import {List, Toast} from 'antd-mobile';
import Offer from 'appComponents/Recruit/Offer';
import ToastContent from 'components/ToastContent';

import {addOfferInfo} from './action';
import {setLayout, setDefaultLayout} from 'layouts/RecruitLayout/action';

import './style.scss';

// offer发放
class Send extends Component {
    constructor(props) {
        super(props);

        // offer表单数据异常
        this.errors = null;
        // offer表单数据
        this.values = null;

        this.state = {

        };
    }


    componentWillMount() {
        // console.log(this.props.publicReducer.userInfo)
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    /**
     *  提交
     */
    submit = () => {
        if(this.values){
            this.values.userId = this.props.publicReducer.userInfo.user_id;
            this.props.addOfferInfo(this.values);
            if(this.props.reducer.isFetch) {
                Toast.info(<ToastContent type="success" content='已发送'/>, 2, false);
            }
        }else {
            Toast.info(<ToastContent type="fail" content={this.errors} />, 2, false);
        }
    }

    render() {
        let className = 'routeRecruitDdOfferSend';

        // console.log(this.props.reducer);
        if(this.props.reducer.feedbackStatus){
            this.props.reducer.feedbackStatus = null;
            this.props.reducer.isFetch = null;
        }

        return(
            <Spin spinning={this.props.reducer.isFetch} style={{height : $(window).height()}}>
                <div className={className}>
                    <Offer>
                        key="offer"
                        setErrors={errors => this.errors = errors}
                        setValues={values => this.values = values}
                    </Offer>
                    <Button className={`${className}-send-btn`} name="添加" action={this.submit}/>
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.recruitDdOfferSend,
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {
    addOfferInfo, setLayout, setDefaultLayout
}

export default store => ({
    path: 'offer/send',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'recruitDdOfferSend', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Send));
        })
    }
})
