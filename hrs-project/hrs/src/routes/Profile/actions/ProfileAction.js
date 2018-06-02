
import keyMirror from 'keymirror'
import {
        getEntryUpdate as _getEntryUpdate, 
        getEmployeeDetails as _getEmployeeDetails,
        existsCustomField as _existsCustomField,  
        getHead as _getHead, 
        getListName as _getListName, 
        getEmployeeStatus as _getEmployeeStatus, 
        getEntrySave as _getEntrySave, 
        getFund as _getFund,
        getSalary as _getSalary,
        getSocialSecurity as _getSocialSecurity,
        getEmployees as _getEmployees,
        getFieldsGroup as _getFieldsGroup,
        getProfileTaxes as _getProfileTaxes} from '../middlewares/ProfileMiddleware.js'	
// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({

	
    "PROFILE_EMPLOYEES_LOADING":"PROFILE_EMPLOYEES_LOADING",
    "PROFILE_EMPLOYEES":"PROFILE_EMPLOYEES",

    "PROFILE_FIELDS_GROUP_LOADING": "PROFILE_FIELDS_GROUP_LOADING",
    "PROFILE_FIELDS_GROUP_ERROR": "PROFILE_FIELDS_GROUP_ERROR",
    "PROFILE_FIELDS_GROUP": "PROFILE_FIELDS_GROUP",


    "PROFILE_TAXES_LOADING": "PROFILE_TAXES_LOADING",
    "PROFILE_TAXES_ERROR": "PROFILE_TAXES_ERROR",
    "PROFILE_TAXES": "PROFILE_TAXES",

    "PROFILE_SOCIAL_SECURITY_LOADING": "PROFILE_SOCIAL_SECURITY_LOADING",
    "PROFILE_SOCIAL_SECURITY_ERROR": "PROFILE_SOCIAL_SECURITY_ERROR",
    "PROFILE_SOCIAL_SECURITY": "PROFILE_SOCIAL_SECURITY",

    "PROFILE_SALARY_LOADING": "PROFILE_SALARY_LOADING",
    "PROFILE_SALARY_ERROR": "PROFILE_SALARY_ERROR",
    "PROFILE_SALARY": "PROFILE_SALARY",

    "PROFILE_FUND_LOADING": "PROFILE_FUND_LOADING",
    "PROFILE_FUND_ERROR": "PROFILE_FUND_ERROR",
    "PROFILE_FUND": "PROFILE_FUND",

    "PROFILE_CHANGE_MEMBER_DATA": "PROFILE_CHANGE_MEMBER_DATA",
    "PROFILE_CHANGE_FILE_OF_MEMBER_DATA": "PROFILE_CHANGE_FILE_OF_MEMBER_DATA",


    "PROFILE_EMPTY_MEMBER_DATA": "PROFILE_EMPTY_MEMBER_DATA",

    "PROFILE_CHANGE_REMUNERATION_DATA": "PROFILE_CHANGE_REMUNERATION_DATA",

    "PROFILE_ENTRY_LOADING": "PROFILE_ENTRY_LOADING",
    "PROFILE_ENTRY_ERROR": "PROFILE_ENTRY_ERROR",
    "PROFILE_ENTRY": "PROFILE_ENTRY",

    "PROFILE_EMPLOYEE_STATUS_LOADING":"PROFILE_EMPLOYEE_STATUS_LOADING",
    "PROFILE_EMPLOYEE_STATUS_ERROR":"PROFILE_EMPLOYEE_STATUS_ERROR",
    "PROFILE_EMPLOYEE_STATUS":"PROFILE_EMPLOYEE_STATUS",

    "PROFILE_LIST_NAME_LOADING":"PROFILE_LIST_NAME_LOADING",
    "PROFILE_LIST_NAME_ERROR":"PROFILE_LIST_NAME_ERROR",
    "PROFILE_LIST_NAME":"PROFILE_LIST_NAME",

    "PROFILE_HEAD_LOADING":"PROFILE_HEAD_LOADING",
    "PROFILE_HEAD_ERROR":"PROFILE_HEAD_ERROR",
    "PROFILE_HEAD":"PROFILE_HEAD",
    
   
    "PROFILE_EMPLOYEEDETAILS_LOADING": "PROFILE_EMPLOYEEDETAILS_LOADING",
    "PROFILE_EMPLOYEEDETAILS_ERROR": "PROFILE_EMPLOYEEDETAILS_ERROR",
    "PROFILE_EMPLOYEEDETAILS": "PROFILE_EMPLOYEEDETAILS",

    "PROFILE_ENTRY_UPDATE_LOADING": "PROFILE_ENTRY_UPDATE_LOADING",
    "PROFILE_ENTRY_UPDATE_ERROR": "PROFILE_ENTRY_UPDATE_ERROR",
    "PROFILE_ENTRY_UPDATE": "PROFILE_ENTRY_UPDATE",


    "PROFILE_EXISTS_CUSTOM_FILED_LOADING": "PROFILE_EXISTS_CUSTOM_FILED_LOADING",
    "PROFILE_EXISTS_CUSTOM_FILED_ERROR": "PROFILE_EXISTS_CUSTOM_FILED_ERROR",
    "PROFILE_EXISTS_CUSTOM_FILED": "PROFILE_EXISTS_CUSTOM_FILED",

    "PROFILE_SEARCH_USER": "PROFILE_SEARCH_USER",

    "PROFILE_EDIT_MEMEBERDATA": "PROFILE_EDIT_MEMEBERDATA",
    "PROFILE_EDIT_REMUNERATION": "PROFILE_EDIT_REMUNERATION",

    "PROFILE_EMPLOYEE_DETAILS": "PROFILE_EMPLOYEE_DETAILS",

    "PROFILE_ONE_EMPLOYEE_DETAILS_DATA": "PROFILE_ONE_EMPLOYEE_DETAILS_DATA",

    "PROFILE_JUDGE_EDIT_DATA": "PROFILE_JUDGE_EDIT_DATA",

    "PROFILE_TOGGLEPAGE": "PROFILE_TOGGLEPAGE"

    
})
// ------------------------------------
// Actions
// ------------------------------------

