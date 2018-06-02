# coding=UTF-8

""" department Router """
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result, auth
from mongo import MONGO
from organization.service.user import User as user_service
from organization.service.department import Department as Department_service
DEPARTMENT = Blueprint('department', __name__)
CORS(DEPARTMENT)
cross_origin(DEPARTMENT)

USER_SERVICE = user_service(MONGO)
DEPARTMENT_SERVICE = Department_service(MONGO)

@DEPARTMENT.route('/list_all', methods=['GET', 'POST'])
@auth(MONGO)
def list_all():
    """
        list all users and departments
    """
    data = {}
    data['users'], code, message = USER_SERVICE.list_all()
    data['departments'], code, message = DEPARTMENT_SERVICE.list_all()
    return __result(data, code, message)

@DEPARTMENT.route('/list_tree', methods=['GET', 'POST'])
@auth(MONGO)
def list_tree():
    """
        list all users and departments
    """
    data = {}
    data, code, message = DEPARTMENT_SERVICE.list_tree()
    return __result(data, code, message)

@DEPARTMENT.route('/create', methods=['GET', 'POST'])
@auth(MONGO)
def create():
    """
        create department
        params name, parentid, create_dept_group
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    name = request.form['name']
    parentid = request.form['parentid']
    create_dept_group = request.form['create_dept_group']
    data, code, message = DEPARTMENT_SERVICE.create(name, parentid, create_dept_group)
    return __result(data, code, message)

@DEPARTMENT.route('/update', methods=['GET', 'POST'])
@auth(MONGO)
def update():
    """
        update department
        params _id, name, parentid, manager
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """

    _id = request.form['_id']
    name = request.form['name']
    parentid = request.form['parentid']
    manager = request.form['manager']
    data, code, message = DEPARTMENT_SERVICE.update(_id, name, parentid, manager)
    return __result(data, code, message)

@DEPARTMENT.route('/remove', methods=['GET', 'POST'])
@auth(MONGO)
def remove():
    """
        remove department
        params _id
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """

    _id = request.form['_id']
    data, code, message = DEPARTMENT_SERVICE.remove(_id)
    return __result(data, code, message)
