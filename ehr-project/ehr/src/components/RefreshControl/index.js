import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'antd';
import { RefreshControl as AntdRefreshControl, ListView } from 'antd-mobile';
import {List} from 'antd-mobile';
import Rate from 'components/Rate';
import './style.scss';

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
let index = data.length - 1;

const NUM_ROWS = 20;
let pageIndex = 0;

class RefreshControl extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            height: document.documentElement.clientHeight,
        };
    }

    static propTypes =
    {

    }

    static defaultProps =
    {

    }

    componentWillUnmount() {
        this.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
        this.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
    }

    componentDidMount() {
        // Set the appropriate height
        setTimeout(() => this.setState({
            height: this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop,
        }), 0);

        // handle https://github.com/ant-design/ant-design-mobile/issues/1588
        this.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
            this.tsPageY = e.touches[0].pageY;
        });
        // In chrome61 `document.body.scrollTop` is invalid
        const scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
        this.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
            this.tmPageY = e.touches[0].pageY;
            if (this.tmPageY > this.tsPageY && this.scrollerTop <= 0 && scrollNode.scrollTop > 0) {
                console.log('start pull to refresh');
                this.domScroller.options.preventDefaultOnTouchMove = false;
            } else {
                this.domScroller.options.preventDefaultOnTouchMove = undefined;
            }
        });
    }


    genData = (pIndex = 0) => {
        const dataArr = [];
        for (let i = 0; i < NUM_ROWS; i++) {
            dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
        }
        return dataArr;
    }

    onScroll = (e) => {
        this.scrollerTop = e.scroller.getValues().top;
        this.domScroller = e;
    }

    onRefresh = () => {
        console.log('onRefresh');
        if (!this.manuallyRefresh) {
            this.setState({refreshing : true});
        } else {
            this.manuallyRefresh = false;
        }
        // simulate initial Ajax
        setTimeout(() => {
            this.rData = this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                showFinishTxt: true,
            });
            if (this.domScroller) {
                this.domScroller.scroller.options.animationDuration = 500;
            }
        }, 600);
    }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = [...this.rData, ...this.genData(++pageIndex)];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    }

    scrollingComplete = () => {
        // In general, this.scrollerTop should be 0 at the end, but it may be -0.000051 in chrome61.
        if (this.scrollerTop >= -1) {
            this.setState({ showFinishTxt: false });
        }
    }

    renderCustomIcon() {
        return [
            <div key="0" className="am-refresh-control-pull">
                <span>{this.state.showFinishTxt ? '刷新完毕' : '下拉可以刷新'}</span>
            </div>,
            <div key="1" className="am-refresh-control-release">
                <span>松开立即刷新</span>
            </div>,
        ];
    }

    render()
    {
        let className = 'component-RefreshControl';
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        let props = {...this.props};

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID}
                     style={{
                         padding: '0 0.3rem',
                         backgroundColor: 'white',
                     }}
                >
                    <div style={{ height: '1rem', lineHeight: '1rem', color: '#888', fontSize: '0.36rem', borderBottom: '1px solid #ddd' }}>
                        {obj.title}
                    </div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem' }}>
                        <img style={{ height: '1.26rem', width: '1.26rem', marginRight: '0.3rem' }} src={obj.img} alt="icon" />
                        <div style={{ display: 'inline-block' }}>
                            <div style={{ marginBottom: '0.16rem', color: '#000', fontSize: '0.32rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '5rem' }}>{obj.des}-{rowData}</div>
                            <div style={{ fontSize: '0.32rem' }}><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
                        </div>
                    </div>
                </div>
            );
        };

        return(
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>Pull to refresh</span>}
                renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderRow={row}
                renderSeparator={separator}
                initialListSize={5}
                pageSize={5}
                style={{
                    height: this.state.height,
                    border: '1px solid #ddd',
                    margin: '0.1rem 0',
                }}
                scrollerOptions={{ scrollbars: true, scrollingComplete: this.scrollingComplete }}
                refreshControl={<AntdRefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    icon={this.renderCustomIcon()}
                />}
                onScroll={this.onScroll}
                scrollRenderAheadDistance={200}
                scrollEventThrottle={20}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        )
    }
}

export default RefreshControl;
