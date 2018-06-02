const initialState =
    {
        "listLoading": false,
        "listError": '',
        "addLoading": false,
        "addError": '',
        "data": {},
        "newDepartment": {
            "name": "",
            "parentid": "",
            "create_dept_group": false
        },
        "currentDepartment": {},
        "status": "tree"
    }

/**
 * Reducer
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
    case "ORGANIZATION_LIST":
        return organizationGetList(state, action)
    case "ORGANIZATION_LIST_LOADING":
        return {
            ...state,
            "listLoading": true
        }
    case "ORGANIZATION_LIST_ERROR":
        return {
            ...state,
            "listError": action.message
        }
    case "ORGANIZATION_ADD_STATUS":
        return {
            ...state,
            "status": action.status
        }
    case "ORGANIZATION_ADD_PARENTID":
        return {
            ...state,
            "newDepartment": {
                "name": "",
                "parentid": action.parentID,
                "create_dept_group": false
            }
        }
    case "ORGANIZATION_ADD_UPDATE":
        return {
            ...state,
            "newDepartment": action.newDepartment
        }
    case "ORGANIZATION_LIST_LOADING":
        return {
            ...state,
            "listLoading": true
        }
    case "ORGANIZATION_ADD_ERROR":
        return {
            ...state,
            "addError": action.message
        }
    case "ORGANIZATION_ADD_LOADING":
        return {
            ...state,
            "addLoading": true
        }
    case "ORGANIZATION_ADD":
        return add(state, action)
    case "ORGANIZATION_UPDATE_CURRENT":
        return {
            ...state,
            "currentDepartment": action.currentDepartment
        }
    }


    return {...state}
}


const organizationGetList = (state, action) => {
    const data = {...action.data}

    return {
        ...state,
        data,
        "listError": '',
        "listLoading": false
    }
}
const add = (state, action) => {
    const data = {...state.data}
    const resultData = {...action.data}

    resultData.members = []
    resultData.children = []
    for (const department of data.organization) {
        if (department._id.$oid == resultData.parentid.$oid) {
            department.children.push(resultData)
            break
        } else if (department.children.length) {
            department.children = search(department.children, resultData)
        }
    }

    return {
        ...state,
        data,
        "addError": '',
        "addLoading": false,
        "status": 'tree'
    }
}
const search = (children, data) => {
    for (const department of children) {
        if (department._id.$oid == data.parentid.$oid) {
            department.children.push(data)
            break
        } else if (department.children.length) {
            department.children = search(department.children, data)
        }
    }

    return children
}

export default reducer