/**
 * 新增子列表项
 * @param type      父列表类型
 * @param id        父列表ID
 * @param items     当前列表数组
 * @param item      子列表
 * @returns {*}
 */
export const treeListAdd = (type, id, items, item) => {
    const run = (obj) => {
        let newItems = []
        obj.map((v,k) => {
            let newItem = v
            if(v.items)
            {
                newItem.items = run(v.items)
            }
            // console.log(`${newItem.type}  ${type}  ${newItem.id}  ${id}`)
            if(newItem.type == type && newItem.id == id)
            {
                if(newItem.items === undefined)
                {
                    newItem.items = []
                }
                newItem.items.push(item)
            }
            newItems.push(newItem)
        })
        return newItems
    }
    return run(items)
}

/**
 * 编辑子列表项
 * @param type      列表类型
 * @param id        列表ID
 * @param items     当前列表数组
 * @param item      新列表
 * @returns {*}
 */
export const treeListEdit = (type, id, items, item) => {
    const run = (obj) => {
        let newItems = []
        obj.map((v,k) => {
            let newItem = v
            if(v.items)
            {
                newItem.items = run(v.items)
            }
            // console.log(`${newItem.type}  ${type}  ${newItem.id}  ${id}`)
            if(newItem.type == type && newItem.id == id)
            {
                newItem = {...newItem, ...item}
            }
            newItems.push(newItem)
        })
        return newItems
    }
    return run(items)
}

/**
 * 删除子列表项
 * @param type      列表类型
 * @param id        列表ID
 * @param items     当前列表数组
 * @returns {*}
 */
export const treeListDelete = (type, id, items) => {
    const run = (obj) => {
        let newItems = []
        obj.map((v,k) => {
            if(v.type == type && v.id == id)
            {
                return true
            }

            let newItem = v
            if(v.items)
            {
                newItem.items = run(v.items)
            }

            newItems.push(newItem)
        })
        return newItems
    }
    return run(items)
}

/**
 * 清空子列表项
 * @param type      列表类型
 * @param id        列表ID
 * @param items     当前列表数组
 * @returns {*}
 */
export const treeListClear = (type, id, items) => {
    const run = (obj) => {
        let newItems = []
        obj.map((v,k) => {
            let newItem = v
            if(v.items)
            {
                newItem.items = run(v.items)
            }
            if(newItem.type == type && newItem.id == id)
            {
                newItem.items = []
            }
            newItems.push(newItem)
        })
        return newItems
    }
    return run(items)
}
