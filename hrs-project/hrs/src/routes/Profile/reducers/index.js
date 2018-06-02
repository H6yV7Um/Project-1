import {ACTIONS} from '../actions/ProfileAction'
import {
			formatEmployeeStatusData,
			formatGetListNameData,
			formatGetEditEmployeeDetails,
			getOneEmployeeDetailsData,
			changeFileList
		} from './format'
import {SERVER} from 'config'

const initialState = {
	
	"memberData":{},
	"fileOfmemberData":{},
	"remuneration":{
		salaries: []
	},
	"searchData":{
		"name":'',
		"department":[],
		"status":'',
		"type":'',
		"regularizationdate":'',
		"jobcategory":'',
		"position_level":'',
		"salary_level":'',
	},
	"displayAllFields":0,

    "getFieldsGroupLoading":false,
	"getFieldsGroupError": '',
	"fieldsGroup":[],

	"getProfileTaxesLoading": false,
	"getProfileTaxesError": '',
	"getProfileTaxesData":[],

	"getSocialSecurityLoading": false,
	"getSocialSecurityError": '',
	"getSocialSecurityData":[],

	"getSalaryLoading": false,
	"getSalaryError": '',
	"getSalaryData":[],

	"getEmployeesLoading": false,
	"employees":[],

	"getFundLoading": false,
	"getFundError": '',
	"getFundData":[],

	"getEmployeeStatusLoading": false,
	"getEmployeeStatusError": '',
	"getEmployeeStatusData":[],
	"getEmployeeStatusDataNoFormat":[],
	"total": 1,
	"current": 1,
	"condition": {},

	"getListNameLoading": false,
	"getListNameError": '',
	"getListNameData":[],

	"getHeadLoading": false,
	"getHeadError": '',
	"getHeadData":[],

	"getOneEmployeeDetailsData":[],

	"getEntrySaveLoading": false,
	"getEntrySaveError": '',
	"saveSuccessData": false,

	"getEntryUpdateLoading": false,
	"getEntryUpdateError": '',
	"updateSuccessData": false,
	
	"saveCompletedLoading": false,
	"saveCompletedError": '',

	"fillRequire":0,
	
	"existsCustomFieldLoading": false,
	"existsCustomFieldError": '',

	"user_id":'',

	"updateProfile": false
}

/**
 * Reducer
 */

