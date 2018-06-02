import React, {Component, PropTypes} from 'react';
import Upload from 'components/Upload';
import Icon from 'components/Icon';
import 'jquery-easing';

import './style.scss';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static propTypes =
    {
        // 标题
        title               :   React.PropTypes.string,
        // 图标
        icon                :   React.PropTypes.element,
        // 录入url
        url                 :   React.PropTypes.string
    }

    render() {
        let className = `routeImportItem`;
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return(
            <div className={componentClassName} style={this.props.style}>
                <div className={`${className}-header`}>
                    <div className={`${className}-icon`}>{this.props.icon}</div>
                    <div className={`${className}-title`}>{this.props.title}</div>
                </div>
                <Upload
                    uploadUrl={this.props.url}
                    fileExt={['xlsx']}
                    labelName={'数据文件'}
                    isShowLabelName={false}
                    listSize={{width: 120, height: 120}}
                    isAddFileList={false}
                    uploadIcon={<Icon className={`${className}-upload-icon`} type="cloud-upload" />}
                />
            </div>
        )
    }
}

export default Item;
