import keyMirror from 'keymirror'
import {
    getFindOwnDoneWorkflow as _getFindOwnDoneWorkflow,
    onOk as _onOk
} from '../middlewares/SignedMiddleware.js'
export const ACTIONS = keyMirror({
	"WORKFLOW_SIGNED_GET_FIND_OWN_DONE_WORKFLOW_LOADING":"WORKFLOW_SIGNED_GET_FIND_OWN_DONE_WORKFLOW_LOADING",
	"WORKFLOW_SIGNED_GET_FIND_OWN_DONE_WORKFLOW":"WORKFLOW_SIGNED_GET_FIND_OWN_DONE_WORKFLOW",

	"WORKFLOW_SIGNED_SIGNEDDETAILS":"WORKFLOW_SIGNED_SIGNEDDETAILS",

	"WORKFLOW_SIGNED_ONOK_LOADING":"WORKFLOW_SIGNED_ONOK_LOADING",
	"WORKFLOW_SIGNED_ONOK":"WORKFLOW_SIGNED_ONOK"
})
export const getFindOwnDoneWorkflow = (p) => _getFindOwnDoneWorkflow(p) 

export const onOk = (id,values,length) => _onOk(id,values,length) 

export const signeddetails =(key,name) => ({
    "type":ACTIONS.WORKFLOW_SIGNED_SIGNEDDETAILS,
    "key":key,
    "name":name
})



