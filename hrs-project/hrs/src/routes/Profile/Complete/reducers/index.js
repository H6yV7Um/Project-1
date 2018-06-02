import {ACTIONS} from '../actions/CompleteAction'
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
        case ACTIONS.PROFILE_COMPLETE_EXISTS_CUSTOM_FILED_LOADING:
            return {
                ...state,
                "existsCustomFieldLoading": true
            }
        case ACTIONS.PROFILE_COMPLETE_EXISTS_CUSTOM_FILED:
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
        case ACTIONS.PROFILE_COMPLETE_FIELDS_GROUP_LOADING:
            return {
                ...state,
                "getFieldsGroupLoading": true
            }
        case ACTIONS.PROFILE_COMPLETE_FIELDS_GROUP:
            return {
                ...state,
                "getFieldsGroupError": '',
                "getFieldsGroupLoading": false,
                "fieldsGroup": action.groupData
            }
       /************************************************/
        case ACTIONS.PROFILE_COMPLETE_CHANGE_MEMBER_DATA:
            return {
                ...state,
                memberData: action.memberData,          
            }
        /************************************************/
        case ACTIONS.PROFILE_COMPLETE_CHANGE_FILE_OF_MEMBER_DATA:
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
        case ACTIONS.PROFILE_COMPLETE_FORMATUSER:
           let current = format(
                action.user,
                state.fieldsGroup,
            )
            return {
                ...state,
                memberData: current.memberData,
                fileOfmemberData: current.fileOfmemberData,
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
const  format= (user,fieldsGroup) =>
{
        let current = {}
        let memberDataAll = formatEditMemberData(fieldsGroup,user)
        current["memberData"] = memberDataAll.memberData
        current["fileOfmemberData"] = memberDataAll.fileOfmemberData
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

export default reducer







