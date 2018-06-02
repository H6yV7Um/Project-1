# coding=UTF-8

""" Workflow Router """
import json
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from workflow.service.solution import Solution as Solution_Service

SOLUTION = Blueprint('solution', __name__)
CORS(SOLUTION)
cross_origin(SOLUTION)


@SOLUTION.route('/list', methods=['GET', 'POST'])
def list():
    """
        List Workflow Solution
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    solution_service = Solution_Service(MONGO)
    data, code, message = solution_service.list_all()
    return __result(data, code, message)

@SOLUTION.route('/add', methods=['GET', 'POST'])
def add():
    """
        add workflow
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    name = request.form['name']
    fields = json.loads(request.form['fields'])
    flow = json.loads(request.form['flow'])
    copyto = json.loads(request.form['copyto'])
    remark = request.form['remark']
    
    solution_service = Solution_Service(MONGO)
    data, code, message = solution_service.add(name, copyto, remark, fields, flow)
    return __result(data, code, message)

@SOLUTION.route('/update', methods=['GET', 'POST'])
def update():
    """
        update workflow
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']
    name = request.form['name']
    fields = json.loads(request.form['fields'])
    flow = json.loads(request.form['flow'])
    copyto = json.loads(request.form['copyto'])
    remark = request.form['remark']
    solution_service = Solution_Service(MONGO)
    data, code, message = solution_service.update(_id, name, copyto, remark, fields, flow)
    return __result(data, code, message)


@SOLUTION.route('/remove', methods=['GET', 'POST'])
def remove():
    """
        remove workflow
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']
    
    solution_service = Solution_Service(MONGO)
    data, code, message = solution_service.remove(_id)
    return __result(data, code, message)
