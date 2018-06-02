import {ACTIONS} from '../actions/InsuranceAction'

const initialState = {
	"pageState": 'list',

	"list_insurance_loading":false,
	"list_insurance_error":"",
	"list_insurance":[],

	"save_insurance_loading":false,
	"save_insurance_error":"",

	"removeError": '',
    "removeLoading": false,

    "currentRecord":{},
}

/**
 * Reducer
 */

const reducer = (state = initialState, action) => {
	const data = state.list_insurance
    switch (action.type) {
    case "REMUNERATION_INSURANCE_SWITCH":
        return {
            ...state,
            "pageState": action.status
        }
    /*************************************/
    case "REMUNERATION_INSURANCE_LOADING":
        return {
	            ...state,
	            "list_insurance_loading": true
	    }
    case "REMUNERATION_INSURANCE_ERROR":
       	return {
	            ...state,
	            "list_insurance_error": action.message,
	            "list_insurance_loading": false
	    }
    case "REMUNERATION_INSURANCE":
        return {
	            ...state,
	            "list_insurance_error": '',
	            "list_insurance_loading": false,
	            "list_insurance":action.listInsurance,     
	    }
	/*************************************/
    case "REMUNERATION_INSURANCE_SAVE":
        return {
	            ...state,
	            "pageState":action.pageState ,
                "edit":false,
                "save_insurance_loading": false  
	    }
    case "REMUNERATION_INSURANCE_SAVE_LOADING":
        return {
                ...state,
                "save_insurance_loading": true
        }
    case "REMUNERATION_INSURANCE_SAVE_ERROR":
        return {
                ...state,
                "save_insurance_error": action.message,
                "save_insurance_loading": false
        }
	 /*************************************/
	case "REMUNERATION_INSURANCE_REMOVE":
		for (let i = 0; i < data.length; i++) {
            if (data[i]._id.$oid == action._id) {
                data.splice(i, 1)
                break
            }
        }
        return {
            ...state,
            data,
            "removeError": '',
            "removeLoading": false
        }
    case "REMUNERATION_INSURANCE_REMOVE_ERROR":
        return {
            ...state,
            "removeError": action.message
        }
    case "REMUNERATION_INSURANCE_REMOVE_LOADING":
        return {
            ...state,
            "removeLoading": true
        }
    /*************************************/
    case "REMUNERATION_INSURANCE_EDIT":
        for(let val of state.list_insurance)
        {
            if(val._id.$oid == action.key )
            {
                return {
                    ...state,
                    "currentRecord":{...val},
                    "pageState":"edit",
                } 
            }
        }
    }
    return {...state}
}
export default reducer