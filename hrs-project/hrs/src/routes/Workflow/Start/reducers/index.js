import {ACTIONS} from '../actions/StartAction'
import {SERVER, UPLOAD_HTTP_HEADER} from 'config'
const initialState = {
    getSolutionLoading: false,
    solution:[],
    dataSource:[],
    oneSolution:{},
    fileData:{},
    fileListData:{},
    completeLoading:false,
    solution_id:''
}
/**
 * Reducer
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        /***********************************************/
        case ACTIONS.WORKFLOW_START_SOLUTION:
            return {
                ...state,
                "solution": action.solution,
                "dataSource": formatOne(action.solution),
                "getSolutionLoading": false
            }
        case ACTIONS.WORKFLOW_START_SOLUTION_LOADING:
            return {
                ...state,
                "getSolutionLoading": true
            }
        /***********************************************/
        case ACTIONS.START_GET_ONE_SOLUTION:
            return {
                ...state,
                "oneSolution": {...formatTwo(state.solution,action.id)},
                "solution_id": action.id
            }
        /************************************************/
        case ACTIONS.WORKFLOW_START_CHANGE_FILE_OF_MEMBER_DATA:
            let fileData
            if(!state.fileData)
            {
                fileData = {}
            }
            else {
                fileData = state.fileData
            }
            let data = changeFileList(fileData,state.fileListData,action.fileList,action.namespace)
            return {
                ...state,
                fileData: data.fileData,
                fileListData: data.fileListData
            }
        /***********************************************/
        case ACTIONS.WORKFLOW_STRAT_COMPLETE:
            return {
                ...state,
                "completeLoading":false
            }
        case ACTIONS.WORKFLOW_STRAT_COMPLETE_LOADING:
            return {
                ...state,
                "completeLoading":true
            }
    }
    return {...state}
}

const formatOne = (solution)=>{
    let dataSource = []
    for(let val of solution)
    {
        dataSource.push({
            key: val._id.$oid,
            name: val.name,
        })
    }
    return dataSource
}
const formatTwo  = (solution, id)=>{
    solution = [...solution]
    for(let val of solution)
    {
        if(val._id.$oid == id)
        {
            return val
        }
    }
}
const changeFileList = (fileData,fileListData,fileList,namespace) =>{
    let current = []
    let currentAll = []
    for(let val of fileList)
    {
        if(val.status)
        {
            if(val.status == 'done')
            {
                current.push(val.response.data[0].$oid)
                let url = SERVER+"organization/file/download/"+val.response.data[0].$oid
                val.url = url
                val.uid = val.response.data[0].$oid
                val.name = val.name
                currentAll.push(val)
            }
            else
            {
               currentAll.push(val) 
            }
        }
        else
        {
            current.push(val.uid)
            currentAll.push(val)
        }
    }
    let name = namespace
    fileData[name] = current
    fileListData[name] = currentAll
    return {"fileData": fileData,"fileListData":fileListData}
}
export default reducer