import React, {Component, PropTypes} from 'react'

import './ItemStyle.scss'

class TreeListItem extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isShow : false
        };
    }

    componentDidMount() {
        // 默认显示下一级
        if(this.props.isDefaultShow != undefined)
        {
            this.setState({isShow : this.props.isDefaultShow})
        }
    }

    onChangeShow = () => {
        if(this.state.isShow)
        {
            this.props.onHide(this.props.type, this.props.id, this.props.data)
        }
        else
        {
            // 子列表为空时响应获取子列表事件
            if(this.props.items === undefined || this.props.items.length == 0)
            {
                this.props.onGet(this.props.type, this.props.id, this.props.data)
            }

            this.props.onShow(this.props.type, this.props.id, this.props.data)
        }
        this.setState({isShow : !this.state.isShow})
    }

    static propTypes =
    {
        // 列表名
        name            : React.PropTypes.string.isRequired,
        // 列表数据(将用于你操作)
        data            : React.PropTypes.object,
        // 列表类名(你将依赖此类做操作)
        type            : React.PropTypes.string,
        // 列表ID(你可认知的唯一标示,便于你操作,建议为数据表主键ID;顶级列表是唯一的,因此一般可为空)
        id              : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        // 是否可添加下一级(默认为:true)
        isAdd           : React.PropTypes.bool,
        // 是否可编辑(默认为:true)
        isEdit          : React.PropTypes.bool,
        // 是否可删除(默认为:true)
        isDelete        : React.PropTypes.bool,
        // 是否有其他操作(默认为:false)
        isSet           : React.PropTypes.bool,

        // 子列表名
        itemsName       : React.PropTypes.string,
        // 子列表数组
        items           : React.PropTypes.array,
        // 是否初始显示子列表
        isDefaultShow   : React.PropTypes.bool
    }

    render()
    {
        let addButton = null
        if(this.props.isAdd)
        {
            const addIcon = this.props.addIcon || <span className="x-treeList-children-add-icon"></span>
            addButton = <div className="x-treeList-children-add" onClick={()=>{this.props.onAdd(this.props.type, this.props.id, this.props.data)}}>{addIcon}</div>
        }

        let editButton = null
        if(this.props.isEdit)
        {
            const editIcon = this.props.editIcon || <span className="x-treeList-item-edit-icon"></span>
            editButton = <div className="x-treeList-item-edit" onClick={()=>{this.props.onEdit(this.props.type, this.props.id, this.props.data)}}>{editIcon}</div>
        }

        let deleteButton = null
        if(this.props.isDelete)
        {
            const deleteIcon = this.props.deleteIcon || <span className="x-treeList-item-delete-icon"></span>
            deleteButton = <div className="x-treeList-item-delete" onClick={()=>{this.props.onDelete(this.props.type, this.props.id, this.props.data)}}>{deleteIcon}</div>
        }

        let setButton = null
        if(this.props.isSet)
        {
            const setIcon = this.props.setIcon || <span className="x-treeList-item-set-icon"></span>
            setButton = <div className="x-treeList-item-set" onClick={()=>{this.props.onSet(this.props.type, this.props.id, this.props.data)}}>{setIcon}</div>
        }

        let refreshButton = null
        if(this.props.children || this.props.isAdd)
        {
            const refreshIcon = this.props.refreshIcon || <span className="x-treeList-children-refresh-icon"></span>
            refreshButton = <div className="x-treeList-children-refresh" onClick={()=>{this.props.onRefresh(this.props.type, this.props.id, this.props.data)}}>{refreshIcon}</div>
        }

        let showButton = null
        if(this.props.children || this.props.isAdd)
        {
            const showIcon = this.props.showIcon || <span className="x-treeList-children-show-icon">+</span>
            showButton =
            <div className="x-treeList-children-show" onClick={this.onChangeShow} style={{display: (this.state.isShow ? 'none' : 'block')}}>
                {showIcon}
            </div>
        }

        let hideButton = null
        if(this.props.children || this.props.isAdd)
        {
            const hideIcon = this.props.hideIcon || <span className="x-treeList-children-hide-icon">+</span>
            hideButton =
            <div className="x-treeList-children-hide" onClick={this.onChangeShow} style={{display: (this.state.isShow ? 'block' : 'none')}}>
                {hideIcon}
            </div>
        }

        let children = null
        if(this.props.children || this.props.isAdd)
        {
            children =
            <div className="x-treeList-children-border">
                <div className="x-treeList-children-line2"></div>
                {showButton}
                {hideButton}
                <div className="x-treeList-children-main" style={{display: (this.state.isShow ? 'block' : 'none')}}>
                    <div className="x-treeList-children-action-border">
                        <div className="x-treeList-children-name">
                            {this.props.itemsName}
                        </div>
                        <div className="x-treeList-children-action">
                            {addButton}
                            {refreshButton}
                        </div>
                    </div>
                    <div className="x-treeList-children" style={{borderWidth: (this.props.isChild ? 0 : 1)}}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        }

        return(
            <div className="x-treeList-item-border" style={{borderWidth: (this.props.isOnly ? 0 : 1)}}>
                <div className="x-treeList-children-line1" style={{display: (this.props.isOnly ? 'none' : 'block')}}></div>
                <div className="x-treeList-item">
                    <div className="x-treeList-item-name">{this.props.name}</div>
                    {editButton}
                    {deleteButton}
                    {setButton}
                </div>
                {children}
            </div>
        )
    }
}

export default TreeListItem
