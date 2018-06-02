import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import {Toast} from 'antd-mobile';
import ToastContent from 'components/ToastContent';
import Button from 'components/Button';
import BookComponent from 'appComponents/Book/Book';
import {setLayout, setDefaultLayout} from 'layouts/BookLayout/action';

import './style.scss';

class RecommendReady extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        // 书数据异常
        this.errors = null;
        // 书数据
        this.values = null;
    }

    componentWillMount() {
        this.props.setLayout({
            title : '推荐读书',
            footer : <Button name="下一步" action={this.submit} />
        })
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

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
            const name = this.values.name.replace(/\//g,'%2F');
            const author = this.values.author.replace(/\//g,'%2F');
            this.props.router.push(`/book/recommend/${name}/${author}`);
        }
        else if(this.errors)
        {
            Toast.info(<ToastContent type="fail" content={this.errors} />, 5, null, false);
        }
    }

    render() {
        return(
            <div className="Book-RecommendReady">
                <BookComponent
                    data={this.props.reducer.book}
                    hideItems={['cover', 'book_tag_ids', 'profile']}
                    setErrors={errors => this.errors = errors}
                    setValues={values => this.values = values}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.bookRecommendReady,
    publicReducer : state.coreLayout
})

const mapDispatchToProps = {
    setLayout, setDefaultLayout
}

export default store => ({
    path : 'recommend_ready',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'bookRecommendReady', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(RecommendReady));
        })
    }
})
