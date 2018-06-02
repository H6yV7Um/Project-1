import keyMirror from 'keymirror'
// ------------------------------------
// Constants
// ------------------------------------
import {
    getOwnWorkflow as _getOwnWorkflow,
    withdraw as _withdraw,
    pass as _pass,
    reject as _reject,
    onOk as _onOk

} from '../middlewares/HistoryMiddleware.js'
export const ACTIONS = keyMirror({
	"WORKFLOW_HISTORY_GET_OWN_WORKFLOW_LOADING": "WORKFLOW_HISTORY_GET_OWN_WORKFLOW_LOADING",
	"WORKFLOW_HISTORY_GET_OWN_WORKFLOW": "WORKFLOW_HISTORY_GET_OWN_WORKFLOW",

	"WORKFLOW_HISTORY_SOLUTION_LOADING":"WORKFLOW_HISTORY_SOLUTION_LOADING",
	"WORKFLOW_HISTORY_SOLUTION":"WORKFLOW_HISTORY_SOLUTION",

	"WORKFLOW_HISTORY_SHOW_DETAILS":"WORKFLOW_HISTORY_SHOW_DETAILS",

	"WORKFLOW_HISTORY_WITHDRAW":"WORKFLOW_HISTORY_WITHDRAW",
	"WORKFLOW_HISTORY_WITHDRAW_LOADING":"WORKFLOW_HISTORY_WITHDRAW_LOADING",

	"WORKFLOW_HISTORY_ONOK_LOADING":"WORKFLOW_HISTORY_ONOK_LOADING",
	"WORKFLOW_HISTORY_ONOK":"WORKFLOW_HISTORY_ONOK",

	"WORKFLOW_HISTORY_PASS": "WORKFLOW_HISTORY_PASS",
	"WORKFLOW_HISTORY_PASS_LOADING": "WORKFLOW_HISTORY_PASS_LOADING",

	"WORKFLOW_HISTORY_REJECT": "WORKFLOW_HISTORY_REJECT",
	"WORKFLOW_HISTORY_REJECT_LOADING": "WORKFLOW_HISTORY_REJECT_LOADING",

})
// ------------------------------------
// Actions
// ------------------------------------

export const getOwnWorkflow = (status,p) => _getOwnWorkflow(status,p) 

export const showDetails =(name,key) => ({
    "type":ACTIONS.WORKFLOW_HISTORY_SHOW_DETAILS,
    "name":name,
    "key":key,
})

export const withdraw = (key) => _withdraw(key)

export const onOk = (id,values,length) => _onOk(id,values,length) 

export const pass = (_id,status,content) => _pass(_id,status,content) 


export const reject = (_id,status,content) => _reject(_id,status,content) 


