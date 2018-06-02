import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModularContainer from 'components/ModularContainer';
import DepartmentSelect from 'appComponents/Ehr/DepartmentSelect';
import UserSelect from 'appComponents/Ehr/UserSelect';
import SegmentedControl from 'components/SegmentedControl';
import Slider from 'components/Slider';

import CONFIG from 'config/app';

import './style.scss';

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        // 时段终止年
        this.endYear = new Date().getFullYear();
        // 时段节点描述
        this.marks = {};
        for(let year = CONFIG.PERFORMANCE_INITIATION_YEAR; year <= this.endYear; year++)
        {
            this.marks[year] = year;
        }
    }

    static propTypes =
    {
        // 分类 [1:成员, 2:部门]
        type                :   React.PropTypes.number,
        /**
         * 事件:改变分类后
         * @param type 分类
         */
        onChangeType        :   React.PropTypes.func,
        // 对象ID
        objIds              :   React.PropTypes.array,
        /**
         * 事件:选择对象后
         * @param objIds 对象ID
         */
        onChangeObj         :   React.PropTypes.func,
        // 时段 [起始年, 终止年] || -1:全部
        date                :   React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.array]),
        /**
         * 事件:选择时段后
         * @param date 时段
         */
        onChangeDate        :   React.PropTypes.func,
    }

    static defaultProps =
    {
        onChangeType        :   type => {},
        onChangeObj         :   objIds => {},
        onChangeDate        :   date => {}
    }

    render() {
        let className = 'appComponentsPerformanceSelect';
        let componentClassName = className;
        if(this.props.className)
        {
            componentClassName += ` ${this.props.className}`;
        }

        let department = null;
        let user = null;
        if(this.props.publicReducer.userInfo.leader_department_ids.length > 0)
        {
            switch (this.props.type)
            {
                // 成员
                case 1:
                    user =
                        <ModularContainer
                            className={`${className}-user`}
                            name={'成员'}
                        >
                            <UserSelect
                                value={this.props.objIds}
                                onChange={this.props.onChangeObj}
                            />
                        </ModularContainer>
                    break;
                // 部门
                case 2:
                    department =
                        <ModularContainer
                            className={`${className}-department`}
                            name={'部门'}
                        >
                            <DepartmentSelect
                                value={this.props.objIds}
                                onChange={this.props.onChangeObj}
                            />
                        </ModularContainer>
                    break;
            }
        }

        return(
            <div className={componentClassName}>
                {/*分类*/}
                <div className={`${className}-type`}>
                    <SegmentedControl
                        values={['成员', '部门']}
                        initIndex={this.props.type - 1}
                        color={'#4E394C'}
                        onChange={index => {
                            switch (index + 1)
                            {
                                // 成员
                                case 1:
                                    this.props.onChangeObj([this.props.publicReducer.userInfo.user_id]);
                                    break;
                                // 部门
                                case 2:
                                    {/*this.props.onChangeObj(Array.from(this.props.publicReducer.userInfo.leader_department_ids, id => id.toString()));*/}
                                    this.props.onChangeObj([this.props.publicReducer.userInfo.leader_department_ids[0].toString()]);
                                    break;
                            }
                            this.props.onChangeType(index + 1);
                        }}
                    />
                </div>
                {/*成员*/}
                {user}
                {/*部门*/}
                {department}
                {/*时段*/}
                <ModularContainer
                    className={`${className}-date`}
                    name={'时段'}
                >
                    <Slider
                        styleName={'deepPurple'}
                        dots={true}
                        tipFormatter={null}
                        min={CONFIG.PERFORMANCE_INITIATION_YEAR}
                        max={this.endYear}
                        marks={this.marks}
                        step={1}
                        range={true}
                        value={this.props.date == -1 ? [CONFIG.PERFORMANCE_INITIATION_YEAR, this.endYear] : this.props.date}
                        onChange={this.props.onChangeDate}
                    />
                </ModularContainer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    publicReducer : state.ddLayout
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Select);