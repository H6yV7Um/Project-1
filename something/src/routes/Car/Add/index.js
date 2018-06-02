import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Toast} from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import Car from 'appComponents/Car';
import QueueAnim from 'rc-queue-anim';
import {Row, Col} from 'antd';
import Button from 'components/Button';
import {setLayout, setDefaultLayout} from 'layouts/CarLayout/action';

import {add} from './action';

import './style.scss';

class Add extends Component {
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
        this.props.setLayout({
            title: '添加爱车',
            footer:
                <Row>
                    <Col span={24}>
                        <Button name="添加" action={this.submit} isLoading={{reducer: 'carAdd', isLoading: 'fetchAdd'}} />
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
            this.props.add(this.values, data => {
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
        return(
            <div className="Car-Add">
                <QueueAnim
                    type={['right', 'left']}
                    ease={['easeOutQuart', 'easeInOutQuart']}>
                    {/*车*/}
                    <Car
                        key="car"
                        setErrors={errors => this.errors = errors}
                        setValues={values => this.values = values}
                    />
                </QueueAnim>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.carAdd,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    setLayout, setDefaultLayout, add
}

export default store => ({
    path : 'add',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'carAdd', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Add));
        })
    }
})
