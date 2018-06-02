import keyMirror from 'keymirror'
import {
        existsCustomField as _existsCustomField,
        getFieldsGroup as _getFieldsGroup,
        saveCompleted as _saveCompleted,
       } from '../middlewares/CompleteMiddleware.js'	
export const ACTIONS = keyMirror({
    "PROFILE_COMPLETE_EXISTS_CUSTOM_FILED_LOADING":"PROFILE_COMPLETE_EXISTS_CUSTOM_FILED_LOADING",
    "PROFILE_COMPLETE_EXISTS_CUSTOM_FILED_ERROR":"PROFILE_COMPLETE_EXISTS_CUSTOM_FILED_ERROR",
    "PROFILE_COMPLETE_EXISTS_CUSTOM_FILED":"PROFILE_COMPLETE_EXISTS_CUSTOM_FILED",

    "PROFILE_COMPLETE_CHANGE_MEMBER_DATA": "PROFILE_COMPLETE_CHANGE_MEMBER_DATA",

    "PROFILE_COMPLETE_CHANGE_FILE_OF_MEMBER_DATA": "PROFILE_COMPLETE_CHANGE_FILE_OF_MEMBER_DATA",

    "PROFILE_COMPLETE_SAVE_COMPLETED_LOADING": "PROFILE_COMPLETE_SAVE_COMPLETED_LOADING",
    "PROFILE_COMPLETE_SAVE_COMPLETED_ERROR":"PROFILE_COMPLETE_SAVE_COMPLETED_ERROR",
    "PROFILE_COMPLETE_SAVE_COMPLETED":"PROFILE_COMPLETE_SAVE_COMPLETED",

    "PROFILE_COMPLETE_FIELDS_GROUP_LOADING": "PROFILE_COMPLETE_FIELDS_GROUP_LOADING",
    "PROFILE_COMPLETE_FIELDS_GROUP_ERROR": "PROFILE_COMPLETE_FIELDS_GROUP_ERROR",
    "PROFILE_COMPLETE_FIELDS_GROUP": "PROFILE_COMPLETE_FIELDS_GROUP",

    "PROFILE_COMPLETE_FORMATUSER": "PROFILE_COMPLETE_FORMATUSER",
})
export const saveCompleted = (custom_field) => _saveCompleted(custom_field)

export const existsCustomField = (_id,value) => _existsCustomField(_id,value)

export const changeMemberData = (memberData) =>({
    "type": ACTIONS.PROFILE_COMPLETE_CHANGE_MEMBER_DATA,
    "memberData": memberData,
})

export const changeFileData = (fileList,namespace) =>({
    "type": ACTIONS.PROFILE_COMPLETE_CHANGE_FILE_OF_MEMBER_DATA,
    "fileList": fileList,
    "namespace": namespace
})

export const getFieldsGroup = () => _getFieldsGroup() 

export const formatUser = (user) =>({
    "type": ACTIONS.PROFILE_COMPLETE_FORMATUSER,
    "user": user
})



