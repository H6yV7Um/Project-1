# coding=UTF-8

""" Attendance Router """
import json
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from attendance.service.rule import Rule as Rule_Service

RULE = Blueprint('rule', __name__)
CORS(RULE)
cross_origin(RULE)

@RULE.route('/update_late', methods=['GET', 'POST'])
def update_late():
    """
        update late rule
        param fee, free_times, remark
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    rule_service = Rule_Service(MONGO)
    fee = request.form['fee']
    free_times = request.form['free_times']
    remark = request.form['remark']
    data, code, message = rule_service.update_late(fee, free_times, remark)
    return __result(data, code, message)

@RULE.route('/update_absenteeism', methods=['GET', 'POST'])
def update_absenteeism():
    """
        update absenteeism
        param fee, free_hours, remark
        return {
                    "data":
                    [
                      {}
                    ], "status":{"code":0, "message":"success"}
               }
    """
    rule_service = Rule_Service(MONGO)
    fee = request.form['fee']
    free_hours = request.form['free_hours']
    remark = request.form['remark']

    data, code, message = rule_service.update_absenteeism(fee, free_hours, remark)
    return __result(data, code, message)

@RULE.route('/update_overtime', methods=['GET', 'POST'])
def update_overtime():
    """
        update overtime
        params weekday_fee, weekend_fee,
               weekday_minimum_pay_hours, weekend_minimum_pay_hours,
               weekday_multiple_payment, weekend_multiple_payment, remark
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    rule_service = Rule_Service(MONGO)
    weekday_fee = request.form['weekday_fee']
    weekend_fee = request.form['weekend_fee']
    weekday_minimum_pay_hours = request.form['weekday_minimum_pay_hours']
    weekend_minimum_pay_hours = request.form['weekend_minimum_pay_hours']
    weekday_multiple_payment = request.form['weekday_multiple_payment']
    weekend_multiple_payment = request.form['weekend_multiple_payment']
    remark = request.form['remark']

    data, code, message = rule_service.update_overtime(weekday_fee, weekend_fee,
                                                       weekday_minimum_pay_hours,
                                                       weekend_minimum_pay_hours,
                                                       weekday_multiple_payment,
                                                       weekend_multiple_payment,
                                                       remark)
    return __result(data, code, message)

@RULE.route('/update_days_off', methods=['GET', 'POST'])
def update_days_off():
    """
        update days off
        params fee, remark
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    fee = request.form['fee']
    remark = request.form['remark']
    rule_service = Rule_Service(MONGO)
    data, code, message = rule_service.update_days_off(fee, remark)
    return __result(data, code, message)

@RULE.route('/update_business_trip', methods=['GET', 'POST'])
def update_business_trip():
    """
        update business trip
        params fee, remark
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    fee = request.form['fee']
    remark = request.form['remark']
    rule_service = Rule_Service(MONGO)
    data, code, message = rule_service.update_business_trip(fee, remark)
    return __result(data, code, message)

@RULE.route('/update_annual_vacation', methods=['GET', 'POST'])
def update_annual_vacation():
    """
        update annual vacation
        params days, clear_date, remark
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    days = json.loads(request.form['days'])
    clear_date = request.form['clear_date']
    remark = request.form['remark']
    rule_service = Rule_Service(MONGO)
    data, code, message = rule_service.update_annual_vacation(days, clear_date, remark)
    return __result(data, code, message)

@RULE.route('/add_leave', methods=['GET', 'POST'])
def add_leave():
    """
        add leave rule
        params name, fee, deduct_subsidy, deduct_type, remark
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    name = request.form['name']
    fee = request.form['fee']
    deduct_subsidy = request.form['deduct_subsidy']
    deduct_type = request.form['deduct_type']
    remark = request.form['remark']
    rule_service = Rule_Service(MONGO)
    data, code, message = rule_service.add_leave(name, fee,
                                                 deduct_subsidy, deduct_type,
                                                 remark)
    return __result(data, code, message)

@RULE.route('/remove', methods=['GET', 'POST'])
def remove():
    """
        remove rule
        params _id
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']
    rule_service = Rule_Service(MONGO)
    data, code, message = rule_service.remove(_id)
    return __result(data, code, message)

@RULE.route('/find', methods=['GET', 'POST'])
def find():
    """
        find rule
        params _id
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']
    rule_service = Rule_Service(MONGO)
    data, code, message = rule_service.find(_id)
    return __result(data, code, message)

@RULE.route('/list', methods=['GET', 'POST'])
def list():
    """
        list rules
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    rule_service = Rule_Service(MONGO)
    data, code, message = rule_service.list()
    return __result(data, code, message)

@RULE.route('/list_others', methods=['GET', 'POST'])
def list_others():
    """
        list other rules
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    rule_service = Rule_Service(MONGO)
    data, code, message = rule_service.list_others()
    return __result(data, code, message)

@RULE.route('/update_leave', methods=['GET', 'POST'])
def update_leave():
    """
        update leave
        params _id, name, fee, deduct_subsidy, deduct_type, remark
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']
    name = request.form['name']
    fee = request.form['fee']
    deduct_subsidy = request.form['deduct_subsidy']
    deduct_type = request.form['deduct_type']
    remark = request.form['remark']

    rule_service = Rule_Service(MONGO)
    data, code, message = rule_service.update_leave(_id, name, fee,
                                                    deduct_subsidy, deduct_type, remark)
    return __result(data, code, message)
