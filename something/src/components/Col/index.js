import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Col as ColAntd} from 'antd';

import './style.scss';

class Col extends Component {
    static propTypes =
    {
        // 宽度
        width   : React.PropTypes.string
    }

    render()
    {
        let props = {...this.props};
        delete props.width;

        if(this.props.width)
        {
            props.style = {...this.props.style, width : this.props.width};
            props.span = 1;
        }

        let className = 'component-Col';
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        return(
            <ColAntd {...props} className={className}>
                {this.props.children}
            </ColAntd>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Col);