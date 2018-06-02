import {ACTIONS} from '../actions/SolutionAction'
const initialState = {
    "solution": [],
    "dataSource":[],

    "currentRecord": {},
    "getSolutionLoading": false,

    "removingID": "",
    "removeLoading": false,

    "updateLoading":false,

    "fields":[],
    "name":'',
    "copyto":[],

    "flow":[],

    "EDITID":'',
    
    "completeLoading": false,

    "EDITING":false,

    "pageState":"edit",
    
    "remark":''
}
/**
 * Reducer
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
    /***********************************************/
    case "WORKFLOW_SOLUTION":
        return {
            ...state,
            "solution": action.solution,
            "dataSource": formatOne(action.solution),
            "getSolutionLoading": false
        }
    case "WORKFLOW_SOLUTION_LOADING":
        return {
            ...state,
            "getSolutionLoading": true
        }
    /***********************************************/
    case "WORKFLOW_EDIT":
        let currentData = formatTwo(action.id,state.solution)
        return {
            ...state,
            name: currentData.name,
            copyto: currentData.copyto,
            fields: currentData.fields,
            flow: currentData.flow,
            remark: currentData.remark,
            EDITID: action.id,
            EDITING:true,
        }
    /***********************************************/
    case "WORKFLOW_SAVE_NAME":
        return {
            ...state,
            "name": action.name
        }
     /***********************************************/
    case "WORKFLOW_SAVE_REMARK":
        return {
            ...state,
            "remark": action.remark
        }
    /***********************************************/
    case "WORKFLOW_SOLUTION_REMOVE_LOADING":
        return {
            ...state,
            "removeLoading": true
        }
     case "WORKFLOW_SOLUTION_REMOVE":
        return {
            ...state,
            "dataSource": removeTerm(action.id,state.dataSource),
            "removeLoading": false
        }
    /***********************************************/
    case "WORKFLOW_SOLUTION_UPDATE_LOADING":
        return {
            ...state,
            "updateLoading": true
        }
     case "WORKFLOW_SOLUTION_UPDATE":
        return {
            ...state,
            "updateLoading": false,
        }
    /***********************************************/
    case "WORKFLOW_ONCHANGE":
        return {
            ...state,
            "fields": action.fields
        }
    /***********************************************/
    case "WORKFLOW_ONDELETE":
        let mixData = formatThree(action.namespace,action.deletedOption,state.flow)
        return {
            ...state,
            flow:mixData.flow,
        }
    /***********************************************/
    case "WORKFLOW_SOLUTION_COMPLETE_LOADING":
        return {
            ...state,
            "completeLoading": true
        }
    case "WORKFLOW_SOLUTION_COMPLETE":
        return {
            ...state,
            "completeLoading": false
        }
    /***********************************************/
    case "WORKFLOW_CLEAR":
        return {
            ...state,
           name:'',
           copyto:[],
           fields:[],
           flow:[],
           EDITID:'',
           remark:'',
           pageState:"add"
        }
    /***********************************************/
    case "WORKFLOW_ONCHANGE_COPYTO":
        return {
            ...state,
           copyto: action.copyto
        }
    /***********************************************/
    case "WORKFLOW_ONCHANGE_REMARK":
        return {
            ...state,
           remark: action.value
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
const formatTwo = (id,solution)=>{
    let currentData = {}
    for(let val of solution)
    {
        if(val._id.$oid == id)
        {
            currentData.name = val.name
            currentData.fields = val.fields
            currentData.flow = val.flow
            currentData.copyto = val.copyto
            currentData.remark = val.remark
        }
    }
    return currentData
} 
const deleteNode =(id,flow)=>
{
    for(let i=0; i<flow.length;i++)
    {
        if(flow[i].id == id)
        {
            flow.splice(i,1)
            break
        }
    }
    for(let i=0;i < flow.length;i++)
    {
        if(flow[i].source == id)
        {
            flow = deleteNode(flow[i].id,flow)
            i=-1
        }
    }
    return flow
}
const formatThree = (namespace,deletedOptions,flow)=>{ 
    flow = [...flow]
    let mixData ={}
    if(deletedOptions.length)
    {  
        let source 
        let options
        let oldflow = [...flow] 
        for(let val of oldflow )
        {
            if(val.namespace == namespace )
            {
                options = val.options
                let options = val.options
                for(let i= 0;i<options.length ;i++)
                {
                    if(deletedOptions[0] == options[i])
                    {
                        source = val.source
                        for(let i=0;i<flow.length;i++)
                        {
                            if(flow[i].source == source)
                            {
                                flow = deleteNode(flow[i].id,flow)
                                i=-1
                            }
                        }
                    }
                } 
            }
        }
        mixData.flow = flow
        return mixData
    }
    else
    {
        for(let i = 0 ; i<flow.length;i++)
        {
            if(flow[i].namespace == namespace)
            {
               flow.splice(i,1)
               i-- 
            }
        }       
        mixData.flow = flow
        return mixData
    }
} 
const removeTerm = (id,dataSource) =>
{
    dataSource = [...dataSource]
    for(let i =0; i<dataSource.length;i++)
    {
        if(dataSource[i].key == id)
        {
            dataSource.splice(i,1)
        }
    }
    return dataSource
}
export default reducer