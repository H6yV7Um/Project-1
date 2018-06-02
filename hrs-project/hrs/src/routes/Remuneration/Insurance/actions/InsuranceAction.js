import keyMirror from 'keymirror'
import {listInsurance as _listInsurance,addInsurance as _addInsurance,save as _save,remove as _remove,} from '../middlewares/InsuranceMiddleware.js'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
	"REMUNERATION_INSURANCE_SWITCH": "REMUNERATION_INSURANCE_SWITCH",

	"REMUNERATION_INSURANCE_LOADING":"REMUNERATION_INSURANCE_LOADING",
	"REMUNERATION_INSURANCE_ERROR":"REMUNERATION_INSURANCE_ERROR",
	"REMUNERATION_INSURANCE":"REMUNERATION_INSURANCE",

	"REMUNERATION_INSURANCE_SAVE": "REMUNERATION_INSURANCE_SAVE",
    "REMUNERATION_INSURANCE_SAVE_ERROR": "REMUNERATION_INSURANCE_SAVE_ERROR",
    "REMUNERATION_INSURANCE_SAVE_LOADING": "REMUNERATION_INSURANCE_SAVE_LOADING", 

    "REMUNERATION_INSURANCE_REMOVE_LOADING":"REMUNERATION_INSURANCE_REMOVE_LOADING",
    "REMUNERATION_INSURANCE_REMOVE_ERROR":"REMUNERATION_INSURANCE_REMOVE_ERROR",
    "REMUNERATION_INSURANCE_REMOVE":"REMUNERATION_INSURANCE_REMOVE",


    "REMUNERATION_INSURANCE_EDIT":"REMUNERATION_INSURANCE_EDIT"  

})
// ------------------------------------
// Actions
// ------------------------------------
export const switchStatus = (status) => ({
    "type": "REMUNERATION_INSURANCE_SWITCH",
    status
}) 

export const listInsurance = () => _listInsurance()

export const addInsurance = () => _addInsurance()

export const save = (_id,name,pension,medical,serious_illness,unemployment,occupational_injury,birth) => _save(_id,name,pension,medical,serious_illness,unemployment,occupational_injury,birth)

export const remove = (_id) => _remove(_id)

export const editInsurance = (_id) => {
	return{
	"type": "REMUNERATION_INSURANCE_EDIT",
	"key":_id
	}
}
export const setErrorList =(message) => ({
    "type":ACTIONS.INSURANCE_LIST_INSURANCE_ERROR,
    message
})


