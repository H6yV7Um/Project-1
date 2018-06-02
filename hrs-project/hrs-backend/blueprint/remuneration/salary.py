# coding=UTF-8

""" DingDing Router """
import json
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from remuneration.service.salary import Salary as Salary_Service


SALARY = Blueprint('salary', __name__)
CORS(SALARY)
cross_origin(SALARY)



@SALARY.route('/list', methods=['GET', 'POST'])
def list():
    """
        List salary
        params 
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    salary_service = Salary_Service(MONGO)
    data, code, message = salary_service.list_all()
    return __result(data, code, message)

@SALARY.route('/add', methods=['GET', 'POST'])
def add():
    """
        Add salary
        params name, salaries, subsidy
        return {"data":{ObjectId('xxx')}
                , "status":{"code":0, "message":"success"}}

        code 1:Title cannot be empty.
    """
    name = request.form['name']
    salaries = json.loads(request.form['salaries'])
    subsidy = json.loads(request.form['subsidy'])
    salary_service = Salary_Service(MONGO)
    data, code, message = salary_service.add(name, salaries, subsidy)
    return __result(data, code, message)

@SALARY.route('/update', methods=['GET', 'POST'])
def update():
    """
        Update salary
        params _id, name, salaries, subsidy
        return {"data":{ObjectId('xxx')}
                , "status":{"code":0, "message":"success"}}

        code 1:Title cannot be empty.
    """
    _id = request.form['_id']
    name = request.form['name']
    salaries = json.loads(request.form['salaries'])
    subsidy = json.loads(request.form['subsidy'])

    salary_service = Salary_Service(MONGO)
    data, code, message = salary_service.update(_id, name, salaries, subsidy)
    return __result(data, code, message)

@SALARY.route('/remove', methods=['GET', 'POST'])
def remove():
    """
        Remove salary
        params _id
        return {"data":{}
                , "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']

    salary_service = Salary_Service(MONGO)
    data, code, message = salary_service.remove(_id)
    return __result(data, code, message)
