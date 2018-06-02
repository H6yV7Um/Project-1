import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import Show from 'components/Show';
import ScrollPage from 'components/ScrollPage';
import ImageLoading from 'components/ImageLoading';
import {getLocation, getPosition} from 'utils/location';
import getSrc from 'utils/imgSrc';
import $ from 'jquery';
import 'jquery-easing';

import {} from './action';

import './style.scss';

class Know extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 当前页数
            page                :   1,
            // 显示
            isShowPerson2008    :   true,

            // 显示状态...
            person2008          :   'show',
            light2008           :   'wait',
            msg2008             :   'wait',

            msg2011             :   'wait',
            person2011          :   'wait',
            road2011            :   'wait',
            sky2011             :   'wait',
            title2011           :   'wait',

            angle2012           :   'wait',
            line2012            :   'wait',
            msg2012             :   'wait',
            num2012             :   'wait',
            person2012          :   'wait',

            msg2013             :   'wait',
            person20132013      :   'wait',
            person20142013      :   'wait',
            person20152013      :   'wait',
            podium20132013      :   'wait',
            podium20142013      :   'wait',
            podium20152013      :   'wait',

            person2014          :   'wait',
            medal2014           :   'wait',
            star12014           :   'wait',
            star22014           :   'wait',
            star32014           :   'wait',
            msg2014             :   'wait',

            content2015         :   'wait',
            icon2015            :   'wait',
            msg2015             :   'wait',
            paper2015           :   'wait',
            seal2015            :   'wait',
            title2015           :   'wait',

            cook2016            :   'wait',
            msg2016             :   'wait',
            person2016          :   'wait',
            person12016         :   'wait',
            person22016         :   'wait',
            person32016         :   'wait',
            person42016         :   'wait',

            city20162           :   'wait',
            google20162         :   'wait',
            person20162         :   'wait',
            msg20162            :   'wait',

            magnifier2017       :   'wait',
            msg2017             :   'wait',
            name2017            :   'wait',
            paper12017          :   'wait',
            paper22017          :   'wait',
            words2017           :   'wait',

            button20172         :   'wait',
            glasses20172        :   'wait',
            google20172         :   'wait',
            msg20172            :   'wait',
            person20172         :   'wait'
        };
    }

    // 切换页面
    change = (page, direction) => {
        switch (page)
        {
            case 1:
                this.setState({person2008 : 'show', sky2011 : 'hide'});
                break;
            case 2:
                if(direction == 'next')
                {
                    this.setState({sky2011 : 'show', person2008 : 'hide'});
                }
                else
                {
                    this.setState({sky2011 : 'show', podium20132013 : 'hide'});
                }
                break;
            case 3:
                if(direction == 'next')
                {
                    this.setState({podium20132013 : 'show', sky2011 : 'hide'});
                }
                else
                {
                    this.setState({podium20132013 : 'show', angle2012 : 'hide'});
                }
                break;
            case 4:
                if(direction == 'next')
                {
                    this.setState({angle2012 : 'show', podium20132013 : 'hide'});
                }
                else
                {
                    this.setState({angle2012 : 'show', person2014 : 'hide'});
                }
                break;
            case 5:
                if(direction == 'next')
                {
                    this.setState({person2014 : 'show', angle2012 : 'hide'});
                }
                else
                {
                    this.setState({person2014 : 'show', paper2015 : 'hide'});
                }
                break;
            case 6:
                if(direction == 'next')
                {
                    this.setState({paper2015 : 'show', person2014 : 'hide'});
                }
                else
                {
                    this.setState({paper2015 : 'show', person12016 : 'hide'});
                }
                break;
            case 7:
                if(direction == 'next')
                {
                    this.setState({person12016 : 'show', paper2015 : 'hide'});
                }
                else
                {
                    this.setState({person12016 : 'show', city20162 : 'hide'});
                }
                break;
            case 8:
                if(direction == 'next')
                {
                    this.setState({city20162 : 'show', person12016 : 'hide'});
                }
                else
                {
                    this.setState({city20162 : 'show', paper12017 : 'hide'});
                }
                break;
            case 9:
                if(direction == 'next')
                {
                    this.setState({paper12017 : 'show', city20162 : 'hide'});
                }
                else
                {
                    this.setState({paper12017 : 'show', glasses20172 : 'hide'});
                }
                break;
            case 10:
                this.setState({glasses20172 : 'show', paper12017 : 'hide'});
                break;
        }
    }

    render() {
        //第1页 - 2008 - 人
        let person2008ImgClassName = 'show-img';
        if(this.state.isShowPerson2008)
        {
            person2008ImgClassName += ' show';
        }

        return(
            <ImageLoading
                images={[
                    'Know/progress_on.png', 'Know/progress_off.png', 'Know/arrow.png', 'Know/2008/person.png', 'Know/2008/light.png', 'Know/2008/msg.png', 'Know/2011/msg.png',
                    'Know/2011/person.png', 'Know/2011/road.png', 'Know/2011/sky.png', 'Know/2011/title.png', 'Know/2012/line.png', 'Know/2012/msg.png',
                    'Know/2012/num.png', 'Know/2012/person.png', 'Know/2013/msg.png', 'Know/2013/person2013.png', 'Know/2013/person2014.png', 'Know/2013/person2015.png',
                    'Know/2013/podium2013.png', 'Know/2013/podium2014.png', 'Know/2013/podium2015.png', 'Know/2014/person.png', 'Know/2014/msg.png', 'Know/2014/star1.png',
                    'Know/2014/star2.png', 'Know/2014/star3.png', 'Know/2014/medal.png', 'Know/2015/content.png', 'Know/2015/icon.png', 'Know/2015/msg.png',
                    'Know/2015/paper.png', 'Know/2015/seal.png', 'Know/2015/title.png', 'Know/2016/cook.png', 'Know/2016/msg.png', 'Know/2016/person.png', 'Know/2016/person1.png',
                    'Know/2016/person2.png', 'Know/2016/person3.png', 'Know/2016/person4.png', 'Know/20162/city.png', 'Know/20162/google.png', 'Know/20162/msg.png',
                    'Know/20162/person.png', 'Know/2017/magnifier.png', 'Know/2017/msg.png', 'Know/2017/name.png', 'Know/2017/paper1.png', 'Know/2017/paper2.png',
                    'Know/2017/words.png', 'Know/20172/button.png', 'Know/20172/glasses.png', 'Know/20172/google.png', 'Know/20172/msg.png', 'Know/20172/person.png'
                ]}
            >
                <ScrollPage
                    className="Know"
                    page={this.state.page}
                    pageSum={10}
                    prev={page => {
                        this.setState({page : page - 1});
                    }}
                    next={page => {
                        this.setState({page : page + 1});
                    }}
                    onChangeStart={this.change}
                >
                    {/*第1页 - 2008*/}
                    <div className="page" style={{height : $(window).height()}}>
                        {/*进度条*/}
                        <div className="page-progress" style={{marginTop : getPosition(76)}}>
                            <div className="progress-on-border" style={{width : getPosition(46 + 82)}}>
                                <img className="progress-on" style={{width : $(window).width()}} src={getSrc('Know/progress_on.png')} />
                            </div>
                            <img className="progress-off" src={getSrc('Know/progress_off.png')} />
                        </div>
                        {/*第1页 - 2008 - 人*/}
                        <Show
                            className={'person-2008'}
                            hideStyle={{width : 410, height : 426, marginLeft : 195, marginTop : 266, zIndex : 3}}
                            hideScale={0.1}
                            showScale={1}
                            overflowIsVisible={true}
                            showAnimateName={'easeOutQuad'}
                            showDuration={1200}
                            showOffsetTime={200}
                            status={this.state.person2008}
                            onEnd={status => this.setState({light2008 : status, msg2008 : status, isShowPerson2008 : status == 'hide'})}
                        >
                            <img className={person2008ImgClassName} src={getSrc('Know/2008/person.png')} />
                        </Show>
                        {/*第1页 - 2008 - 光*/}
                        <Show
                            className={'light-2008'}
                            hideStyle={{width : 577, height : 577, marginLeft : 86.5, marginTop : 186, zIndex : 2}}
                            hideScale={0.5}
                            showScale={1}
                            showAnimateName={'easeOutQuint'}
                            showDuration={1000}
                            status={this.state.light2008}
                        >
                            <img className="show-img" src={getSrc('Know/2008/light.png')} />
                        </Show>
                        {/*第1页 - 2008 - 文字*/}
                        <Show
                            className={'msg-2008'}
                            hideStyle={{width : 378, height : 232, marginLeft : 186, zIndex : 1}}
                            showStyle={{marginTop : 816}}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            status={this.state.msg2008}
                        >
                            <img className="show-img" src={getSrc('Know/2008/msg.png')} />
                        </Show>
                    </div>

                    {/*第2页 - 2011*/}
                    <div className="page" style={{height : $(window).height(), marginTop : $(window).height()}}>
                        {/*进度条*/}
                        <div className="page-progress" style={{marginTop : getPosition(76)}}>
                            <div className="progress-on-border" style={{width : getPosition(46 + 82 * 2)}}>
                                <img className="progress-on" style={{width : $(window).width()}} src={getSrc('Know/progress_on.png')} />
                            </div>
                            <img className="progress-off" src={getSrc('Know/progress_off.png')} />
                        </div>
                        {/*第2页 - 2011 - 天空*/}
                        <Show
                            className={'sky-2011'}
                            hideStyle={{width : 750, height : 456, marginLeft : 0, marginTop : 230, zIndex : 1}}
                            hideScale={1.8}
                            showScale={1}
                            showAnimateName={'easeOutQuad'}
                            showDuration={1000}
                            showOffsetTime={100}
                            status={this.state.sky2011}
                            onEnd={status => this.setState({road2011 : status, person2011 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/2011/sky.png')} />
                        </Show>
                        {/*第2页 - 2011 - 人*/}
                        <Show
                            className={'person-2011'}
                            hideStyle={{width : 389, height : 399, marginTop : 332, zIndex : 3}}
                            showStyle={{marginLeft : 310}}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            status={this.state.person2011}
                            onEnd={status => this.setState({msg2011 : status, title2011 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/2011/person.png')} />
                        </Show>
                        {/*第2页 - 2011 - 路*/}
                        <Show
                            className={'road-2011'}
                            hideStyle={{width : 727, height : 411, marginLeft : -727, marginTop : 325, zIndex : 2}}
                            showStyle={{marginLeft : 11.5}}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            status={this.state.road2011}
                        >
                            <img className={'show-img'} src={getSrc('Know/2011/road.png')} />
                        </Show>
                        {/*第2页 - 2011 - 标题*/}
                        <Show
                            className={'road-2011'}
                            hideStyle={{width : 109, height : 26, marginLeft : 77, marginTop : 370, zIndex : 4}}
                            hideScale={0.1}
                            showScale={1}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            status={this.state.title2011}
                        >
                            <img className={'show-img'} src={getSrc('Know/2011/title.png')} />
                        </Show>
                        {/*第2页 - 2011 - 文字*/}
                        <Show
                            className={'msg-2011'}
                            hideStyle={{width : 563, height : 159, marginLeft : 93.5, zIndex : 1}}
                            showStyle={{marginTop : 810}}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            status={this.state.msg2011}
                        >
                            <img className="show-img" src={getSrc('Know/2011/msg.png')} />
                        </Show>
                    </div>

                    {/*第3页 - 2012*/}
                    <div className="page" style={{height : $(window).height(), marginTop : $(window).height() * 2}}>
                        {/*进度条*/}
                        <div className="page-progress" style={{marginTop : getPosition(76)}}>
                            <div className="progress-on-border" style={{width : getPosition(46 + 82 * 3)}}>
                                <img className="progress-on" style={{width : $(window).width()}} src={getSrc('Know/progress_on.png')} />
                            </div>
                            <img className="progress-off" src={getSrc('Know/progress_off.png')} />
                        </div>
                        {/*第3页 - 2012 - 领奖台2012*/}
                        <Show
                            className={'show-img-border podium2012-2012-border'}
                            hideStyle={{width : 249, height : 65, marginLeft : 72, marginTop : 576, zIndex : 1}}
                        >
                            <Show
                                className={'podium2012-2012'}
                                hideStyle={{width : 249, height : 65, marginLeft : 0, marginTop : 65, zIndex : 1}}
                                showStyle={{marginTop : 0}}
                                showAnimateName={'easeOutQuad'}
                                showDuration={300}
                                showOffsetTime={500}
                                status={this.state.podium20132013}
                                onStart={status => this.setState({podium20142013 : status, podium20152013 : status})}
                                onEnd={status => this.setState({person20132013 : status})}
                            >
                                <img className={'show-img'} src={getSrc('Know/2013/podium2013.png')} />
                            </Show>
                        </Show>
                        {/*第3页 - 2012 - 人2012*/}
                        <Show
                            className={'person2012-2012'}
                            hideStyle={{width : 373, height : 429, marginLeft : -373, marginTop : 154, zIndex : 2}}
                            showStyle={{marginLeft : 30}}
                            showAnimateName={'easeOutBack'}
                            showDuration={600}
                            status={this.state.person20132013}
                        >
                            <img className="show-img" src={getSrc('Know/2013/person2013.png')} />
                        </Show>
                        {/*第3页 - 2012 - 领奖台2013*/}
                        <Show
                            className={'show-img-border podium2013-2012-border'}
                            hideStyle={{width : 290, height : 75, marginLeft : 355, marginTop : 668, zIndex : 1}}
                        >
                            <Show
                                className={'podium2013-2012'}
                                hideStyle={{width : 290, height : 75, marginLeft : 0, marginTop : 75, zIndex : 1}}
                                showStyle={{marginTop : 0}}
                                showAnimateName={'easeOutQuad'}
                                showDuration={600}
                                status={this.state.podium20142013}
                                onEnd={status => this.setState({person20142013 : status})}
                            >
                                <img className={'show-img'} src={getSrc('Know/2013/podium2014.png')} />
                            </Show>
                        </Show>
                        {/*第3页 - 2012 - 人2013*/}
                        <Show
                            className={'person2013-2012'}
                            hideStyle={{width : 413, height : 497, marginTop : 177, zIndex : 3}}
                            showStyle={{marginLeft : 313}}
                            showAnimateName={'easeOutBack'}
                            showDuration={600}
                            status={this.state.person20142013}
                            onEnd={status => this.setState({msg2013 : status})}
                        >
                            <img className="show-img" src={getSrc('Know/2013/person2014.png')} />
                        </Show>
                        {/*第3页 - 2012 - 领奖台2014*/}
                        <Show
                            className={'show-img-border podium2015-2013-border'}
                            hideStyle={{width : 321, height : 84, marginLeft : 214.5, marginTop : 785, zIndex : 1}}
                        >
                            <Show
                                className={'podium2014-2012'}
                                hideStyle={{width : 321, height : 84, marginLeft : 0, marginTop : 84, zIndex : 1}}
                                showStyle={{marginTop : 0}}
                                showAnimateName={'easeOutQuad'}
                                showDuration={900}
                                status={this.state.podium20152013}
                                onEnd={status => this.setState({person20152013 : status})}
                            >
                                <img className={'show-img'} src={getSrc('Know/2013/podium2015.png')} />
                            </Show>
                        </Show>
                        {/*第3页 - 2012 - 人2014*/}
                        <Show
                            className={'person2014-2012'}
                            hideStyle={{width : 456, height : 546, marginLeft : 167, marginTop : -546, zIndex : 4}}
                            showStyle={{marginTop : 248}}
                            showAnimateName={'easeOutBounce'}
                            showDuration={1200}
                            status={this.state.person20152013}
                        >
                            <img className="show-img" src={getSrc('Know/2013/person2015.png')} />
                        </Show>
                        {/*第3页 - 2012 - 文字*/}
                        <Show
                            className={'msg-2012'}
                            hideStyle={{width : 453, height : 161, marginLeft : 148.5, zIndex : 5}}
                            showStyle={{marginTop : 910}}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            status={this.state.msg2013}
                        >
                            <img className="show-img" src={getSrc('Know/2013/msg.png')} />
                        </Show>
                    </div>

                    {/*第4页 - 2013*/}
                    <div className="page" style={{height : $(window).height(), marginTop : $(window).height() * 3}}>
                        {/*进度条*/}
                        <div className="page-progress" style={{marginTop : getPosition(76)}}>
                            <div className="progress-on-border" style={{width : getPosition(46 + 82 * 4)}}>
                                <img className="progress-on" style={{width : $(window).width()}} src={getSrc('Know/progress_on.png')} />
                            </div>
                            <img className="progress-off" src={getSrc('Know/progress_off.png')} />
                        </div>
                        {/*第4页 - 2013 - 坐标系*/}
                        <Show
                            className={'angle-2013'}
                            hideStyle={{width : 640, height : 435, marginLeft : -640, marginTop : 325, zIndex : 2}}
                            showStyle={{marginLeft : 70}}
                            showAnimateName={'easeOutQuint'}
                            showDuration={800}
                            showOffsetTime={300}
                            status={this.state.angle2012}
                            onEnd={status => this.setState({num2012 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/2012/angle.png')} />
                        </Show>
                        {/*第4页 - 2013 - 图表*/}
                        <Show
                            className={'show-img-border num-2013-border'}
                            hideStyle={{width : 548, height : 378, marginLeft : 120, marginTop : 372, zIndex : 1}}
                        >
                            <Show
                                className={'num-2013'}
                                hideStyle={{width : 548, height : 378, marginLeft : 0, marginTop : 378, zIndex : 1}}
                                showStyle={{marginTop : 0}}
                                showAnimateName={'easeOutQuint'}
                                showDuration={800}
                                status={this.state.num2012}
                                onEnd={status => this.setState({line2012 : status, person2012 : status})}
                            >
                                <img className={'show-img'} src={getSrc('Know/2012/num.png')} />
                            </Show>
                        </Show>
                        {/*第4页 - 2013 - 箭头*/}
                        <Show
                            className={'show-img-border line-2013-border'}
                            hideStyle={{width : 480, height : 251, marginLeft : 130, marginTop : 325, zIndex : 3}}
                        >
                            <Show
                                className={'line-2013'}
                                hideStyle={{width : 480, height : 251, marginLeft : -480, marginTop : 251, zIndex : 1}}
                                showStyle={{marginLeft : 0, marginTop : 0}}
                                showAnimateName={'easeOutCirc'}
                                showDuration={600}
                                status={this.state.line2012}
                                onEnd={status => this.setState({msg2012 : status})}
                            >
                                <img className={'show-img'} src={getSrc('Know/2012/line.png')} />
                            </Show>
                        </Show>
                        {/*第4页 - 2013 - 人*/}
                        <Show
                            className={'person-2013'}
                            hideStyle={{width : 184, height : 237, marginLeft : 90, marginTop : 330, zIndex : 4}}
                            showStyle={{marginLeft : 340, marginTop : 204}}
                            showAnimateName={'easeInOutElastic'}
                            showDuration={1800}
                            status={this.state.person2012}
                        >
                            <img className={'show-img'} src={getSrc('Know/2012/person.png')} />
                        </Show>
                        {/*第4页 - 2013 - 文字*/}
                        <Show
                            className={'msg-2013'}
                            hideStyle={{width : 547, height : 221, marginLeft : 101.5, zIndex : 1}}
                            showStyle={{marginTop : 820}}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            status={this.state.msg2012}
                        >
                            <img className="show-img" src={getSrc('Know/2012/msg.png')} />
                        </Show>
                    </div>

                    {/*第5页 - 2015*/}
                    <div className="page" style={{height : $(window).height(), marginTop : $(window).height() * 4}}>
                        {/*进度条*/}
                        <div className="page-progress" style={{marginTop : getPosition(76)}}>
                            <div className="progress-on-border" style={{width : getPosition(46 + 82 * 6)}}>
                                <img className="progress-on" style={{width : $(window).width()}} src={getSrc('Know/progress_on.png')} />
                            </div>
                            <img className="progress-off" src={getSrc('Know/progress_off.png')} />
                        </div>
                        {/*第5页 - 2015 - person*/}
                        <Show
                            className={'person-2015'}
                            hideStyle={{width : 488, height : 578, marginLeft : 110, marginTop : 195, zIndex : 1}}
                            hideScale={0.1}
                            showAnimateName={'easeOutQuad'}
                            showDuration={1500}
                            showOffsetTime={300}
                            status={this.state.person2014}
                            onStart={status => this.setState({medal2014 : status})}
                            onEnd={status => this.setState({person2014 : status, star12014 : status, star22014 : status, start32014 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/2014/person.png')} />
                        </Show>
                        {/*第5页 - 2015 - medal*/}
                        <Show
                            className={'medal-2015'}
                            hideStyle={{width : 493, height : 565, marginLeft : 640, marginTop : 38, zIndex : 2}}
                            showStyle={{marginLeft : 276}}
                            showAnimateName={'easeOutQuad'}
                            showDuration={1500}
                            showScale={0.3}
                            hideScale={2}
                            status={this.state.medal2014}
                            onEnd={status => this.setState({medal2014 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/2014/medal.png')} />
                        </Show>
                        {/*第5页 - 2015 - star1*/}
                        <Show
                            className={'star1-2015'}
                            hideStyle={{width : 97, height : 102, marginLeft : 50, marginTop : 310, zIndex : 3}}
                            showAnimateName={'easeInOutExpo'}
                            showDuration={1}
                            showOffsetTime={700}
                            existAnimateScale={0.1}
                            existAnimateDuration={300}
                            status={this.state.star12014}
                            onEnd={status => this.setState({star22014 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/2014/star1.png')} />
                        </Show>
                        {/*第5页 - 2015 - star2*/}
                        <Show
                            className={'star2-2015'}
                            hideStyle={{width : 65, height : 71, marginLeft : 600, marginTop : 410, zIndex : 3}}
                            showAnimateName={'easeInOutExpo'}
                            showDuration={1}
                            existAnimateScale={0.1}
                            existAnimateDuration={300}
                            status={this.state.star22014}
                            onEnd={status => this.setState({star32014 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/2014/star2.png')} />
                        </Show>
                        {/*第5页 - 2015 - star3*/}
                        <Show
                            className={'star3-2015'}
                            hideStyle={{width : 79, height : 89, marginLeft : 550, marginTop : 520, zIndex : 3}}
                            showAnimateName={'easeInOutExpo'}
                            showDuration={1}
                            showOffsetTime={1000}
                            existAnimateScale={0.1}
                            existAnimateDuration={300}
                            status={this.state.star32014}
                            onEnd={status => this.setState({medal2014 : status, msg2014 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/2014/star3.png')} />
                        </Show>
                        {/*第5页 - 2015 - 文字*/}
                        <Show
                            className={'msg-2015'}
                            hideStyle={{width : 397, height : 159, marginLeft : 176.5, zIndex : 1}}
                            showStyle={{marginTop : 850}}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            status={this.state.msg2014}
                        >
                            <img className="show-img" src={getSrc('Know/2014/msg.png')} />
                        </Show>
                    </div>

                    {/*第6页 - 2015*/}
                    <div className="page" style={{height : $(window).height(), marginTop : $(window).height() * 5}}>
                        {/*进度条*/}
                        <div className="page-progress" style={{marginTop : getPosition(76)}}>
                            <div className="progress-on-border" style={{width : getPosition(46 + 82 * 6)}}>
                                <img className="progress-on" style={{width : $(window).width()}} src={getSrc('Know/progress_on.png')} />
                            </div>
                            <img className="progress-off" src={getSrc('Know/progress_off.png')} />
                        </div>
                        {/*第6页 - 2015 - 纸*/}
                        <Show
                            className={'paper-2015'}
                            hideStyle={{width : 629, height : 548, marginLeft : -629, marginTop : -548, zIndex : 1}}
                            showStyle={{marginLeft : 60, marginTop : 220}}
                            showAnimateName={'easeOutBack'}
                            showDuration={1000}
                            showOffsetTime={500}
                            status={this.state.paper2015}
                            onEnd={status => this.setState({title2015 : status})}
                        >
                            <img className="show-img" src={getSrc('Know/2015/paper.png')} />
                        </Show>
                        {/*第6页 - 2015 - 标题*/}
                        <Show
                            className={'title-2015'}
                            hideStyle={{width : 262, height : 67, marginLeft : 154, marginTop : 269, zIndex : 2}}
                            hideScale={0.1}
                            showScale={1}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            status={this.state.title2015}
                            onEnd={status => this.setState({content2015 : status})}
                        >
                            <img className="show-img" src={getSrc('Know/2015/title.png')} />
                        </Show>
                        {/*第6页 - 2015 - 内容*/}
                        <Show
                            className={'show-img-border content-2015-border'}
                            hideStyle={{width : 326, height : 335, marginLeft : 214, marginTop : 340, zIndex : 3}}
                            hideScale={0.1}
                            showScale={1}
                            showAnimateName={'easeOutQuad'}
                            showDuration={900}
                            status={this.state.content2015}
                            onEnd={status => this.setState({seal2015 : status, icon2015 : status})}
                        >
                            <Show
                                className={'podium2014-2013'}
                                hideStyle={{width : 326, height : 335, marginLeft : 0, marginTop : 0, zIndex : 1}}
                            >
                                <img className={'show-img'} src={getSrc('Know/2015/content.png')} />
                            </Show>
                        </Show>
                        {/*第6页 - 2015 - 印章*/}
                        <Show
                            className={'seal-2015'}
                            hideStyle={{width : 148, height : 126, marginTop : 450, zIndex : 5}}
                            showStyle={{marginLeft : 595, marginTop : 558}}
                            showAnimateName={'easeOutElastic'}
                            showDuration={1200}
                            status={this.state.seal2015}
                        >
                            <img className="show-img" src={getSrc('Know/2015/seal.png')} />
                        </Show>
                        {/*第6页 - 2015 - 图标*/}
                        <Show
                            className={'icon-2015'}
                            hideStyle={{width : 90, height : 86, marginLeft : 515, marginTop : 640, zIndex : 4}}
                            status={this.state.icon2015}
                            showDuration={1}
                            showOffsetTime={200}
                            onEnd={status => this.setState({msg2015 : status})}
                        >
                            <img className="show-img" src={getSrc('Know/2015/icon.png')} />
                        </Show>
                        {/*第6页 - 2015 - 文字*/}
                        <Show
                            className={'msg-2015'}
                            hideStyle={{width : 546, height : 159, marginLeft : 102, zIndex : 5}}
                            showStyle={{marginTop : 850}}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            status={this.state.msg2015}
                        >
                            <img className="show-img" src={getSrc('Know/2015/msg.png')} />
                        </Show>
                    </div>

                    {/*第7页 - 2016*/}
                    <div className="page" style={{height : $(window).height(), marginTop : $(window).height() * 6}}>
                        {/*进度条*/}
                        <div className="page-progress" style={{marginTop : getPosition(76)}}>
                            <div className="progress-on-border" style={{width : getPosition(46 + 82 * 7)}}>
                                <img className="progress-on" style={{width : $(window).width()}} src={getSrc('Know/progress_on.png')} />
                            </div>
                            <img className="progress-off" src={getSrc('Know/progress_off.png')} />
                        </div>
                        {/*第7页 - 2016 - 库克*/}
                        <Show
                            className={'cook-2016'}
                            hideStyle={{width : 350, height : 520, marginTop : 244, zIndex : 6}}
                            showStyle={{marginLeft : 390}}
                            showAnimateName={'easeOutCubic'}
                            showDuration={800}
                            status={this.state.cook2016}
                            onEnd={status => this.setState({msg2016 : status})}
                        >
                            <img className="show-img" src={getSrc('Know/2016/cook.png')} />
                        </Show>
                        {/*第7页 - 2016 - 人*/}
                        <Show
                            className={'person-2016'}
                            hideStyle={{width : 369, height : 488, marginLeft : -369, marginTop : 277, zIndex : 5}}
                            showStyle={{marginLeft : 55}}
                            showAnimateName={'easeOutCubic'}
                            showDuration={800}
                            status={this.state.person2016}
                            onEnd={status => this.setState({cook2016 : status})}
                        >
                            <img className="show-img" src={getSrc('Know/2016/person.png')} />
                        </Show>
                        {/*第7页 - 2016 - 人1*/}
                        <Show
                            className={'person1-2016'}
                            hideStyle={{width : 332, height : 483, marginLeft : 0, marginTop : 207, zIndex : 1}}
                            showDuration={1}
                            showOffsetTime={500}
                            status={this.state.person12016}
                            onEnd={status => this.setState({person22016 : status})}
                        >
                            <img className="show-img" src={getSrc('Know/2016/person1.png')} />
                        </Show>
                        {/*第7页 - 2016 - 人2*/}
                        <Show
                            className={'person1-2016'}
                            hideStyle={{width : 354, height : 483, marginLeft : 29, marginTop : 226, zIndex : 2}}
                            showDuration={1}
                            showOffsetTime={300}
                            status={this.state.person22016}
                            onEnd={status => this.setState({person32016 : status})}
                        >
                            <img className="show-img" src={getSrc('Know/2016/person2.png')} />
                        </Show>
                        {/*第7页 - 2016 - 人3*/}
                        <Show
                            className={'person1-2016'}
                            hideStyle={{width : 354, height : 483, marginLeft : 74, marginTop : 246, zIndex : 3}}
                            showDuration={1}
                            showOffsetTime={300}
                            status={this.state.person32016}
                            onEnd={status => this.setState({person42016 : status})}
                        >
                            <img className="show-img" src={getSrc('Know/2016/person3.png')} />
                        </Show>
                        {/*第7页 - 2016 - 人4*/}
                        <Show
                            className={'person1-2016'}
                            hideStyle={{width : 354, height : 483, marginLeft : 119, marginTop : 265, zIndex : 4}}
                            showDuration={1}
                            showOffsetTime={300}
                            status={this.state.person42016}
                            onEnd={status => this.setState({person2016 : status})}
                        >
                            <img className="show-img" src={getSrc('Know/2016/person4.png')} />
                        </Show>
                        {/*第7页 - 2016 - 文字*/}
                        <Show
                            className={'msg-2016'}
                            hideStyle={{width : 517, height : 222, marginLeft : 116.5, zIndex : 1}}
                            showStyle={{marginTop : 820}}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            status={this.state.msg2016}
                        >
                            <img className="show-img" src={getSrc('Know/2016/msg.png')} />
                        </Show>
                    </div>

                    {/*第8页 - 2016*/}
                    <div className="page" style={{height : $(window).height(), marginTop : $(window).height() * 7}}>
                        {/*进度条*/}
                        <div className="page-progress" style={{marginTop : getPosition(76)}}>
                            <div className="progress-on-border" style={{width : getPosition(46 + 82 * 7)}}>
                                <img className="progress-on" style={{width : $(window).width()}} src={getSrc('Know/progress_on.png')} />
                            </div>
                            <img className="progress-off" src={getSrc('Know/progress_off.png')} />
                        </div>
                        {/*第8页 - 2016 - 城市*/}
                        <Show
                            className={'show-img-border city-20162-border'}
                            hideStyle={{width : 750, height : 450, marginLeft : 0, marginTop : 320, zIndex : 1}}
                        >
                            <Show
                                className={'city-20162'}
                                hideStyle={{width : 750, height : 377, marginLeft : 0, marginTop : 450, zIndex : 1}}
                                showStyle={{marginTop : 50}}
                                showAnimateName={'easeOutBack'}
                                showDuration={800}
                                showOffsetTime={500}
                                status={this.state.city20162}
                                onEnd={status => this.setState({person20162 : status})}
                            >
                                <img className={'show-img'} src={getSrc('Know/20162/city.png')} />
                            </Show>
                        </Show>
                        {/*第8页 - 2016 - person*/}
                        <Show
                            className={'person-20162'}
                            hideStyle={{width : 307, height : 506, marginTop : 230, zIndex : 2}}
                            showStyle={{marginLeft : 363}}
                            showAnimateName={'easeOutQuart'}
                            showDuration={1000}
                            status={this.state.person20162}
                            onEnd={status => this.setState({google20162 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/20162/person.png')} />
                        </Show>
                        {/*第8页 - 2016 - google*/}
                        <Show
                            className={'google-20162'}
                            hideStyle={{width : 306, height : 507, marginLeft : -306, marginTop : 230, zIndex : 3}}
                            showStyle={{marginLeft : 86}}
                            showAnimateName={'easeOutQuart'}
                            showDuration={1000}
                            status={this.state.google20162}
                            onEnd={status => this.setState({msg20162 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/20162/google.png')} />
                        </Show>
                        {/*第8页 - 2016 - 文字*/}
                        <Show
                            className={'msg-20162'}
                            hideStyle={{width : 561, height : 222, marginLeft : 94.5, zIndex : 1}}
                            showStyle={{marginTop : 800}}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            status={this.state.msg20162}
                        >
                            <img className="show-img" src={getSrc('Know/20162/msg.png')} />
                        </Show>
                    </div>

                    {/*第9页 - 2017*/}
                    <div className="page" style={{height : $(window).height(), marginTop : $(window).height() * 8}}>
                        {/*进度条*/}
                        <div className="page-progress" style={{marginTop : getPosition(76)}}>
                            <div className="progress-on-border" style={{width : getPosition(46 + 82 * 9)}}>
                                <img className="progress-on" style={{width : $(window).width()}} src={getSrc('Know/progress_on.png')} />
                            </div>
                            <img className="progress-off" src={getSrc('Know/progress_off.png')} />
                        </div>
                        {/*第9页 - 2017 - 纸1*/}
                        <Show
                            className={'paper1-2017'}
                            hideStyle={{width : 463, height : 89, marginLeft : 137, marginTop : 198, zIndex : 3}}
                            showDuration={1}
                            showOffsetTime={500}
                            status={this.state.paper12017}
                            onStart={status => this.setState({paper22017 : status, words2017 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/2017/paper1.png')} />
                        </Show>
                        {/*第9页 - 2017 - 字*/}
                        <Show
                            className={'show-img-border'}
                            hideStyle={{width : 373, height : 0, marginLeft : 195, marginTop : 300, zIndex : 2}}
                            showStyle={{height : 392}}
                            showAnimateName={'easeOutBounce'}
                            showDuration={1500}
                            status={this.state.words2017}
                        >
                            <Show
                                className={'words-2017'}
                                hideStyle={{width : 373, height : 392, marginLeft : 0, marginTop : 0, zIndex : 1}}
                                showDuration={1}
                                status={this.state.words2017}
                            >
                                <img className={'show-img'} src={getSrc('Know/2017/words.png')} />
                            </Show>
                        </Show>
                        {/*第9页 - 2017 - 纸2*/}
                        <Show
                            className={'show-img-border'}
                            hideStyle={{width : 460, height : 532, marginLeft : 150, marginTop : 242, zIndex : 1}}
                            showDuration={1}
                            status={this.state.paper22017}
                        >
                            <Show
                                className={'paper2-2017'}
                                hideStyle={{width : 460, height : 532, marginLeft : 0, marginTop : -370, zIndex : 1}}
                                showStyle={{marginTop : 0}}
                                showAnimateName={'easeOutBounce'}
                                showDuration={1500}
                                status={this.state.paper22017}
                                onEnd={status => this.setState({magnifier2017 : status, name2017 : status, msg2017 : status})}
                            >
                                <img className={'show-img'} src={getSrc('Know/2017/paper2.png')} />
                            </Show>
                        </Show>
                        {/*第9页 - 2017 - 放大镜*/}
                        <Show
                            className={'magnifier-2017'}
                            hideStyle={{width : 216, height : 258, marginLeft : -216, marginTop : 388, zIndex : 5}}
                            showStyle={{marginLeft : 625}}
                            showAnimateName={'easeInQuad'}
                            showDuration={500}
                            existAnimateStyle={{marginLeft : -100, marginTop : 120}}
                            existAnimateName={'easeOutBack'}
                            existAnimateDuration={600}
                            existAnimateIsBack={false}
                            status={this.state.magnifier2017}
                        >
                            <img className={'show-img'} src={getSrc('Know/2017/magnifier.png')} />
                        </Show>
                        {/*第9页 - 2017 - 名字*/}
                        <Show
                            className={'show-img-border'}
                            hideStyle={{width : 0, height : 150, marginLeft : 38, marginTop : 413, zIndex : 4}}
                            showStyle={{width : 653}}
                            showAnimateName={'easeInQuad'}
                            showDuration={400}
                            showOffsetTime={100}
                            status={this.state.name2017}
                        >
                            <Show
                                className={'name-2017'}
                                hideStyle={{width : 653, height : 150, marginLeft : 0, marginTop : 0, zIndex : 1}}
                                showDuration={1}
                                status={this.state.name2017}
                            >
                                <img className={'show-img'} src={getSrc('Know/2017/name.png')} />
                            </Show>
                        </Show>
                        {/*第9页 - 2017 - 文字*/}
                        <Show
                            className={'msg-2017'}
                            hideStyle={{width : 696, height : 161, marginLeft : 27, zIndex : 1}}
                            showStyle={{marginTop : 840}}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            showOffsetTime={200}
                            status={this.state.msg2017}
                        >
                            <img className={'show-img'} src={getSrc('Know/2017/msg.png')} />
                        </Show>
                    </div>

                    {/*第10页 - 2017*/}
                    <div className="page" style={{height : $(window).height(), marginTop : $(window).height() * 9}}>
                        {/*进度条*/}
                        <div className="page-progress" style={{marginTop : getPosition(76)}}>
                            <div className="progress-on-border" style={{width : getPosition(46 + 82 * 9)}}>
                                <img className="progress-on" style={{width : $(window).width()}} src={getSrc('Know/progress_on.png')} />
                            </div>
                            <img className="progress-off" src={getSrc('Know/progress_off.png')} />
                        </div>
                        {/*第10页 - 2017 - 眼镜*/}
                        <Show
                            className={'person-20172'}
                            hideStyle={{width : 675, height : 247, marginLeft : 37.5, marginTop : 283, zIndex : 2}}
                            hideScale={0.1}
                            showAnimateName={'easeOutBack'}
                            showDuration={1000}
                            showOffsetTime={500}
                            status={this.state.glasses20172}
                            onEnd={status => this.setState({google20172 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/20172/glasses.png')} />
                        </Show>
                        {/*第10页 - 2017 - google*/}
                        <Show
                            className={'google-20172'}
                            hideStyle={{width : 151, height : 146, marginLeft : 153, marginTop : 334, zIndex : 1}}
                            hideScale={0.1}
                            showAnimateName={'easeOutCubic'}
                            showDuration={1000}
                            status={this.state.google20172}
                            onEnd={status => this.setState({person20172 : status, msg20172 : status, button20172 : status})}
                        >
                            <img className={'show-img'} src={getSrc('Know/20172/google.png')} />
                        </Show>
                        {/*第10页 - 2017 - 人*/}
                        <Show
                            className={'people-20172'}
                            hideStyle={{width : 206, height : 201, marginLeft : 410, marginTop : 90, zIndex : 1}}
                            showStyle={{marginTop : 312}}
                            showAnimateName={'easeInOutBounce'}
                            showDuration={2000}
                            status={this.state.person20172}
                        >
                            <img className={'show-img'} src={getSrc('Know/20172/person.png')} />
                        </Show>
                        {/*第10页 - 2017 - 文字*/}
                        <Show
                            className={'msg-20172'}
                            hideStyle={{width : 590, height : 121, marginLeft : 80, zIndex : 1}}
                            showStyle={{marginTop : 605}}
                            showAnimateName={'easeOutBack'}
                            showDuration={800}
                            showOffsetTime={1000}
                            status={this.state.msg20172}
                        >
                            <img className={'show-img'} src={getSrc('Know/20172/msg.png')} />
                        </Show>
                        {/*第10页 - 2017 - 按钮*/}
                        <Show
                            className={'button-20172'}
                            hideStyle={{width : 434, height : 99, marginLeft : 156, zIndex : 1}}
                            showStyle={{marginTop : 854}}
                            existAnimateStyle={{marginTop : 20}}
                            existAnimateName={'linear'}
                            existAnimateDuration={1200}
                            showAnimateName={'easeOutBack'}
                            showDuration={1200}
                            showOffsetTime={1000}
                            status={this.state.button20172}
                        >
                            <img className={'show-img'} src={getSrc('Know/20172/button.png')} onClick={() => location.href='http://jobs.tap4fun.com/wechat/?code=2'} />
                        </Show>
                    </div>

                    {/*箭头*/}
                    <Show
                        className={'arrow'}
                        hideStyle={{width : 71, height : 49, marginLeft : 339.5, bottom : 30, opacity : 0, zIndex : 101}}
                        showStyle={{opacity : 1}}
                        showDuration={500}
                        hideDuration={500}
                        existAnimateScale={0.1}
                        existAnimateStyle={{bottom : 10}}
                        existAnimateDuration={800}
                        status={this.state.page == 10 ? 'hide' : 'show'}
                    >
                        <img className={'show-img'} src={getSrc('Know/arrow.png')} />
                    </Show>
                </ScrollPage>
            </ImageLoading>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.index,
    publicReducer : state.wechatLoginLayout
})

const mapDispatchToProps = {

}

export default store => ({
    path: 'know',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'know', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Know));
        })
    }
})
