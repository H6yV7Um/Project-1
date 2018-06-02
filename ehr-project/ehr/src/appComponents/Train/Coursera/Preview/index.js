import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal as MobileModal} from 'antd-mobile';
import {injectReducer} from 'store/reducers';
import './style.scss';
import {browserHistory} from 'react-router'
import browserAttr from 'utils/browserAttr';
import ImageShow from 'components/ImageShow';
let className = `coursera-preview`;
let ismobile = browserAttr.versions.mobile;
let isandroid = browserAttr.versions.android;
import {Modal } from 'antd';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.state={
            previewVisible: false
        }
    }
    static propTypes =
    {
        // 待预览图片的url
        previewImageUrl     : React.PropTypes.string,
        // 缩略图的宽
        imageWidth          : React.PropTypes.string,
        // 模态框中图片的宽
        modalImageWidth     : React.PropTypes.string,
        // 模态框的宽度
        modalWidth          : React.PropTypes.number,
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (e) => {
        this.setState({
            previewVisible: true,
        });
    }
    render() {
        let {previewImageUrl, imageWidth, modalImageWidth, modalWidth} = this.props

        {/*<MobileModal*/}
        {/*visible={this.state.previewVisible}*/}
        {/*transparent*/}
        {/*onClose={this.handleCancel}*/}
        {/*platform={isandroid ? 'android' : 'ios'}*/}
        {/*>*/}
        {/*<img*/}
        {/*style={{ width: '100%'}}*/}
        {/*src={`${previewImageUrl}`}*/}
        {/*/>*/}
        {/*</MobileModal>*/}

        // <ImageShow
        //     url={previewImageUrl}
        //     isShow={this.state.previewVisible}
        //     onClick={() => this.setState({previewVisible : false})}
        // />

        return  <div className={`${className}`}>
                    <img
                        className={`${className}-img`}
                        onClick={this.handlePreview}
                        style={{ width: imageWidth,height: imageWidth}}
                        src={`${previewImageUrl}`}
                    />

                    {(ismobile
                        ?
                    <MobileModal
                        visible={this.state.previewVisible}
                        transparent
                        onClose={this.handleCancel}
                        platform={isandroid ? 'android' : 'ios'}
                    >
                        <img
                            style={{ width: '100%'}}
                            src={`${previewImageUrl}`}
                        />
                    </MobileModal>
                        :
                        <Modal
                            visible={this.state.previewVisible}
                            footer={null}
                            onCancel={this.handleCancel}
                            width={modalWidth}
                        >
                            <img
                                style={{ width: modalImageWidth}}
                                src={`${previewImageUrl}`}
                            />
                        </Modal>
                    )}
                </div>

    }

}
const mapStateToProps = state => ({
})
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);