export const getFieldsGroup = () => _getFieldsGroup() 

export const getProfileTaxes = () =>  _getProfileTaxes()

export const getSocialSecurity = () =>  _getSocialSecurity()

export const getSalary = () =>  _getSalary()

export const getEmployees = () =>  _getEmployees()

export const getFund = () =>  _getFund()

export const getHead = (id) => _getHead(id)

export const getListName = (keywords) => _getListName(keywords)

export const existsCustomField = (_id,value) => _existsCustomField(_id,value)

export const  getOneEmployeeDetails = (id) =>({
    "type": ACTIONS.PROFILE_ONE_EMPLOYEE_DETAILS_DATA,
    "id":id
})

export const getEditEmployeeDetails = (id) => ({
    "type": ACTIONS.PROFILE_EMPLOYEE_DETAILS,
    "id":id
})

export const searchUser = (searchData) =>({
        "type":"PROFILE_SEARCH_USER",
        "searchData": searchData
})

export const getEmployeeStatus = (condition, pagination) => _getEmployeeStatus(condition, pagination)

export const getEntrySave = (custom_field, insurance, taxes, fund,salary,salaries) =>  _getEntrySave(custom_field, insurance, taxes, fund,salary,salaries)

export const getEntryUpdate = (id,custom_field, insurance, taxes, fund,salary,salaries) =>  _getEntryUpdate(id,custom_field, insurance, taxes, fund,salary,salaries)

export const setErrorGetFieldsGroup = (message) => ({
    "type": ACTIONS.PROFILE_FIELDS_GROUP_ERROR,
    message
})

export const changeMemberData = (memberData) =>({
    "type": ACTIONS.PROFILE_CHANGE_MEMBER_DATA,
    "memberData":memberData,
})

export const changeFileData = (fileList,namespace) =>({
    "type": ACTIONS.PROFILE_CHANGE_FILE_OF_MEMBER_DATA,
    "fileList": fileList,
    "namespace": namespace
})


export const changeRemunerationData = (remuneration) =>({
    "type": ACTIONS.PROFILE_CHANGE_REMUNERATION_DATA,
    "remuneration":remuneration
})


export const emptyMemberData = () =>({
    "type": ACTIONS.PROFILE_EMPTY_MEMBER_DATA
})

export const judge = (status) =>({
    "type": ACTIONS.PROFILE_JUDGE_EDIT_DATA,
    "status":status
   
})

export const togglePage =  (status) => ({

    "type": ACTIONS.PROFILE_TOGGLEPAGE,
    "displayAllFields":status
})





