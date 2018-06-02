import React, {Component, PropTypes} from 'react'

import TreeListItem from './TreeListItem'

import './Style.scss'

class TreeList extends Component {
    static propTypes =
    {
        // 类名
        className   : React.PropTypes.string,
        // ID
        id          : React.PropTypes.string,
        // 子列表项数组
        items       : React.PropTypes.array,

        // 新增图标
        addIcon     : React.PropTypes.element,
        // 编辑图标
        editIcon    : React.PropTypes.element,
        // 删除图标
        deleteIcon  : React.PropTypes.element,
        // 其他操作图标
        setIcon     : React.PropTypes.element,
        // 刷新图标
        refreshIcon : React.PropTypes.element,
        // 显示下一级图标
        showIcon    : React.PropTypes.element,
        // 隐藏下一级图标
        hideIcon    : React.PropTypes.element,

        // 获取子列表(在显示子列表时当子列表为空时响应)
        onGet       : React.PropTypes.func,
        // 新增子列表项 (type, id ,data) => {}
        onAdd       : React.PropTypes.func,
        // 编辑列表项 (type, id ,data) => {}
        onEdit      : React.PropTypes.func,
        // 删除列表项 (type, id ,data) => {}
        onDelete    : React.PropTypes.func,
        // 其他操作 (type, id ,data) => {}
        onSet       : React.PropTypes.func,

        // 显示子列表项 (type, id ,data) => {}
        onShow      : React.PropTypes.func,
        // 隐藏子列表项 (type, id ,data) => {}
        onHide      : React.PropTypes.func,
        // 刷新子列表项 (type, id ,data) => {}
        onRefresh   : React.PropTypes.func
    }

    render()
    {
        // 树形列表
        let treeList = []

        //创建子列表
        const createItems = (children) => {
            let items = []

            children.map((v,k) =>
            {
                items.push(
                    <TreeListItem
                        key={k}
                        type={v.type}
                        id={v.id}
                        name={v.name}
                        data={v.data}
                        addIcon={this.props.addIcon}
                        editIcon={this.props.editIcon}
                        deleteIcon={this.props.deleteIcon}
                        setIcon={this.props.setIcon}
                        refreshIcon={this.props.refreshIcon}
                        showIcon={this.props.showIcon}
                        hideIcon={this.props.hideIcon}
                        onGet={this.props.onGet || (()=>{})}
                        onAdd={this.props.onAdd || (()=>{})}
                        onEdit={this.props.onEdit || (()=>{})}
                        onDelete={this.props.onDelete || (()=>{})}
                        onSet={this.props.onSet || (()=>{})}
                        onShow={this.props.onShow || (()=>{})}
                        onHide={this.props.onHide || (()=>{})}
                        onRefresh={this.props.onRefresh || (()=>{})}
                        isAdd={v.isAdd === undefined ? true : v.isAdd}
                        isEdit={v.isEdit === undefined ? true : v.isEdit}
                        isDelete={v.isDelete === undefined ? true : v.isDelete}
                        isSet={v.isSet === undefined ? false : v.isSet}
                        itemsName={v.itemsName}
                        items={v.items}
                        children={v.items ? createItems(v.items) : null}
                        isDefaultShow={v.isDefaultShow}
                        isOnly={children.length == 1}
                        isChild={v.items ? v.items.length == 1 ? true : false : false}
                    />
                )
            })
            return items
        }

        treeList.push(createItems(this.props.items))

        const className = this.props.className ? `${this.props.className} x-treeList-border` : 'x-treeList-border'
        return(
            <div className={className} id={this.props.id} style={this.props.style}>
                {treeList}
            </div>
        )
    }
}

export default TreeList
