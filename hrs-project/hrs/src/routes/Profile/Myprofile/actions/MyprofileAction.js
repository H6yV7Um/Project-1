import keyMirror from 'keymirror'
import {
        existsCustomField as _existsCustomField,
        getFieldsGroup as _getFieldsGroup,
        saveCompleted as _saveCompleted,
        getFund as _getFund,
        getSalary as _getSalary,
        getSocialSecurity as _getSocialSecurity,
        getProfileTaxes as _getProfileTaxes
       } from '../middlewares/MyprofileMiddleware.js'	
// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({

    "PROFILE_MYPROFILE_EXISTS_CUSTOM_FILED_LOADING":"PROFILE_MYPROFILE_EXISTS_CUSTOM_FILED_LOADING",
    "PROFILE_MYPROFILE_EXISTS_CUSTOM_FILED_ERROR":"PROFILE_MYPROFILE_EXISTS_CUSTOM_FILED_ERROR",
    "PROFILE_MYPROFILE_EXISTS_CUSTOM_FILED":"PROFILE_MYPROFILE_EXISTS_CUSTOM_FILED",

    "PROFILE_MYPROFILE_CHANGE_MEMBER_DATA": "PROFILE_MYPROFILE_CHANGE_MEMBER_DATA",

    "PROFILE_MYPROFILE_CHANGE_FILE_OF_MEMBER_DATA": "PROFILE_MYPROFILE_CHANGE_FILE_OF_MEMBER_DATA",

    "PROFILE_MYPROFILE_SAVE_COMPLETED_LOADING": "PROFILE_MYPROFILE_SAVE_COMPLETED_LOADING",
    "PROFILE_MYPROFILE_SAVE_COMPLETED_ERROR":"PROFILE_MYPROFILE_SAVE_COMPLETED_ERROR",
    "PROFILE_MYPROFILE_SAVE_COMPLETED":"PROFILE_MYPROFILE_SAVE_COMPLETED",

    "PROFILE_MYPROFILE_FIELDS_GROUP_LOADING": "PROFILE_MYPROFILE_FIELDS_GROUP_LOADING",
    "PROFILE_MYPROFILE_FIELDS_GROUP_ERROR": "PROFILE_MYPROFILE_FIELDS_GROUP_ERROR",
    "PROFILE_MYPROFILE_FIELDS_GROUP": "PROFILE_MYPROFILE_FIELDS_GROUP",

    "PROFILE_MYPROFILE_FORMATUSER": "PROFILE_MYPROFILE_FORMATUSER",


    "PROFILE_MYPROFILE_TAXES_LOADING": "PROFILE_MYPROFILE_TAXES_LOADING",
    "PROFILE_MYPROFILE_TAXES_ERROR": "PROFILE_MYPROFILE_TAXES_ERROR",
    "PROFILE_MYPROFILE_TAXES": "PROFILE_MYPROFILE_TAXES",

    "PROFILE_MYPROFILE_SOCIAL_SECURITY_LOADING": "PROFILE_MYPROFILE_SOCIAL_SECURITY_LOADING",
    "PROFILE_MYPROFILE_SOCIAL_SECURITY_ERROR": "PROFILE_MYPROFILE_SOCIAL_SECURITY_ERROR",
    "PROFILE_MYPROFILE_SOCIAL_SECURITY": "PROFILE_MYPROFILE_SOCIAL_SECURITY",

    "PROFILE_MYPROFILE_SALARY_LOADING": "PROFILE_MYPROFILE_SALARY_LOADING",
    "PROFILE_MYPROFILE_SALARY_ERROR": "PROFILE_MYPROFILE_SALARY_ERROR",
    "PROFILE_MYPROFILE_SALARY": "PROFILE_MYPROFILE_SALARY",

    "PROFILE_MYPROFILE_FUND_LOADING": "PROFILE_MYPROFILE_FUND_LOADING",
    "PROFILE_MYPROFILE_FUND_ERROR": "PROFILE_MYPROFILE_FUND_ERROR",
    "PROFILE_MYPROFILE_FUND": "PROFILE_MYPROFILE_FUND",

    "PROFILE_MYPROFILE_CHANGE_REMUNERATION_DATA": "PROFILE_MYPROFILE_CHANGE_REMUNERATION_DATA"

})
export const saveCompleted = (custom_field) => _saveCompleted(custom_field)

export const existsCustomField =(_id,value) => _existsCustomField(_id,value)

export const changeMemberData = (memberData) =>({
    "type": ACTIONS.PROFILE_MYPROFILE_CHANGE_MEMBER_DATA,
    "memberData":memberData,
})

export const changeFileData = (fileList,namespace) =>({
    "type": ACTIONS.PROFILE_MYPROFILE_CHANGE_FILE_OF_MEMBER_DATA,
    "fileList": fileList,
    "namespace": namespace
})

export const getFieldsGroup = () => _getFieldsGroup() 

export const formatUser = (user) =>({
    "type": ACTIONS.PROFILE_MYPROFILE_FORMATUSER,
    "user": user
})

export const getProfileTaxes = () =>  _getProfileTaxes()

export const getSocialSecurity = () =>  _getSocialSecurity()

export const getSalary = () =>  _getSalary()

export const getFund = () =>  _getFund()

export const changeRemunerationData = (remuneration) =>({
    "type": ACTIONS.PROFILE_MYPROFILE_CHANGE_REMUNERATION_DATA,
    "remuneration":remuneration
})

