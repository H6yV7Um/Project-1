import keyMirror from 'keymirror'
import {save as _save,
        remove as _remove,
        getList as _getList,
        getListOthers as _getListOthers,
        updateLate as _updateLate,
        updateAbsenteeism as _updateAbsenteeism,
        updateOvertime as _updateOvertime,
        updateDaysOff as _updateDaysOff,
        updateBusinessTrip as _updateBusinessTrip,
        updateAnnualVacation as _updateAnnualVacation
} from '../middlewares/RuleMiddleware.js'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    "ATTENDANCE_RULE": "ATTENDANCE_RULE",
    "ATTENDANCE_RULE_ERROR": "ATTENDANCE_RULE_ERROR",
    "ATTENDANCE_RULE_LOADING": "ATTENDANCE_RULE_LOADING",

    "ATTENDANCE_RULE_REMOVE": "ATTENDANCE_RULE_REMOVE",
    "ATTENDANCE_RULE_REMOVE_ERROR": "ATTENDANCE_RULE_REMOVE_ERROR",
    "ATTENDANCE_RULE_REMOVE_LOADING": "ATTENDANCE_RULE_REMOVE_LOADING",

    "ATTENDANCE_RULE_SAVE": "ATTENDANCE_RULE_SAVE",
    "ATTENDANCE_RULE_SAVE_ERROR": "ATTENDANCE_RULE_SAVE_ERROR",
    "ATTENDANCE_RULE_SAVE_LOADING": "ATTENDANCE_RULE_SAVE_LOADING",
    "ATTENDANCE_RULE_SWITCH": "ATTENDANCE_RULE_SWITCH",

    "ATTENDANCE_RULE_CURRENTRECORD": "ATTENDANCE_RULE_CURRENTRECORD",
    "ATTENDANCE_RULE_CURRENT_OTHERRECORD": "ATTENDANCE_RULE_CURRENT_OTHERRECORD",

    "ATTENDANCE_RULE_OTHERS": "ATTENDANCE_RULE_OTHERS",
    "ATTENDANCE_RULE_OTHERS_LOADING": "ATTENDANCE_RULE_OTHERS_LOADING",

    "ATTENDANCE_RULE_UPDATE_LATE": "ATTENDANCE_RULE_UPDATE_LATE",
    "ATTENDANCE_RULE_UPDATE_LATE_LOADING": "ATTENDANCE_RULE_UPDATE_LATE_LOADING",

    "ATTENDANCE_RULE_UPDATE_ABSENTEEISM": "ATTENDANCE_RULE_UPDATE_ABSENTEEISM",
    "ATTENDANCE_RULE_UPDATE_ABSENTEEISM_LOADING": "ATTENDANCE_RULE_UPDATE_ABSENTEEISM_LOADING",

    "ATTENDANCE_RULE_UPDATE_OVERTIME": "ATTENDANCE_RULE_UPDATE_OVERTIME",
    "ATTENDANCE_RULE_UPDATE_OVERTIME_LOADING": "ATTENDANCE_RULE_UPDATE_OVERTIME_LOADING",

    "ATTENDANCE_RULE_UPDATE_DAYSOFF": "ATTENDANCE_RULE_UPDATE_DAYSOFF",
    "ATTENDANCE_RULE_UPDATE_DAYSOFF_LOADING": "ATTENDANCE_RULE_UPDATE_DAYSOFF_LOADING",

    "ATTENDANCE_RULE_UPDATE_BUSINESSTRIP": "ATTENDANCE_RULE_UPDATE_BUSINESSTRIP",
    "ATTENDANCE_RULE_UPDATE_BUSINESSTRIP_LOADING": "ATTENDANCE_RULE_UPDATE_BUSINESSTRIP_LOADING",

    "ATTENDANCE_RULE_UPDATE_ANNUALVACATION": "ATTENDANCE_RULE_UPDATE_ANNUALVACATION",
    "ATTENDANCE_RULE_UPDATE_ANNUALVACATION_LOADING": "ATTENDANCE_RULE_UPDATE_ANNUALVACATION_LOADING"
})

// ------------------------------------
// Actions
// ------------------------------------
export const switchStatus = (status) => ({
    "type": "ATTENDANCE_RULE_SWITCH",
    status
})
export const switchTabStatus = (status) => ({
    "type": "ATTENDANCE_RULE_SWITCH_TAB",
    status
})

export const getList = () => _getList()
export const getListOthers = () => _getListOthers()
export const save = (_id, name, fee, deduct_subsidy, deduct_type, remark) => _save(_id, name, fee, deduct_subsidy, deduct_type, remark)

export const updateLate = (fee, free_times, remark) => _updateLate(fee, free_times, remark)
export const updateAbsenteeism = (fee, free_hours, remark) => _updateAbsenteeism(fee, free_hours, remark)
export const updateOvertime = (weekday_fee, weekend_fee, weekday_minimum_pay_hours, weekend_minimum_pay_hours, weekday_multiple_payment, weekend_multiple_payment, remark) => _updateOvertime(weekday_fee, weekend_fee, weekday_minimum_pay_hours, weekend_minimum_pay_hours, weekday_multiple_payment, weekend_multiple_payment, remark)
export const updateDaysOff = (fee, remark) => _updateDaysOff(fee, remark)
export const updateBusinessTrip = (fee, remark) => _updateBusinessTrip(fee, remark)
export const updateAnnualVacation = (days, clear_date, remark) => _updateAnnualVacation(days, clear_date, remark)

export const remove = (_id) => _remove(_id)
export const setCurrentRecord = (currentRecord) => ({
    "type": "ATTENDANCE_RULE_CURRENTRECORD",
    currentRecord
})
export const setCurrentOtherRecord = (currentOtherRecord) => ({
    "type": "ATTENDANCE_RULE_CURRENT_OTHERRECORD",
    currentOtherRecord
})