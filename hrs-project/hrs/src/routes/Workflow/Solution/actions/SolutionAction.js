import keyMirror from 'keymirror'
import {
        getSolution as _getSolution,
       	onEdit as _onEdit,
        complete as _complete,
        remove as _remove,
        update as _update
} from '../middlewares/SolutionMiddleware.js'
export const ACTIONS = keyMirror({
    "WORKFLOW_SOLUTION": "WORKFLOW_SOLUTION",
    "WORKFLOW_SOLUTION_LOADING": "WORKFLOW_SOLUTION_LOADING",

    "WORKFLOW_EDIT":"WORKFLOW_EDIT",

    "WORKFLOW_ONCHANGE":"WORKFLOW_ONCHANGE",

    "WORKFLOW_SAVE_NAME":"WORKFLOW_SAVE_NAME",

    "WORKFLOW_SOLUTION_COMPLETE": "WORKFLOW_SOLUTION_COMPLETE",
    "WORKFLOW_SOLUTION_COMPLETE_LOADING": "WORKFLOW_SOLUTION_COMPLETE_LOADING",

    "WORKFLOW_CLEAR":"WORKFLOW_CLEAR",

    "WORKFLOW_ONDELETE":"WORKFLOW_ONDELETE",

    "WORKFLOW_SOLUTION_REMOVE_LOADING":"WORKFLOW_SOLUTION_REMOVE_LOADING",
    "WORKFLOW_SOLUTION_REMOVE":"WORKFLOW_SOLUTION_REMOVE",

    "WORKFLOW_SOLUTION_UPDATE_LOADING":"WORKFLOW_SOLUTION_UPDATE_LOADING",
    "WORKFLOW_SOLUTION_UPDATE": "WORKFLOW_SOLUTION_UPDATE",

    "WORKFLOW_ONCHANGE_COPYTO": "WORKFLOW_ONCHANGE_COPYTO",

    "WORKFLOW_SAVE_REMARK": "WORKFLOW_SAVE_REMARK",

    "WORKFLOW_ONCHANGE_REMARK": "WORKFLOW_ONCHANGE_REMARK"
})

export const getSolution = () => _getSolution()

export const remove = (_id) => _remove(_id)

export const onEdit =(id) => ({
    "type":ACTIONS.WORKFLOW_EDIT,
    "id":id
})

export const onChange =(fields) => ({
    "type":ACTIONS.WORKFLOW_ONCHANGE,
    "fields":fields,
})

export const onDelete =(namespace,deletedOption) => ({
    "type":ACTIONS.WORKFLOW_ONDELETE,
    "namespace":namespace,
    "deletedOption": deletedOption
})

export const saveName =(name) => ({
    "type":ACTIONS.WORKFLOW_SAVE_NAME,
   	name
})

export const saveRemark =(remark) => ({
    "type":ACTIONS.WORKFLOW_SAVE_REMARK,
    remark
})

export const clear =() => ({
    "type":ACTIONS.WORKFLOW_CLEAR,
})

export const onChangeCopyto =(value) => ({
    "type":ACTIONS.WORKFLOW_ONCHANGE_COPYTO,
    "copyto": [...value]
})

export const complete = (name,copyto,remark,fields,flow)=>_complete(name,copyto,remark,fields,flow)

export const update = (_id,name,copyto,remark,fields,flow)=>_update(_id,name,copyto,remark,fields,flow)

export const onChangeRemark =(value) => ({
    "type":ACTIONS.WORKFLOW_ONCHANGE_REMARK,
    value
})



