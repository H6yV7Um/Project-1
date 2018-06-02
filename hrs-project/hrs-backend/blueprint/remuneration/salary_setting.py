# coding=UTF-8

""" DingDing Router """
import json
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from remuneration.service.taxes import Taxes as Taxes_Service
from remuneration.service.insurance import Insurance as Insurance_Service
from remuneration.service.salary import Salary as Salary_Service
from remuneration.service.salary_setting import SalarySetting as SalarySetting_Service
from remuneration.service.fund import Fund as Fund_Service

SALARY_SETTING = Blueprint('salary_setting', __name__)
CORS(SALARY_SETTING)
cross_origin(SALARY_SETTING)


@SALARY_SETTING.route('/find', methods=['GET', 'POST'])
def find():
    """
        find salary setting
        params 
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    salary_setting_service = SalarySetting_Service(MONGO)
    data, code, message = salary_setting_service.find()
    return __result(data, code, message)

@SALARY_SETTING.route('/update', methods=['GET', 'POST'])
def update():
    """
        Update Salary Setting
        params cycle
        return {"data":{ObjectId('xxx')}
                , "status":{"code":0, "message":"success"}}
    """
    cycle = request.form['cycle']
    salary_setting_service = SalarySetting_Service(MONGO)
    data, code, message = salary_setting_service.update(cycle)
    return __result(data, code, message)