const reducer = (state = initialState, action) => {
    switch (action.type) {
	   	/**************************************************/

	    case ACTIONS.PROFILE_FIELDS_GROUP_LOADING:
	        return {
	            ...state,
	            "getFieldsGroupLoading": true
	        }
	    case ACTIONS.PROFILE_FIELDS_GROUP_ERROR:
	        return {
	            ...state,
	            "getFieldsGroupError": action.message,
	            "getFieldsGroupLoading": false
	        }
	    case ACTIONS.PROFILE_FIELDS_GROUP:
	        return {
	            ...state,
	            "getFieldsGroupError": '',
	            "getFieldsGroupLoading": false,
	            "fieldsGroup": action.groupData
	        }
	    /**************************************************/

	    case ACTIONS.PROFILE_EMPLOYEES_LOADING:
	        return {
	            ...state,
	            "getEmployeesLoading": true
	        }
	    
	    case ACTIONS.PROFILE_EMPLOYEES:
	        return {
	            ...state,
	            "getEmployeesLoading": false,
	            "employees": action.employees
	        }
	    /**************************************************/

	    case ACTIONS.PROFILE_TAXES_LOADING:
	        return {
	            ...state,
	            "getProfileTaxesLoading": true
	        }
	    case ACTIONS.PROFILE_TAXES_ERROR:
	        return {
	            ...state,
	            "getProfileTaxesError": action.message,
	            "getProfileTaxesLoading": false
	        }
	    case ACTIONS.PROFILE_TAXES:
	        return {
	            ...state,
	            "getProfileTaxesError": '',
	            "getProfileTaxesLoading": false,
	            "getProfileTaxesData": action.taxesData
	        }

	    /**************************************************/
	    case ACTIONS.PROFILE_SOCIAL_SECURITY_LOADING:
	        return {
	            ...state,
	            "getSocialSecurityLoading": true
	        }
	    case ACTIONS.PROFILE_SOCIAL_SECURITY_ERROR:
	        return {
	            ...state,
	            "getSocialSecurityError": action.message,
	            "getSocialSecurityLoading": false
	        }
	    case ACTIONS.PROFILE_SOCIAL_SECURITY:
	        return {
	            ...state,
	            "getSocialSecurityError": '',
	            "getSocialSecurityLoading": false,
	            "getSocialSecurityData": action.socialSecurityData
	        }
	    /**************************************************/

	    case ACTIONS.PROFILE_SALARY_LOADING:
	        return {
	            ...state,
	            "getSalaryLoading": true
	        }
	    case ACTIONS.PROFILE_SALARY_ERROR:
	        return {
	            ...state,
	            "getSalaryError": action.message,
	            "getSalaryLoading": false
	        }
	    case ACTIONS.PROFILE_SALARY:
	    	let remuneration = {...state.remuneration}

	    	if(action.salaryData)
	    	{
	    		remuneration.salary = action.salaryData[0]._id.$oid
	    		remuneration.salaries = []
	    		for(let item of action.salaryData[0].salaries)
                {
                    remuneration.salaries.push({ "value":0,"salary_id":item._id,"name":item.name})
                }
	    		
	    	}
	        return {
	            ...state,
	            "getSalaryError": '',
	            "getSalaryLoading": false,
	            "getSalaryData": action.salaryData,
	            remuneration
	        }

	    /**************************************************/
	    case ACTIONS.PROFILE_FUND_LOADING:
	        return {
	            ...state,
	            "getFundLoading": true
	        }
	    case ACTIONS.PROFILE_FUND_ERROR:
	        return {
	            ...state,
	            "getFundError": action.message,
	            "getFundLoading": false
	        }
	    case ACTIONS.PROFILE_FUND:
	        return {
	            ...state,
	            "getFundError": '',
	            "getFundLoading": false,
	            "getFundData": action.fundData
	        }

	    /**************************************************/
	    case ACTIONS.PROFILE_ENTRY_LOADING:
	        return {
	            ...state,
	            "getEntrySaveLoading": true
	        }
	    case ACTIONS.PROFILE_ENTRY_ERROR:
	        return {
	            ...state,
	            "getEntrySaveError": action.message,
	            "getEntrySaveLoading": false
	        }
	    case ACTIONS.PROFILE_ENTRY:

	        return {
	            ...state,
	            "getEntrySaveError": '',
	            "getEntrySaveLoading": false,
	            "saveSuccessData": action.saveSuccessData,
	            "updateProfile": action.updateProfile
	        }
	    /**************************************************/
	    case ACTIONS.PROFILE_ENTRY_UPDATE_LOADING:
	        return {
	            ...state,
	            "getEntryUpdateLoading": true
	        }
	    case ACTIONS.PROFILE_ENTRY_UPDATE_ERROR:
	        return {
	            ...state,
	            "getEntryUpdateError": action.message,
	            "getEntryUpdateLoading": false
	        }
	    case ACTIONS.PROFILE_ENTRY_UPDATE:
	        return {
	            ...state,
	            "getEntryUpdateError": '',
	            "getEntryUpdateLoading": false,
	            "updateSuccessData": action.updateSuccessData,
	            "memberData": {...state.memberData},
	            "remuneration": {...state.remuneration},
	            "updateProfile":action.updateProfile
	        }
	    /**************************************************/
	    case ACTIONS.PROFILE_EMPLOYEE_STATUS_LOADING:
	        return {
	            ...state,
	            "getEmployeeStatusLoading": true,
	            "updateProfile": action.updateProfile
	        }
	    case ACTIONS.PROFILE_EMPLOYEE_STATUS_ERROR:
	        return {
	            ...state,
	            "getEmployeeStatusError": action.message,
	            "getEmployeeStatusLoading": false
	        }
	    case ACTIONS.PROFILE_EMPLOYEE_STATUS:
	        return {
	            ...state,
	            "getEmployeeStatusError": '',
	            "getEmployeeStatusLoading": false,
	            "getEmployeeStatusDataNoFormat":action.getEmployeeStatusData.data,
	            "getEmployeeStatusData":formatEmployeeStatusData(action.getEmployeeStatusData.data),
	            "total":action.total,
	            "current": action.current,
	            "condition": action.condition

	            
	        }
	    /**************************************************/
	    case ACTIONS.PROFILE_COMPLETED_LOADING:
	        return {
	            ...state,
	            "saveCompletedLoading": true
	        }
	    case ACTIONS.PROFILE_COMPLETED_ERROR:
	        return {
	            ...state,
	            "saveCompletedError": action.message,
	            "saveCompletedLoading": false
	        }
	    case ACTIONS.PROFILE_COMPLETED:
	        return {
	            ...state,
	            "saveCompletedError": '',
	            "saveCompletedLoading": false,
	        }

	    /**************************************************/
	    case ACTIONS.PROFILE_LIST_NAME_LOADING:
	        return {
	            ...state,
	            "getListNameLoading": true
	        }
	    case ACTIONS.PROFILE_LIST_NAME_ERROR:
	        return {
	            ...state,
	            "getListNameError": action.message,
	            "getListNameLoading": false
	        }
	    case ACTIONS.PROFILE_LIST_NAME:
	        return {
	            ...state,
	            "getListNameError": '',
	            "getListNameLoading": false,
	            "getListNameData":formatGetListNameData(action.getListNameData)
	        }
	    /**************************************************/
	    case ACTIONS.PROFILE_HEAD_LOADING:
	        return {
	            ...state,
	            "getHeadLoading": true
	        }
	    case ACTIONS.PROFILE_HEAD_ERROR:
	        return {
	            ...state,
	            "getHeadError": action.message,
	            "getHeadLoading": false
	        }
	    case ACTIONS.PROFILE_HEAD:
	        return {
	            ...state,
	            "getHeadError": '',
	            "getHeadLoading": false,
	            "getHeadData":action.getHeadData
	        }
	   
	    /**************************************************/
	    case ACTIONS.PROFILE_EXISTS_CUSTOM_FILED_LOADING:
	        return {
	            ...state,
	            "existsCustomFieldLoading": true
	        }
	    case ACTIONS.PROFILE_EXISTS_CUSTOM_FILED_ERROR:
	        return {
	            ...state,
	            "existsCustomFieldError": action.message,
	            "existsCustomFieldLoading": false
	        }
	    case ACTIONS.PROFILE_EXISTS_CUSTOM_FILED:

	        return {
	            ...state,
	            "existsCustomFieldError": '',
	            "existsCustomFieldLoading": false
	        }
	    /************************************************/
	    case ACTIONS.PROFILE_TOGGLEPAGE:
	    	return {
	    		...state,
	    		"displayAllFields":action.displayAllFields
	    	}
	    /************************************************/
	    case ACTIONS.PROFILE_CHANGE_MEMBER_DATA:

	    	return {
	    		...state,
	    		memberData: action.memberData,   		
	    	}
	    /************************************************/
	    case ACTIONS.PROFILE_CHANGE_FILE_OF_MEMBER_DATA:
	    	let fileOfmemberData
	    	if(!state.fileOfmemberData)
	    	{
	    		fileOfmemberData = {}
	    	}
	    	else {
	    		fileOfmemberData = state.fileOfmemberData
	    	}
	    	let currentFileList = changeFileList(fileOfmemberData,state.memberData,action.fileList,action.namespace)
	    	return {
	    		...state,
	    		"fileOfmemberData": currentFileList.fileOfmemberData,
	    		"memberData": currentFileList.memberData
	    	}
	     /************************************************/
	    case ACTIONS.PROFILE_CHANGE_REMUNERATION_DATA:
	    	return {
	    		...state,
	    		remuneration: action.remuneration,
	    		
	    	}
	   	/************************************************/
	    case ACTIONS.PROFILE_EMPTY_MEMBER_DATA:
	    	let currentObj = {}
   	 		currentObj.salary = state.getSalaryData[0]._id.$oid
    		currentObj.salaries = []
    		for(let item of state.getSalaryData[0].salaries)
            {
                currentObj.salaries.push({ "value":0,"salary_id":item._id,"name":item.name})
            }
	    	return {
	    		...state,
	    		"memberData":{},
	    		"fileOfmemberData": {},
	    		"remuneration":{...currentObj}
	    	}
	  
	    /************************************************/
	    case ACTIONS.PROFILE_SEARCH_USER:
	    	
	    	return {
	    		...state,
	    		searchData:action.searchData
	    	}
	    /************************************************/
	    case ACTIONS.PROFILE_EMPLOYEE_DETAILS:

	    	let current = formatGetEditEmployeeDetails
	    	(
				action.id,
			   	state.getEmployeeStatusDataNoFormat,
			   	state.fieldsGroup,
			   	state.getSocialSecurityData,
			   	state.getFundData,
			   	state.getProfileTaxesData,
			   	state.getSalaryData,
			   	state.remuneration.salaries
	    	)
	    	return {
	    		...state,
	    		memberData: current.memberData,
	    		fileOfmemberData: current.fileOfmemberData,
	    		remuneration: current.remuneration,
	    		user_id:action.id
	    	}
	    case ACTIONS.PROFILE_ONE_EMPLOYEE_DETAILS_DATA:

	    	return {
	    		...state,
	    		"getOneEmployeeDetailsData": getOneEmployeeDetailsData(action.id,state.getEmployeeStatusDataNoFormat)
	    	}
    }
    return {...state}
}


export default reducer






