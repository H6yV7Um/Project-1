import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Picker as PickerAntd} from 'antd-mobile';

import './style.scss';

class Picker extends Component {
    static propTypes =
    {

    }

    render()
    {
        let props = {...this.props};
        let className = 'component-Picker';
        if(props.disabled || props.editable == false)
        {
            props.disabled = true;
            className += ' component-Picker-readonly';
        }
        if(this.props.className)
        {
            className += ` ${this.props.className}`;
        }

        return(
            <div className={className}>
                <PickerAntd
                    {...props}
                >
                    {this.props.children}
                </PickerAntd>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Picker);