# coding=UTF-8

""" DingDing Router """
import json
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from remuneration.service.taxes import Taxes as Taxes_Service
TAXES = Blueprint('taxes', __name__)
CORS(TAXES)
cross_origin(TAXES)


@TAXES.route('/list', methods=['GET', 'POST'])
def list():
    """
        List Taxes
        params 
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    taxes_service = Taxes_Service(MONGO)
    data, code, message = taxes_service.list_all()
    return __result(data, code, message)

@TAXES.route('/add', methods=['GET', 'POST'])
def add():
    """
        Add Taxes
        params name, threshold, levels
        return {"data":{ObjectId('xxx')}
                , "status":{"code":0, "message":"success"}}

        code 1:Title cannot be empty.
    """
    name = request.form['name']
    threshold = request.form['threshold']
    levels = json.loads(request.form['levels'])

    taxes_service = Taxes_Service(MONGO)
    data, code, message = taxes_service.add(name, threshold, levels)
    return __result(data, code, message)

@TAXES.route('/update', methods=['GET', 'POST'])
def update():
    """
        Update Taxes
        params _id, name, threshold, levels
        return {"data":{ObjectId('xxx')}
                , "status":{"code":0, "message":"success"}}

        code 1:Title cannot be empty.
    """
    _id = request.form['_id']
    name = request.form['name']
    threshold = request.form['threshold']
    levels = json.loads(request.form['levels'])

    taxes_service = Taxes_Service(MONGO)
    data, code, message = taxes_service.update(_id, name, threshold, levels)
    return __result(data, code, message)

@TAXES.route('/remove', methods=['GET', 'POST'])
def remove():
    """
        Remove Taxes
        params _id
        return {"data":{}
                , "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']

    taxes_service = Taxes_Service(MONGO)
    data, code, message = taxes_service.remove(_id)
    return __result(data, code, message)
