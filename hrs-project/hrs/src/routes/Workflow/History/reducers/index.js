import {ACTIONS} from '../actions/HistoryAction'
import moment from 'moment'
const initialState = {
    dataSource:[],

    getOwnWorkflowLoading:false,

    solution:[],

    solutionDetails:[],

    name:'',

    fields:[],
    fieldsDetails:{},

    withdrawLoading:false,

    count:1,
    current:1,

    current_solution:[],
    onOKLoading:false,

    passLoading:false,
    rejectLoading: false,
    operation: []

}
/**
 * Reducer
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
    /***********************************************/
    case "WORKFLOW_HISTORY_GET_OWN_WORKFLOW":
        return {
            ...state,
            "solutionDetails": action.dataSource,
            "dataSource": formatOne(action.dataSource,action.status),
            "getOwnWorkflowLoading": false,
            "count": action.count,
            "current": action.current
        }
    case "WORKFLOW_HISTORY_GET_OWN_WORKFLOW_LOADING":
        return {
            ...state,
            "getOwnWorkflowLoading": true,

        }
    /***********************************************/
    case "WORKFLOW_HISTORY_SHOW_DETAILS":
        return {
            ...state,
            'name': action.name,
            "fieldsDetails": formatTwo(state.solutionDetails,action.key).fieldsDetails,
            "fields": formatTwo(state.solutionDetails,action.key).fields,
            "current_solution": formatTwo(state.solutionDetails,action.key).current_solution
        }

    /***********************************************/
    case "WORKFLOW_HISTORY_WITHDRAW_LOADING":
        return {
            ...state,
            "withdrawLoading": true
        }
    case "WORKFLOW_HISTORY_WITHDRAW":
        return {
            ...state,
            "withdrawLoading": false,
            "dataSource": [...formatThree(state.dataSource,action.key)],

        }
    /***********************************************/
    case "WORKFLOW_HISTORY_ONOK":
        return {
            ...state,
            onOKLoading: false,
            operation: [...formatFour(action.operation_log,action.length)]
        }
    case "WORKFLOW_HISTORY_ONOK_LOADING":
        return {
            ...state,
            onOKLoading: true
        }
    /***********************************************/
    case "WORKFLOW_HISTORY_PASS":
        return {
            ...state,
            passLoading: false
        }
    case "WORKFLOW_HISTORY_PASS_LOADING":
        return {
            ...state,
            passLoading: true
        }

    /***********************************************/
    case "WORKFLOW_HISTORY_REJECT":
        return {
            ...state,
            rejectLoading: false
        }
    case "WORKFLOW_HISTORY_REJECT_LOADING":
        return {
            ...state,
            rejectLoading: true
        }
    }
    return {...state}
}

const formatOne = (dataSource,status)=>{
    let current = []
    if(status == 0)
    {
        for(let val of dataSource)
        {
            current.push({
                key: val._id.$oid,
                solution_id: val.solution_id.$oid,
                name: val.solution_name,
                status: val.next_user.name,
                creation_time: moment(val.creation_time.$date).format('LLL')
            })
        }
    }
    else if(status == 1)
    {
        for(let val of dataSource)
        {
            current.push({
                key: val._id.$oid,
                solution_id: val.solution_id.$oid,
                name: val.solution_name,
                creator_user: val.creator_user.name,
                creation_time: moment(val.creation_time.$date).format('LLL'),
                end_time: moment(val.end_time.$date).format('LLL'),
            })
        }
    }
    else if(status == 2)
    {
        for(let val of dataSource)
        {
            current.push({
                key: val._id.$oid,
                solution_id: val.solution_id.$oid,
                name: val.solution_name,
                creation_time: moment(val.creation_time.$date).format('LLL'),
                end_time: moment(val.end_time.$date).format('LLL'),
            })
        }
    }   
    else if(status == 3)
    {
        for(let val of dataSource)
        {
            current.push({
                key: val._id.$oid,
                solution_id: val.solution_id.$oid,
                name: val.solution_name,
                status: val.next_user.name,
                creation_time: moment(val.creation_time.$date).format('LLL'),
                end_time: moment(val.end_time.$date).format('LLL'),
                creator_user: val.creator_user.name
            })
        }
    }
    return current
}
const formatTwo = (solutionDetails,key)=>{
    let current = {}
    for(let val of solutionDetails)
    {
        if(val._id.$oid == key)
        {
            let fieldsDetails = {...val.value}
            let fields = [...val.fields]
            current.fieldsDetails = {...fieldsDetails}
            current.fields = [...fields]
            current.current_solution = {...val}
            return current
        }
    }
}
const formatThree = (dataSource,key)=>{
    dataSource = [...dataSource]
    for(let i=0; i< dataSource.length;i++)
    {
        if(dataSource[i].key == key) 
        {
            dataSource.splice(i,1)
        } 
    }
    return dataSource
}
const formatFour = (operation_log,length)=>{
    let operation = operation_log.slice(length)
    return operation
}

export default reducer



