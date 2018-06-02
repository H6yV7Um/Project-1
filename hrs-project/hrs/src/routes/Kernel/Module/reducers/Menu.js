export const moduleSaveMenu = (state, action) => {
    const data = [...state.data]

    for (let i = 0; i < data.length; i++) {
        if (data[i].key == action.moduleid) {
            let isnew = true
            let newline = 0

            for (let u = 0; u < data[i].menus.length; u++) {
                if (action.id == data[i].menus[u].id) {
                    isnew = false
                    data[i].menus[u].name = action.name
                    data[i].menus[u].icon = action.icon
                    break
                }
                if (!data[i].menus[u].id) {
                    newline = u
                }
            }
            if (!data[i].menus[newline].id & isnew) {
                data[i].menus[newline].key += action.id
                data[i].menus[newline].id = action.id
                data[i].menus[newline].name = action.name
                data[i].menus[newline].icon = action.icon
                data[i].menus[newline].children = [
                    {
                        "editable": false,
                        "key": `${action.id}_sub`,
                        "name": "",
                        "icon": "",
                        "url": "",
                        "parentid": action.id,
                        "permission": "0",
                        "id": ""
                    }
                ]
                const newmenu =
                    {
                        "editable": false,
                        "key": `${action.moduleid}_`,
                        "name": "",
                        "icon": "",
                        "id": ""
                    }

                data[i].menus.push(newmenu)
                break
            }
        }
    }

    return {
        ...state,
        data,
        "save_new_menu_loading": false,
        "save_menu_loading": false
    }
}

export const moduleSaveChildMenu = (state, action) => {
    const data = [...state.data]

    for (let i = 0; i < data.length; i++) {
        if (data[i].key == action.moduleid) {
            for (let u = 0; u < data[i].menus.length; u++) {
                if (data[i].menus[u].id == action.parentid) {
                    let isnew = true
                    let newline = 0

                    for (let p = 0; p < data[i].menus[u].children.length; p++) {
                        if (data[i].menus[u].children[p].id == action.id) {
                            isnew = false
                            data[i].menus[u].children[p].name = action.name
                            data[i].menus[u].children[p].icon = action.icon
                            data[i].menus[u].children[p].url = action.url
                            data[i].menus[u].children[p].permission = action.permission
                            break
                        }
                        if (!data[i].menus[u].children[p].id) {
                            newline = p
                        }
                    }
                    if (!data[i].menus[u].children[newline].id & isnew) {
                        data[i].menus[u].children[newline].key += `_${action.id}`
                        data[i].menus[u].children[newline].id = action.id
                        data[i].menus[u].children[newline].name = action.name
                        data[i].menus[u].children[newline].icon = action.icon
                        data[i].menus[u].children[newline].url = action.url
                        data[i].menus[u].children[newline].permission = action.permission
                        const newchildmenu =
                            {
                                "editable": false,
                                "key": `${action.parentid}_sub`,
                                "name": "",
                                "icon": "",
                                "url": "",
                                "permission": "0",
                                "parentid": data[i].menus[u].children[newline].parentid,
                                "id": ""
                            }

                        data[i].menus[u].children.push(newchildmenu)
                        break
                    }
                }
            }
        }
    }

    return {
        ...state,
        data,
        "save_child_loading": false,
        "save_new_child_loading": false
    }
}