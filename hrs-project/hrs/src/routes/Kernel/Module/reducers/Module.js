export const moduleList = (state, action) => {
    const data = [...action.data]

    for (let i = 0; i < data.length; i++) {
        data[i].key = data[i]._id.$oid
        data[i].editable = false
        delete data[i]._id
        for (let u = 0; u < data[i].menus.length; u++) {
            data[i].menus[u].key = `${data[i].key}_${data[i].menus[u]._id.$oid}`
            data[i].menus[u].id = data[i].menus[u]._id.$oid
            data[i].menus[u].children = data[i].menus[u].sub
            data[i].menus[u].editable = false
            for (let p = 0; p < data[i].menus[u].sub.length; p++) {
                data[i].menus[u].sub[p].id = data[i].menus[u].sub[p]._id.$oid
                data[i].menus[u].sub[p].key = `${data[i].menus[u].key}_sub_${data[i].menus[u].sub[p]._id.$oid}`
                data[i].menus[u].sub[p].parentid = data[i].menus[u].id
                delete data[i].menus[u].sub[p]._id
            }
            const sub = {
                "editable": false,
                "key": `${data[i].menus[u].key}_sub`,
                "name": "",
                "icon": "",
                "url": "",
                "permission": "0",
                "id": "",
                "parentid": data[i].menus[u].id
            }

            data[i].menus[u].children.push(sub)
            delete data[i].menus[u]._id
            delete data[i].menus[u].moduleid
            delete data[i].menus[u].sub
        }
        const newmenu =
            {
                "editable": false,
                "key": `${data[i].key}_`,
                "id": "",
                "name": "",
                "icon": ""
            }

        data[i].menus.push(newmenu)
    }
    const newmodule = {
        "editable": false,
        "key": "",
        "name": "",
        "namespace": "",
        "version": "",
        "permission": "0"
    }

    data.push(newmodule)

    return {
        ...state,
        data,
        "list_error": "",
        "list_loading": false
    }
}
export const moduleSave = (state, action) => {
    const data = state.data

    for (let i = 0; i < data.length; i++) {
        if (data[i].key == action.key) {
            data[i].name = action.name
            data[i].namespace = action.namespace
            data[i].version = action.version
            data[i].permission = action.permission
            data[i].editable = false
            break
        }
    }

    return {
        ...state,
        data,
        "list_error": "",
        "list_loading": false,
        "save_error": '',
        "save_loading": false
    }
}

export const moduleSaveNew = (state, action) => {
    const data = state.data

    for (let i = 0; i < data.length; i++) {
        if (data[i].key == '') {
            data[i].key = action.key
            data[i].name = action.name
            data[i].namespace = action.namespace
            data[i].version = action.version
            data[i].permission = action.permission
            data[i].editable = false
            data[i].menus =
            [
                {
                    "editable": false,
                    "key": "",
                    "name": "",
                    "icon": ""
                }
            ]
            break
        }
    }
    const newmodule =
        {
            "editable": false,
            "key": "",
            "name": "",
            "namespace": "",
            "version": "",
            "permission": "0"
        }

    data.push(newmodule)

    return {
        ...state,
        data,
        "list_error": "",
        "list_loading": false,
        "save_error": '',
        "save_loading": false,
        "save_new_loading": false
    }
}
