# coding=UTF-8

""" DingDing Router """
import json
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from remuneration.service.fund import Fund as Fund_Service

FUND = Blueprint('fund', __name__)
CORS(FUND)
cross_origin(FUND)


@FUND.route('/list', methods=['GET', 'POST'])
def list():
    """
        List Fund
        params 
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    Fund_service = Fund_Service(MONGO)
    data, code, message = Fund_service.list_all()
    return __result(data, code, message)

@FUND.route('/add', methods=['GET', 'POST'])
def add():
    """
        Add Fund
        params name, Funds, subsidy
        return {"data":{ObjectId('xxx')}
                , "status":{"code":0, "message":"success"}}

        code 1:Title cannot be empty.
    """
    name = request.form['name']
    company_rate = request.form['company_rate']
    personal_rate = request.form['personal_rate']
    lower = request.form['lower']
    higher = request.form['higher']

    fund_service = Fund_Service(MONGO)
    data, code, message = fund_service.add(name, company_rate, personal_rate, lower, higher)
    return __result(data, code, message)

@FUND.route('/update', methods=['GET', 'POST'])
def update():
    """
        Update Fund
        params _id, name, Funds, subsidy
        return {"data":{ObjectId('xxx')}
                , "status":{"code":0, "message":"success"}}

        code 1:Title cannot be empty.
    """
    _id = request.form['_id']
    name = request.form['name']
    company_rate = request.form['company_rate']
    personal_rate = request.form['personal_rate']
    lower = request.form['lower']
    higher = request.form['higher']
    fund_service = Fund_Service(MONGO)
    data, code, message = fund_service.update(_id, name, company_rate, personal_rate, lower, higher)
    return __result(data, code, message)

@FUND.route('/remove', methods=['GET', 'POST'])
def remove():
    """
        Remove Fund
        params _id
        return {"data":{}
                , "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']

    fund_service = Fund_Service(MONGO)
    data, code, message = fund_service.remove(_id)
    return __result(data, code, message)
