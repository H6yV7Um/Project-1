import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {injectReducer} from 'store/reducers';
import Show from 'components/Show';
import ScrollPage from 'components/ScrollPage';
import ImageLoading from 'components/ImageLoading';
import {getLocation} from 'utils/location';
import getSrc from 'utils/imgSrc';

import {} from './action';

import './style.scss';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 显示状态...
            activityHouse           :   'show',
            activityShadow          :   'show',
            activityChair           :   'wait',
            activityTitle           :   'wait',
            activityMsg             :   'wait',
            webHouse                :   'show',
            webShadow               :   'show',
            webGame                 :   'wait',
            webTitle                :   'wait',
            webMsg                  :   'wait',
            learnHouse              :   'show',
            learnShadow             :   'show',
            learnGrassLeft          :   'wait',
            learnGrassLeftShadow    :   'wait',
            learnGrassRight         :   'wait',
            learnGrassRightShadow   :   'wait',
            learnTitle              :   'wait',
            learnMsg                :   'wait',
            knowHouse               :   'show',
            knowShadow              :   'show',
            knowTreeLeft            :   'wait',
            knowTreeLeftShadow      :   'wait',
            knowTreeRight           :   'wait',
            knowTreeRightShadow     :   'wait',
            knowTitle               :   'wait',
            knowMsg                 :   'wait',
            visitHouse              :   'show',
            visitShadow             :   'show',
            visitBike               :   'wait',
            visitTitle              :   'wait',
            visitMsg                :   'wait'
        };
        // 气泡显示时间
        this.msgTime = 2000;
    }

    render() {

        return(
            <div>
                <ImageLoading
                    images={[
                        'Index/bg.png', 'Index/activity_house.png', 'Index/activity_shadow.png', 'Index/activity_title.png', 'Index/activity_chair.png', 'Index/know_house.png',
                        'Index/know_shadow.png', 'Index/know_title.png', 'Index/know_tree1.png', 'Index/know_tree2.png', 'Index/learn_grass1.png', 'Index/learn_grass2.png',
                        'Index/learn_house.png', 'Index/learn_shadow.png', 'Index/learn_title.png', 'Index/visit_bike.png', 'Index/visit_house.png', 'Index/visit_shadow.png',
                        'Index/visit_title.png', 'Index/web_game.png', 'Index/web_house.png', 'Index/web_shadow.png', 'Index/web_title.png', 'Index/learn_grass1_shadow.png',
                        'Index/learn_grass2_shadow.png', 'Index/know_tree1_shadow.png', 'Index/know_tree2_shadow.png', 'Index/activity_msg.png', 'Index/know_msg.png',
                        'Index/learn_msg.png', 'Index/visit_msg.png', 'Index/web_msg.png'
                    ]}
                >
                    <ScrollPage
                        page={1}
                        sumPage={1}
                    >
                        <div className="Index" style={{height : document.body.clientHeight}}>
                            {/*背景*/}
                            <img className="bg" src={getSrc('Index/bg.png')} />

                            {/*小尼活动 - 房子*/}
                            <Show
                                className={'activity-house'}
                                hideStyle={{width : 169, height : 196, marginLeft : 150, marginTop : -196, zIndex : 3}}
                                showStyle={{marginTop : 135}}
                                showAnimateName={'easeOutBounce'}
                                showDuration={1000}
                                onEnd={status => this.setState({activityChair : status, activityTitle : status})}
                                status={this.state.activityHouse}
                            >
                                <img className="show-img" src={getSrc('Index/activity_house.png')} onClick={() => {location.href='http://mp.weixin.qq.com/s/RJFaDgXUZP2qCHQ9UiyLjw'}} />
                            </Show>
                            {/*小尼活动 - 房子影子*/}
                            <Show
                                className={'activity-shadow'}
                                hideStyle={{width : 182, height : 46, marginLeft : 145, marginTop : 298, zIndex : 1}}
                                hideScale={'auto'}
                                showScale={1}
                                showAnimateName={'easeOutBounce'}
                                showDuration={1000}
                                status={this.state.activityShadow}
                            >
                                <img className="show-img" src={getSrc('Index/activity_shadow.png')} />
                            </Show>
                            {/*小尼活动 - 椅子*/}
                            <Show
                                className={'activity-chair'}
                                hideStyle={{width : 117, height : 114, marginLeft : 200, marginTop : 215, zIndex : 2}}
                                showStyle={{marginLeft : 275}}
                                showAnimateName={'easeOutQuart'}
                                showDuration={700}
                                status={this.state.activityChair}
                            >
                                <img className="show-img" src={getSrc('Index/activity_chair.png')} />
                            </Show>
                            {/*小尼活动 - 标题*/}
                            <Show
                                className={'activity-title'}
                                hideStyle={{width : 135, height : 40, marginLeft : 176, marginTop : 216, zIndex : 4}}
                                hideScale={0.5}
                                showScale={1}
                                showAnimateName={'easeInOutBounce'}
                                showDuration={2500}
                                existAnimateStyle={{marginTop : 10}}
                                existAnimateName={'linear'}
                                existAnimateDuration={1500}
                                status={this.state.activityTitle}
                            >
                                <img className="show-img" src={getSrc('Index/activity_title.png')} onClick={() => {location.href='http://mp.weixin.qq.com/s/RJFaDgXUZP2qCHQ9UiyLjw'}} />
                            </Show>
                            {/*小尼活动 - 文字*/}
                            <Show
                                className={'activity-msg'}
                                hideStyle={{width : 290, height : 123, marginLeft : 92, marginTop : 70, zIndex : 5}}
                                showStyle={{marginLeft : 35, marginTop : 15}}
                                hideScale={0.1}
                                showScale={1}
                                showAnimateName={'easeOutElastic'}
                                hideAnimateName={'easeInQuart'}
                                showDuration={1500}
                                hideDuration={800}
                                status={this.state.activityMsg}
                                onEnd={status => {
                                    if(status == 'show')
                                    {
                                        setTimeout(() => {
                                            this.setState({activityMsg : 'hide', webMsg : 'show'});
                                        }, this.msgTime);
                                    }
                                }}
                            >
                                <img className="show-img" src={getSrc('Index/activity_msg.png')} />
                            </Show>

                            {/*官网链接 - 房子*/}
                            <Show
                                className={'web-house'}
                                hideStyle={{width : 271, height : 214, marginLeft : 476, marginTop : -214, zIndex : 13}}
                                showStyle={{marginTop : 282}}
                                showAnimateName={'easeOutBounce'}
                                showDuration={1200}
                                status={this.state.webHouse}
                                onEnd={status => this.setState({webGame : status, webTitle : status})}
                            >
                                <img className="show-img" src={getSrc('Index/web_house.png')} onClick={() => {location.href = 'http://www.tap4fun.com'}} />
                            </Show>
                            {/*官网链接 - 房子影子*/}
                            <Show
                                className={'web-shadow'}
                                hideStyle={{width : 233, height : 36, marginLeft : 484, marginTop : 466, zIndex : 11}}
                                hideScale={'auto'}
                                showScale={1}
                                showAnimateName={'easeOutBounce'}
                                showDuration={1200}
                                status={this.state.webShadow}
                            >
                                <img className="show-img" src={getSrc('Index/web_shadow.png')} />
                            </Show>
                            {/*官网链接 - 游戏机*/}
                            <Show
                                className={'web-game'}
                                hideStyle={{width : 98, height : 128, marginLeft : 493, marginTop : 370, zIndex : 12}}
                                showStyle={{marginLeft : 402}}
                                showAnimateName={'easeOutQuart'}
                                showOffsetTime={1000}
                                showDuration={900}
                                status={this.state.webGame}
                            >
                                <img className="show-img" src={getSrc('Index/web_game.png')} />
                            </Show>
                            {/*官网链接 - 标题*/}
                            <Show
                                className={'web-title'}
                                hideStyle={{width : 155, height : 45, marginLeft : 506, marginTop : 376, zIndex : 14}}
                                hideScale={0.5}
                                showScale={1}
                                showAnimateName={'easeInOutBounce'}
                                showOffsetTime={600}
                                showDuration={2500}
                                existAnimateStyle={{marginTop : 10}}
                                existAnimateName={'linear'}
                                existAnimateDuration={1500}
                                status={this.state.webTitle}
                            >
                                <img className="show-img" src={getSrc('Index/web_title.png')} onClick={() => {location.href = 'http://www.tap4fun.com'}} />
                            </Show>
                            {/*官网链接 - 文字*/}
                            <Show
                                className={'web-msg'}
                                hideStyle={{width : 290, height : 117, marginLeft : 424, marginTop : 230, zIndex : 15}}
                                showStyle={{marginLeft : 430, marginTop : 174}}
                                hideScale={0.1}
                                showScale={1}
                                showAnimateName={'easeOutElastic'}
                                hideAnimateName={'easeInQuart'}
                                showDuration={1500}
                                hideDuration={800}
                                status={this.state.webMsg}
                                onEnd={status => {
                                    if(status == 'show')
                                    {
                                        setTimeout(() => {
                                            this.setState({webMsg : 'hide', knowMsg : 'show'});
                                        }, this.msgTime);
                                    }
                                }}
                            >
                                <img className="show-img" src={getSrc('Index/web_msg.png')} />
                            </Show>

                            {/*学习成长 - 房子*/}
                            <Show
                                className={'learn-house'}
                                hideStyle={{width : 202, height : 231, marginLeft : 23, marginTop : -231, zIndex : 24}}
                                showStyle={{marginTop : 312}}
                                showAnimateName={'easeOutBounce'}
                                showOffsetTime={300}
                                showDuration={1200}
                                status={this.state.learnHouse}
                                onEnd={status => this.setState({learnGrassLeft : status, learnGrassLeftShadow : status, learnGrassRight : status, learnGrassRightShadow : status, learnTitle : status})}
                            >
                                <img className="show-img" src={getSrc('Index/learn_house.png')} onClick={() => this.props.router.push('/recruit/base/learn')} />
                            </Show>
                            {/*学习成长 - 房子影子*/}
                            <Show
                                className={'learn-shadow'}
                                hideStyle={{width : 188, height : 42, marginLeft : 30, marginTop : 509, zIndex : 22}}
                                hideScale={'auto'}
                                showScale={1}
                                showAnimateName={'easeOutBounce'}
                                showOffsetTime={300}
                                showDuration={1200}
                                status={this.state.learnShadow}
                            >
                                <img className="show-img" src={getSrc('Index/learn_shadow.png')} />
                            </Show>
                            {/*学习成长 - 草左*/}
                            <Show
                                className={'show-img-border learn-grass-left-border'}
                                hideStyle={{width : 170, height : 88, marginLeft : -76, marginTop : 455, zIndex : 26}}
                            >
                                <Show
                                    className={'learn-grass-left'}
                                    hideStyle={{width : 170, height : 88, marginLeft : 0, marginTop : 88, zIndex : 1}}
                                    showStyle={{marginTop : 0}}
                                    showAnimateName={'easeOutQuart'}
                                    showDuration={800}
                                    status={this.state.learnGrassLeft}
                                >
                                    <img className="show-img" src={getSrc('Index/learn_grass1.png')} />
                                </Show>
                            </Show>
                            {/*学习成长 - 草左影子*/}
                            <Show
                                className={'show-img-border learn-grass-left-shadow'}
                                hideStyle={{width : 164, height : 18, marginLeft : -76, marginTop : 536, zIndex : 25}}
                                hideScale={'auto'}
                                showScale={1}
                                showAnimateName={'easeOutCubic'}
                                showDuration={300}
                                status={this.state.learnGrassLeftShadow}
                            >
                                <img className="show-img" src={getSrc('Index/learn_grass1_shadow.png')} />
                            </Show>
                            {/*学习成长 - 草右*/}
                            <Show
                                className={'show-img-border learn-grass-right-border'}
                                hideStyle={{width : 150, height : 75, marginLeft : 160, marginTop : 460, zIndex : 23}}
                            >
                                <Show
                                    className={'learn-grass-right'}
                                    hideStyle={{width : 150, height : 75, marginLeft : 0, marginTop : 75, zIndex : 1}}
                                    showStyle={{marginTop : 0}}
                                    width={150}
                                    height={75}
                                    showAnimateName={'easeOutQuart'}
                                    showDuration={800}
                                    status={this.state.learnGrassRight}
                                >
                                    <img className="show-img" src={getSrc('Index/learn_grass2.png')} />
                                </Show>
                            </Show>
                            {/*学习成长 - 草右影子*/}
                            <Show
                                className={'show-img-border learn-grass-right-shadow'}
                                hideStyle={{width : 166, height : 36, marginLeft : 158, marginTop : 511, zIndex : 21}}
                                hideScale={'auto'}
                                showScale={1}
                                showAnimateName={'easeOutCubic'}
                                showDuration={400}
                                status={this.state.learnGrassRightShadow}
                            >
                                <img className="show-img" src={getSrc('Index/learn_grass2_shadow.png')} />
                            </Show>
                            {/*学习成长 - 标题*/}
                            <Show
                                className={'learn-title'}
                                hideStyle={{width : 147, height : 47, marginLeft : 68, marginTop : 407, zIndex : 25}}
                                hideScale={0.5}
                                showScale={1}
                                showAnimateName={'easeInOutBounce'}
                                showDuration={2500}
                                existAnimateStyle={{marginTop : 10}}
                                existAnimateName={'linear'}
                                existAnimateDuration={1500}
                                status={this.state.learnTitle}
                            >
                                <img className="show-img" src={getSrc('Index/learn_title.png')} onClick={() => this.props.router.push('/recruit/base/learn')} />
                            </Show>
                            {/*学习成长 - 文字*/}
                            <Show
                                className={'learn-msg'}
                                hideStyle={{width : 290, height : 116, marginLeft : 42, marginTop : 265, zIndex : 26}}
                                showStyle={{marginLeft : 68, marginTop : 210}}
                                hideScale={0.1}
                                showScale={1}
                                showAnimateName={'easeOutElastic'}
                                hideAnimateName={'easeInQuart'}
                                showDuration={1500}
                                hideDuration={800}
                                status={this.state.learnMsg}
                                onEnd={status => {
                                    if(status == 'show')
                                    {
                                        setTimeout(() => {
                                            this.setState({learnMsg : 'hide', activityMsg : 'show'});
                                        }, this.msgTime);
                                    }
                                }}
                            >
                                <img className="show-img" src={getSrc('Index/learn_msg.png')} />
                            </Show>

                            {/*了解小尼 - 房子*/}
                            <Show
                                className={'know-house'}
                                hideStyle={{width : 261, height : 320, marginLeft : 62, marginTop : -320, zIndex : 34}}
                                showStyle={{marginTop : 489}}
                                showAnimateName={'easeOutBounce'}
                                showDuration={900}
                                status={this.state.knowHouse}
                                onEnd={status => this.setState({knowTreeLeft : status, knowTreeLeftShadow : status, knowTreeRight : status, knowTreeRightShadow : status, knowTitle : status})}
                            >
                                <img className="show-img" src={getSrc('Index/know_house.png')} onClick={() => this.props.router.push('/recruit/base/know')} />
                            </Show>
                            {/*了解小尼 - 标题*/}
                            <Show
                                className={'know-title'}
                                hideStyle={{width : 160, height : 46, marginLeft : 129, marginTop : 614.5, zIndex : 35}}
                                hideScale={0.5}
                                showScale={1}
                                showAnimateName={'easeInOutBounce'}
                                showDuration={2500}
                                existAnimateStyle={{marginTop : 10}}
                                existAnimateName={'linear'}
                                existAnimateDuration={1500}
                                status={this.state.knowTitle}
                            >
                                <img className="show-img" src={getSrc('Index/know_title.png')} onClick={() => this.props.router.push('/recruit/base/know')} />
                            </Show>
                            {/*了解小尼 - 房子影子*/}
                            <Show
                                className={'know-shadow'}
                                hideStyle={{width : 281, height : 53, marginLeft : 53, marginTop : 770, zIndex : 33}}
                                hideScale={'auto'}
                                showScale={1}
                                showAnimateName={'easeOutBounce'}
                                showDuration={900}
                                status={this.state.knowShadow}
                            >
                                <img className="show-img" src={getSrc('Index/know_shadow.png')} />
                            </Show>
                            {/*了解小尼 - 树左*/}
                            <Show
                                className={'show-img-border know-tree-left-border'}
                                hideStyle={{width : 88, height : 107, marginLeft : -10, marginTop : 710, zIndex : 36}}
                            >
                                <Show
                                    className={'know-tree-left'}
                                    hideStyle={{width : 88, height : 107, marginLeft : 0, marginTop : 107, zIndex : 36}}
                                    showStyle={{marginTop : 0}}
                                    showAnimateName={'easeOutQuart'}
                                    showDuration={800}
                                    status={this.state.knowTreeLeft}
                                >
                                    <img className="show-img" src={getSrc('Index/know_tree1.png')} />
                                </Show>
                            </Show>
                            {/*了解小尼 - 树左影子*/}
                            <Show
                                className={'show-img-border know-tree-left-shadow'}
                                hideStyle={{width : 79, height : 22, marginLeft : -5, marginTop : 797, zIndex : 35}}
                                hideScale={'auto'}
                                showScale={1}
                                showAnimateName={'easeOutQuart'}
                                showDuration={700}
                                status={this.state.knowTreeLeftShadow}
                            >
                                <img className="show-img" src={getSrc('Index/know_tree1_shadow.png')} />
                            </Show>
                            {/*了解小尼 - 树右*/}
                            <Show
                                className={'show-img-border know-tree-right-border'}
                                hideStyle={{width : 56, height : 98, marginLeft : 310, marginTop : 700, zIndex : 32}}
                            >
                                <Show
                                    className={'know-tree-right'}
                                    hideStyle={{width : 56, height : 98, marginLeft : 0, marginTop : 98, zIndex : 1}}
                                    showStyle={{marginTop : 0}}
                                    showAnimateName={'easeOutQuart'}
                                    showDuration={800}
                                    status={this.state.knowTreeRight}
                                >
                                    <img className="show-img" src={getSrc('Index/know_tree2.png')} />
                                </Show>
                            </Show>
                            {/*了解小尼 - 树右影子*/}
                            <Show
                                className={'show-img-border know-tree-right-shadow'}
                                hideStyle={{width : 39, height : 17, marginLeft : 320, marginTop : 785, zIndex : 31}}
                                hideScale={'auto'}
                                showScale={1}
                                showAnimateName={'easeOutQuart'}
                                showDuration={800}
                                status={this.state.knowTreeRightShadow}
                            >
                                <img className="show-img" src={getSrc('Index/know_tree2_shadow.png')} />
                            </Show>
                            {/*了解小尼 - 文字*/}
                            <Show
                                className={'know-msg'}
                                hideStyle={{width : 290, height : 122, marginLeft : 57, marginTop : 435, zIndex : 36}}
                                showStyle={{marginLeft : 50, marginTop : 381}}
                                hideScale={0.1}
                                showScale={1}
                                showAnimateName={'easeOutElastic'}
                                hideAnimateName={'easeInQuart'}
                                showDuration={1500}
                                hideDuration={800}
                                status={this.state.knowMsg}
                                onEnd={status => {
                                    if(status == 'show')
                                    {
                                        setTimeout(() => {
                                            this.setState({knowMsg : 'hide', visitMsg : 'show'});
                                        }, this.msgTime);
                                    }
                                }}
                            >
                                <img className="show-img" src={getSrc('Index/know_msg.png')} />
                            </Show>

                            {/*参观小尼 - 房子*/}
                            <Show
                                className={'visit-house'}
                                hideStyle={{width : 368, height : 277, marginLeft : 382, marginTop : -277, zIndex : 42}}
                                showStyle={{marginTop : 701}}
                                showAnimateName={'easeOutBounce'}
                                showOffsetTime={500}
                                showDuration={1500}
                                status={this.state.visitHouse}
                                onEnd={status => this.setState({visitBike : status, visitTitle : status, knowMsg : status})}
                            >
                                <img className="show-img" src={getSrc('Index/visit_house.png')} onClick={() => this.props.router.push('/recruit/base/visit')} />
                            </Show>
                            {/*参观小尼 - 房子影子*/}
                            <Show
                                className={'visit-shadow'}
                                hideStyle={{width : 466, height : 87, marginLeft : 383, marginTop : 910, zIndex : 41}}
                                hideScale={'auto'}
                                showScale={1}
                                showAnimateName={'easeOutBounce'}
                                showOffsetTime={500}
                                showDuration={1500}
                                status={this.state.visitShadow}
                            >
                                <img className="show-img" src={getSrc('Index/visit_shadow.png')} />
                            </Show>
                            {/*参观小尼 - 自行车*/}
                            <Show
                                className={'visit-bike'}
                                hideStyle={{width : 139, height : 94, marginLeft : 'border', marginTop : 926, zIndex : 44}}
                                showStyle={{marginLeft : '430'}}
                                showAnimateName={'easeInOutQuint'}
                                showDuration={5000}
                                status={this.state.visitBike}
                            >
                                <img className="show-img" src={getSrc('Index/visit_bike.png')} />
                            </Show>
                            {/*参观小尼 - 标题*/}
                            <Show
                                className={'visit-title'}
                                hideStyle={{width : 52, height : 187, marginLeft : 666, marginTop : 745.5, zIndex : 43}}
                                hideScale={0.5}
                                showScale={1}
                                showAnimateName={'easeInOutBounce'}
                                showDuration={3000}
                                existAnimateStyle={{marginTop : 10}}
                                existAnimateName={'linear'}
                                existAnimateDuration={1500}
                                status={this.state.visitTitle}
                            >
                                <img className="show-img" src={getSrc('Index/visit_title.png')} onClick={() => this.props.router.push('/recruit/base/visit')} />
                            </Show>
                            {/*参观小尼 - 文字*/}
                            <Show
                                className={'visit-msg'}
                                hideStyle={{width : 290, height : 118, marginLeft : 423, marginTop : 635, zIndex : 44}}
                                showStyle={{marginLeft : 420, marginTop : 586}}
                                hideScale={0.1}
                                showScale={1}
                                showAnimateName={'easeOutElastic'}
                                hideAnimateName={'easeInQuart'}
                                showDuration={1500}
                                hideDuration={800}
                                status={this.state.visitMsg}
                                onEnd={status => {
                                    if(status == 'show')
                                    {
                                        setTimeout(() => {
                                            this.setState({visitMsg : 'hide', learnMsg : 'show'});
                                        }, this.msgTime);
                                    }
                                }}
                            >
                                <img className="show-img" src={getSrc('Index/visit_msg.png')} />
                            </Show>
                        </div>
                    </ScrollPage>
                </ImageLoading>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer : state.index,
    publicReducer : state.wechatLayout
})

const mapDispatchToProps = {

}

export default store => ({
    // path: 'index',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, {key : 'index', reducer : require('./reducer').default});
            cb(null, connect(mapStateToProps, mapDispatchToProps)(Index));
        })
    }
})
