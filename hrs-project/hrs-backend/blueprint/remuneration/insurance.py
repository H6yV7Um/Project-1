# coding=UTF-8

""" DingDing Router """
import json
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from remuneration.service.insurance import Insurance as Insurance_Service
INSURANCE = Blueprint('insurance', __name__)
CORS(INSURANCE)
cross_origin(INSURANCE)

@INSURANCE.route('/list', methods=['GET', 'POST'])
def list():
    """
        List Insurance
        params 
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    insurance_service = Insurance_Service(MONGO)
    data, code, message = insurance_service.list_all()
    return __result(data, code, message)

@INSURANCE.route('/add', methods=['GET', 'POST'])
def add():
    """
        Add insurance
        params name, pension, medical, serious_illness,
               unemployment, occupational_injury, birth
        return {"data":{ObjectId('xxx')}
                , "status":{"code":0, "message":"success"}}

        code 1:Title cannot be empty.
    """
    name = request.form['name']
    pension = json.loads(request.form['pension'])
    medical = json.loads(request.form['medical'])
    serious_illness = json.loads(request.form['serious_illness'])
    unemployment = json.loads(request.form['unemployment'])
    occupational_injury = json.loads(request.form['occupational_injury'])
    birth = json.loads(request.form['birth'])

    insurance_service = Insurance_Service(MONGO)
    data, code, message = insurance_service.add(name, pension, medical, serious_illness,
                                                unemployment, occupational_injury, birth)
    return __result(data, code, message)

@INSURANCE.route('/update', methods=['GET', 'POST'])
def update():
    """
        Update insurance
        params _id, name, pension, medical, serious_illness,
               unemployment, occupational_injury, birth
        return {"data":{ObjectId('xxx')}
                , "status":{"code":0, "message":"success"}}

        code 1:Title cannot be empty.
    """
    _id = request.form['_id']
    name = request.form['name']
    pension = json.loads(request.form['pension'])
    medical = json.loads(request.form['medical'])
    serious_illness = json.loads(request.form['serious_illness'])
    unemployment = json.loads(request.form['unemployment'])
    occupational_injury = json.loads(request.form['occupational_injury'])
    birth = json.loads(request.form['birth'])

    insurance_service = Insurance_Service(MONGO)
    data, code, message = insurance_service.update(_id, name, pension, medical, serious_illness,
                                                   unemployment, occupational_injury, birth)
    return __result(data, code, message)

@INSURANCE.route('/remove', methods=['GET', 'POST'])
def remove():
    """
        Remove insurance
        params _id
        return {"data":{}
                , "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']

    insurance_service = Insurance_Service(MONGO)
    data, code, message = insurance_service.remove(_id)
    return __result(data, code, message)
