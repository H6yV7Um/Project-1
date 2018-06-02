import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './style.scss';

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.width = $(window).width() - 100 > 500 ? 500 : $(window).width() - 100;
    }

    render() {
        let className = 'layoutEhrSelect';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        return (
            <div className={componentClassName} style={{width : this.width, minHeight : $(window).height()}}>
                {this.props.children}
            </div>
        );
    }
}

export default Select;