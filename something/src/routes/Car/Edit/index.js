import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Spin} from 'antd';
import {Toast} from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import Car from 'appComponents/Car';
import QueueAnim from 'rc-queue-anim';
import {Row, Col} from 'antd';
import Button from 'components/Button';
import {setLayout, setDefaultLayout} from 'layouts/CarLayout/action';

import {edit, get} from './action';

import './style.scss';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        // 车数据异常
        this.errors = null;
        // 车数据
        this.values = null;
    }

    componentWillMount() {
        // 获取旧数据
        this.props.get(this.props.params.carId);

        this.props.setLayout({
            title: '编辑爱车',
            footer:
                <Row>
                    <Col span={24}>
                        <Button name="编辑" action={this.submit} isLoading={{reducer: 'carEdit', isLoading: 'fetchEdit'}} />
                    </Col>
                </Row>
        })
    }

    componentWillUnmount() {
        this.props.setDefaultLayout();
    }

    /**
     *  提交
     */
    submit = () => {
        if(this.values)
        {
            this.props.edit(this.props.params.carId, this.values, data => {
                // 跳转
                this.props.router.push('/car');
            }, status => {
                Toast.info(<ToastContent type="fail" content={status.message} />, 3, null, false);
                // 查找
                if(status.code == 2)
                {
                    this.props.coreFindUserForCarNum(this.values.num);
                }
            });
        }
        else if(this.errors)
        {
            Toast.info(<ToastContent type="fail" content={this.errors} />, 5, null, false);
        }
    }

    render() {
        let car = null;
        if(this.props.reducer.data)
        {
            car =
                <Car
                    key="car"
                    data={this.props.reducer.data}
                    setErrors={errors => this.errors = errors}
                    setValues={values => this.values = values}
                />
        }

        return(
            <Spin spinning={this.props.reducer.fetchGet ? true : false} style={{height : document.body.clientHeight}}>
                <div className="Car-Edit" style={{display : this.props.reducer.fetchGet ? 'none' : 'block'}}>
                    <QueueAnim
                        type={['right', 'left']}
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        {/*车*/}
                        {car}
                    </QueueAnim>
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.carEdit,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    setLayout, setDefaultLayout, edit, get
}

export default store => ({
    path : 'edit/:carId',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'carEdit', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Edit));
        })
    }
})
