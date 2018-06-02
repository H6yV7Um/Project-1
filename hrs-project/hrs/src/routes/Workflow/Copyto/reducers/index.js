import {ACTIONS} from '../actions/CopytoAction'
import moment from 'moment'
const initialState = {
    dataSource:[],

    getOwnCopytoWorkflowLoading:false,

    solutionDetails:[],

    name:'',

    fields:[],
    fieldsDetails:{},

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
    case "WORKFLOW_COPYTO_GET_OWN_COPYTO_WORKFLOW":
        return {
            ...state,
            "solutionDetails": action.dataSource,
            "dataSource": formatOne(action.dataSource),
            "getOwnCopytoWorkflowLoading": false,
            "count": action.count,
            "current": action.current
        }
    case "WORKFLOW_COPYTO_GET_OWN_COPYTO_WORKFLOW_LOADING":
        return {
            ...state,
            "getOwnCopytoWorkflowLoading": true,

        }
    /***********************************************/
    case "WORKFLOW_COPYTO_DETAILS":
        return {
            ...state,
            'name': action.name,
            "fieldsDetails": formatTwo(state.solutionDetails,action.key).fieldsDetails,
            "fields": formatTwo(state.solutionDetails,action.key).fields,
            "current_solution": formatTwo(state.solutionDetails,action.key).current_solution
        }
    /***********************************************/
    case "WORKFLOW_COPYTO_ONOK":
        return {
            ...state,
            onOKLoading: false,
            operation: [...formatFour(action.operation_log,action.length)]
        }
    case "WORKFLOW_COPYTO_ONOK_LOADING":
        return {
            ...state,
            onOKLoading: true
        }
    /***********************************************/
    case "WORKFLOW_COPYTO_PASS":
        return {
            ...state,
            passLoading: false
        }
    case "WORKFLOW_COPYTO_PASS_LOADING":
        return {
            ...state,
            passLoading: true
        }
    /***********************************************/
    case "WORKFLOW_COPYTO_REJECT":
        return {
            ...state,
            rejectLoading: false
        }
    case "WORKFLOW_COPYTO_REJECT_LOADING":
        return {
            ...state,
            rejectLoading: true
        }
    }
    return {...state}
}
const formatOne = (dataSource)=>{
    let current = []
    for(let val of dataSource)
    {
        if(val.status == 0)
        {
             current.push({
                key: val._id.$oid,
                solution_id: val.solution_id.$oid,
                name: val.solution_name,
                status: val.next_user.name+'审批中',
                creation_time: moment(val.creation_time.$date).format('LLL'),
                end_time: "审批进行中",
                creator_user: val.creator_user.name,
            })
        }
        else if(val.status == 1)
        {
             current.push({
                key: val._id.$oid,
                solution_id: val.solution_id.$oid,
                name: val.solution_name,
                status: '审批完成',
                creator_user: val.creator_user.name,
                creation_time: moment(val.creation_time.$date).format('LLL'),
                end_time: moment(val.end_time.$date).format('LLL'),
            })
        }
        else if(val.status == 2){
            current.push({
                key: val._id.$oid,
                solution_id: val.solution_id.$oid,
                name: val.solution_name,
                status: val.next_user.name+'已拒绝',
                creator_user: val.creator_user.name,
                creation_time: moment(val.creation_time.$date).format('LLL'),
                end_time: moment(val.end_time.$date).format('LLL'),
            })
        }
        else if(val.status == 3)
        {
            current.push({
                key: val._id.$oid,
                solution_id: val.solution_id.$oid,
                name: val.solution_name,
                status: '已撤回',
                creator_user: val.creator_user.name,
                creation_time: moment(val.creation_time.$date).format('LLL'),
                end_time: moment(val.end_time.$date).format('LLL'),
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
const formatFour = (operation_log,length)=>{
    let operation = operation_log.slice(length)
    return operation
}
export default reducer



