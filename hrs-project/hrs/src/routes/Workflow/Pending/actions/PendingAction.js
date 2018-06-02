import keyMirror from 'keymirror'
import {
    getPendingWorkflow as _getPendingWorkflow,
    pass as _pass,
    reject as _reject,
    onOk as _onOk
} from '../middlewares/PendingMiddleware.js'
export const ACTIONS = keyMirror({
	"WORKFLOW_PENDING_GET_PENDING_WORKFLOW_LOADING":"WORKFLOW_PENDING_GET_PENDING_WORKFLOW_LOADING",
	"WORKFLOW_PENDING_GET_PENDING_WORKFLOW":"WORKFLOW_PENDING_GET_PENDING_WORKFLOW",

	"WORKFLOW_PENDING_APPROVE":"WORKFLOW_PENDING_APPROVE",

	"WORKFLOW_PENDING_PASS": "WORKFLOW_PENDING_PASS",
	"WORKFLOW_PENDING_PASS_LOADING": "WORKFLOW_PENDING_PASS_LOADING",

	"WORKFLOW_PENDING_REJECT": "WORKFLOW_PENDING_REJECT",
	"WORKFLOW_PENDING_REJECT_LOADING": "WORKFLOW_PENDING_REJECT_LOADING",

	"WORKFLOW_PENDING_ONOK_LOADING":"WORKFLOW_PENDING_ONOK_LOADING",
	"WORKFLOW_PENDING_ONOK":"WORKFLOW_PENDING_ONOK"
})

export const getPendingWorkflow = (p) => _getPendingWorkflow(p) 

export const pass = (_id,status,content) => _pass(_id,status,content) 

export const reject = (_id,status,content) => _reject(_id,status,content) 

export const onOk = (id,values,length) => _onOk(id,values,length) 

export const appove =(key,name) => ({
    "type":ACTIONS.WORKFLOW_PENDING_APPROVE,
    "key":key,
    "name":name
})
