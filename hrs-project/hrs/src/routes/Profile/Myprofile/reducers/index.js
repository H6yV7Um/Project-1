import {ACTIONS} from '../actions/MyprofileAction'
import {SERVER} from 'config'
const initialState = {
    "existsCustomFieldLoading": false,
    "existsCustomFieldError": '',

    "memberData":{},

    "remuneration":{salaries:[]},

    "fileOfmemberData":{},

    "saveCompletedLoading": false,

    "getFieldsGroupLoading": false,
    "fieldsGroup": [],

    "getProfileTaxesLoading": false,
    "getProfileTaxesData":[],

    "getSocialSecurityLoading": false,
    "getSocialSecurityData":[],

    "getSalaryLoading": false,
    "getSalaryData":[],

    "getFundLoading": false,
    "getFundData":[],
}

/**
 * Reducer
 */

const reducer = (state = initialState, action) => {
    switch (action.type) {
        /***********************************************/
        case ACTIONS.PROFILE_MYPROFILE_EXISTS_CUSTOM_FILED_LOADING:
            return {
                ...state,
                "existsCustomFieldLoading": true
            }
        case ACTIONS.PROFILE_MYPROFILE_EXISTS_CUSTOM_FILED:
            return {
                ...state,
                "existsCustomFieldError": '',
                "existsCustomFieldLoading": false,
            }
         /***********************************************/
        case ACTIONS.PROFILE_SAVE_COMPLETED_LOADING:
            return {
                ...state,
                "saveCompletedLoading": true
            }
        case ACTIONS.PROFILE_SAVE_COMPLETED:
            return {
                ...state,
                "saveCompletedLoading": false,
            }
        /**************************************************/
        case ACTIONS.PROFILE_MYPROFILE_FIELDS_GROUP_LOADING:
            return {
                ...state,
                "getFieldsGroupLoading": true
            }
        case ACTIONS.PROFILE_MYPROFILE_FIELDS_GROUP:
            return {
                ...state,
                "getFieldsGroupError": '',
                "getFieldsGroupLoading": false,
                "fieldsGroup": action.groupData
            }
       /************************************************/
        case ACTIONS.PROFILE_MYPROFILE_CHANGE_MEMBER_DATA:

            return {
                ...state,
                memberData: action.memberData,          
            }
        /************************************************/
        case ACTIONS.PROFILE_MYPROFILE_CHANGE_FILE_OF_MEMBER_DATA:
            let fileOfmemberData
            if(!state.fileOfmemberData)
            {
                fileOfmemberData = {}
            }
            else {
                fileOfmemberData = state.fileOfmemberData
            }
            let currentFileList =   changeFileList(
                                        fileOfmemberData,
                                        state.memberData,
                                        action.fileList,
                                        action.namespace
                                    )
            return {
                ...state,
                "fileOfmemberData": currentFileList.fileOfmemberData,
                "memberData": currentFileList.memberData
            }
         /************************************************/
        case ACTIONS.PROFILE_MYPROFILE_FORMATUSER:
           let current = format(
                action.user,
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
            }
         /**************************************************/
        case ACTIONS.PROFILE_MYPROFILE_TAXES_LOADING:
            return {
                ...state,
                "getProfileTaxesLoading": true
            }
        case ACTIONS.PROFILE_MYPROFILE_TAXES:
            return {
                ...state,
                "getProfileTaxesLoading": false,
                "getProfileTaxesData": action.taxesData
            }
        /**************************************************/
        case ACTIONS.PROFILE_MYPROFILE_SOCIAL_SECURITY_LOADING:
            return {
                ...state,
                "getSocialSecurityLoading": true
            }
        case ACTIONS.PROFILE_MYPROFILE_SOCIAL_SECURITY:
            return {
                ...state,
                "getSocialSecurityLoading": false,
                "getSocialSecurityData": action.socialSecurityData
            }
        /**************************************************/
        case ACTIONS.PROFILE_MYPROFILE_SALARY_LOADING:
            return {
                ...state,
                "getSalaryLoading": true
            }
        case ACTIONS.PROFILE_MYPROFILE_SALARY:
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
                "getSalaryLoading": false,
                "getSalaryData": action.salaryData,
                remuneration
            }
        /**************************************************/
        case ACTIONS.PROFILE_MYPROFILE_FUND_LOADING:
            return {
                ...state,
                "getFundLoading": true
            }
        case ACTIONS.PROFILE_MYPROFILE_FUND:
            return {
                ...state,
                "getFundLoading": false,
                "getFundData": action.fundData
            }
        /************************************************/
        case ACTIONS.PROFILE_MYPROFILE_CHANGE_REMUNERATION_DATA:
            return {
                ...state,
                remuneration: action.remuneration,
            }
    }
    return {...state}
}
const changeFileList = (fileOfmemberData,memberData,fileList,namespace) =>{
    let current = []
    let currentAll = []
    for(let val of fileList)
    {
        if(val.status)
        {
            if(val.status == 'done')
            {
                current.push(val.response.data[0].$oid)
                let url = SERVER+"organization/file/download/"+val.response.data[0].$oid
                val.url = url
                val.uid = val.response.data[0].$oid
                val.name = val.name
                currentAll.push(val)
            }
            else
            {
               currentAll.push(val) 
            }
        }
        else
        {
            current.push(val.uid)
            currentAll.push(val)
        }
    }
    let name = namespace
    memberData[name] = current
    fileOfmemberData[name] = currentAll
    return {"memberData": memberData,"fileOfmemberData":fileOfmemberData}
}
const  format= (user,fieldsGroup,getSocialSecurityData,getFundData,getProfileTaxesData,getSalaryData,salariesData) =>
{
    let current = {}
    let memberDataAll = formatEditMemberData(fieldsGroup,user)
    let remuneration = formatEditRemuneration(getSocialSecurityData,getFundData,getProfileTaxesData,getSalaryData,salariesData,user)
    current["memberData"] = memberDataAll.memberData
    current["fileOfmemberData"] = memberDataAll.fileOfmemberData
    current["remuneration"] = remuneration
    return current
}
const formatEditMemberData  = (fieldsGroup,user) => {
    let memberData={}
    let fileOfmemberData = {}
    for(let val of fieldsGroup)
    {
        for(let field of val.fields)
        {    
            if(field.type == "file")
            {
                let current = []
                for(let val of user[field.namespace])
                {   
                    current.push(val._id.$oid)
                }
                memberData[field.namespace] = current
                fileOfmemberData[field.namespace] = []
                for(let val of user[field.namespace])
                {
                    fileOfmemberData[field.namespace].push({
                        "uid": val._id.$oid,
                        "url": SERVER+"organization/file/download/" + val._id.$oid,
                        "name": val.filename
                    }) 
                }
            }
            else{
                memberData[field.namespace] = user[field.namespace]                    
            }
        }
    }
    return {memberData:memberData,fileOfmemberData:fileOfmemberData}
}
const  formatEditRemuneration = (getSocialSecurityData,getFundData,getProfileTaxesData,getSalaryData,salariesData,user) => {
    let remuneration ={}
    remuneration.insurance=user.insurance.$oid
    remuneration.fund=user.fund.$oid
    remuneration.taxes=user.taxes.$oid
    remuneration.salary=user.salary.$oid
    remuneration.salaries =[]
    for(let salary of user.salaries)
    {
        remuneration.salaries.push(salary)
    }
    return remuneration
}
export default reducer







