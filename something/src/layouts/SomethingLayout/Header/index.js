import React, {Component} from 'react';
import './style.scss';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static propTypes =
    {
        // 标题
        title           :   React.PropTypes.string,
        // 左侧导航按钮
        leftButton      :   React.PropTypes.object,
        // 右侧导航按钮
        rightButton     :   React.PropTypes.object
    }

    componentWillMount() {
        this.setHeaderInfo(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setHeaderInfo(nextProps);
    }

    /**
     * 设置头部信息
     */
    setHeaderInfo = props => {
        // 标题
        dd.biz.navigation.setTitle({
            title : props.title || 'SOMETHING'
        });

        // 左侧导航按钮
        if(props.leftButton)
        {
            dd.biz.navigation.setLeft(props.leftButton);
        }
        else
        {
            dd.biz.navigation.setLeft({
                // 控制按钮显示
                show: true,
                // 是否控制点击事件
                control: false,
                // 控制显示文本，空字符串表示显示默认文本
                text: '',
                // 是否显示图标
                showIcon: false
            });
        }

        // 右侧导航按钮
        if(props.rightButton)
        {
            dd.biz.navigation.setRight(props.rightButton);
        }
        else
        {
            dd.biz.navigation.setRight({
                show: false
            });
        }
    }

    render() {
        return(
            <div className="IndexLayout-Header">

            </div>
        )
    }
}