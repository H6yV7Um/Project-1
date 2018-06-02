import {ACTIONS} from '../actions/PendingAction'
import moment from 'moment'
const initialState = {
    getPendingWorkflowLoading:false,
    solution: [],
    dataSource:[],
    name:'',
    
    passLoading:false,
    rejectLoading: false,

    fieldsDetails:{},
    fields: [],
    current_solution:{},
    
    onOKLoading: false,

    count:1,
    current:1,

    operation: []

}

/**
 * Reducer
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
    /***********************************************/
    case "WORKFLOW_PENDING_GET_PENDING_WORKFLOW":
        return {
            ...state,
            "solution": action.solution,
            "dataSource": formatOne(action.solution),
            "getPendingWorkflowLoading": false,
            "count": action.count,
            "current": action.current
        }
    case "WORKFLOW_PENDING_GET_PENDING_WORKFLOW_LOADING":
        return {
            ...state,
            "getPendingWorkflowLoading": true
        }
    /***********************************************/
    case "WORKFLOW_PENDING_PASS":
        return {
            ...state,
            passLoading: false
        }
    case "WORKFLOW_PENDING_PASS_LOADING":
        return {
            ...state,
            passLoading: true
        }
    /***********************************************/
    case "WORKFLOW_PENDING_REJECT":
        return {
            ...state,
            rejectLoading: false
        }
    case "WORKFLOW_PENDING_REJECT_LOADING":
        return {
            ...state,
            rejectLoading: true
        }
    /***********************************************/
    case "WORKFLOW_PENDING_ONOK":
        return {
            ...state,
            onOKLoading: false,
            operation: [...formatFour(action.operation_log,action.length)]
        }
    case "WORKFLOW_PENDING_ONOK_LOADING":
        return {
            ...state,
            onOKLoading: true
        }
    /***********************************************/
    case "WORKFLOW_PENDING_APPROVE":
        let current = {...formatTwo(state.solution,action.key)}
        return {
            ...state,
            'name': action.name,
            "fieldsDetails": current.fieldsDetails,
            "fields": current.fields,
            "current_solution": current.current_solution
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
            name: val.solution_name,
            creator_user:val.creator_user.name,
            creation_time: moment(val.creation_time.$date).format('LLL')
        })
    }
    return dataSource
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