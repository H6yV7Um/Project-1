import keyMirror from 'keymirror'
import {
    getOwnCopytoWorkflow as _getOwnCopytoWorkflow,
    pass as _pass,
    reject as _reject,
    onOk as _onOk
} from '../middlewares/CopytoMiddleware.js'
export const ACTIONS = keyMirror({
	"WORKFLOW_COPYTO_GET_OWN_COPYTO_WORKFLOW_LOADING": "WORKFLOW_COPYTO_GET_OWN_COPYTO_WORKFLOW_LOADING",
	"WORKFLOW_COPYTO_GET_OWN_COPYTO_WORKFLOW": "WORKFLOW_COPYTO_GET_OWN_COPYTO_WORKFLOW",

	"WORKFLOW_COPYTO_DETAILS": "WORKFLOW_COPYTO_DETAILS",

	"WORKFLOW_COPYTO_ONOK": "WORKFLOW_COPYTO_ONOK",
	"WORKFLOW_COPYTO_ONOK_LOADING": "WORKFLOW_COPYTO_ONOK_LOADING",

	"WORKFLOW_COPYTO_PASS": "WORKFLOW_COPYTO_PASS",
	"WORKFLOW_COPYTO_PASS_LOADING": "WORKFLOW_COPYTO_PASS_LOADING",

	"WORKFLOW_COPYTO_REJECT": "WORKFLOW_COPYTO_REJECT",
	"WORKFLOW_COPYTO_REJECT_LOADING": "WORKFLOW_COPYTO_REJECT_LOADING"
})
export const getOwnCopytoWorkflow = (p) => _getOwnCopytoWorkflow(p) 

export const copytodetails =(key,name) => ({
    "type":ACTIONS.WORKFLOW_COPYTO_DETAILS,
    "name":name,
    "key":key,
})

export const onOk = (id,values,length) => _onOk(id,values,length) 

export const pass = (_id,status,content) => _pass(_id,status,content) 

export const reject = (_id,status,content) => _reject(_id,status,content) 


