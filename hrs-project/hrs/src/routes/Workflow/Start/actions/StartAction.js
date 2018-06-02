import keyMirror from 'keymirror'
import {
        getSolution as _getSolution,
        complete as _complete
       
} from '../middlewares/StartMiddleware.js'
export const ACTIONS = keyMirror({
	"WORKFLOW_START_SOLUTION": "WORKFLOW_START_SOLUTION",
    "WORKFLOW_START_SOLUTION_LOADING": "WORKFLOW_START_SOLUTION_LOADING",

    "START_GET_ONE_SOLUTION": "START_GET_ONE_SOLUTION",

    "WORKFLOW_START_CHANGE_FILE_OF_MEMBER_DATA":"WORKFLOW_START_CHANGE_FILE_OF_MEMBER_DATA",

    "WORKFLOW_STRAT_COMPLETE_LOADING":"WORKFLOW_STRAT_COMPLETE_LOADING",
    "WORKFLOW_STRAT_COMPLETE":"WORKFLOW_STRAT_COMPLETE"
})
export const getSolution = () => _getSolution()

export const complete = (solution_id,fields) => _complete(solution_id,fields)

export const getOneSolution =(id) => ({
    "type":ACTIONS.START_GET_ONE_SOLUTION,
    "id":id
})

export const changeFileData = (fileList,namespace) =>{
	return {
		"type": ACTIONS.WORKFLOW_START_CHANGE_FILE_OF_MEMBER_DATA,
	    "fileList": fileList,
	    "namespace": namespace
	}
}



