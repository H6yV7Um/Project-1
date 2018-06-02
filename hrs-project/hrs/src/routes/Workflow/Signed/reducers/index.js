import {ACTIONS} from '../actions/SignedAction'
import moment from 'moment'
const initialState = {
    getFindOwnDoneWorkflowLoading: false,
    solution:[],
    dataSource:[],

    current_solution: [],
    fields:[],
    fieldsDetails:{},
    onOKLoading: false,
    count:1,
    current:1,
    operation:[]
}
/**
 * Reducer
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
    /***********************************************/
    case "WORKFLOW_SIGNED_GET_FIND_OWN_DONE_WORKFLOW":
        return {
            ...state,
            "solution": action.solution,
            "dataSource": formatOne(action.solution),
            "count": action.count,
            "current": action.current,
            "getFindOwnDoneWorkflowLoading": false
        }
    case "WORKFLOW_SIGNED_GET_FIND_OWN_DONE_WORKFLOW_LOADING":
        return {
            ...state,
            "getFindOwnDoneWorkflowLoading": true
        }
    /***********************************************/
    case "WORKFLOW_SIGNED_SIGNEDDETAILS":
        let current = {...formatTwo(state.solution,action.key)}
        return {
            ...state,
            'name': action.name,
            "fieldsDetails": current.fieldsDetails,
            "fields": current.fields,
            "current_solution": current.current_solution
        }
    /***********************************************/
    case "WORKFLOW_SIGNED_ONOK":
        return {
            ...state,
            onOKLoading: false,
            operation: [...formatFour(action.operation_log,action.length)]
        }
    case "WORKFLOW_SIGNED_ONOK_LOADING":
        return {
            ...state,
            onOKLoading: true
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

const formatTwo = (solution,key)=>{
    let current = {}
    for(let val of solution)
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