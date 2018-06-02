# coding=UTF-8

""" Kernel Module Router """
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result, auth
from mongo import MONGO
from kernel.service.module import Module as Module_Service

MODULE = Blueprint('module', __name__)
CORS(MODULE)
cross_origin(MODULE)

@MODULE.route('/add', methods=['GET', 'POST'])
@auth(MONGO)
def module_add():
    """
        Add module
        params name, namespace, version, permission
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
        code 1 name cannot be empty.
        	 2 namespace cannot be empty.
        	 3 namespace format error.
        	 4 namespace already exists.
    """
    name = request.form['name']
    namespace = request.form['namespace']
    version = request.form['version']
    permission = request.form['permission']

    moduleservice = Module_Service(MONGO)
    data, code, message = moduleservice.add(name, namespace, version, permission)
    return __result(data, code, message)

@MODULE.route('/update', methods=['GET', 'POST'])
@auth(MONGO)
def module_update():
    """
        Update module
        params mid, name, namespace, version, permission
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
        code 1 name cannot be empty.
        	 2 namespace cannot be empty.
        	 3 namespace format error.
        	 4 namespace already exists.
        	 5 the module doesn't exists.
    """
    mid = request.form['mid']
    name = request.form['name']
    namespace = request.form['namespace']
    version = request.form['version']
    permission = request.form['permission']

    moduleservice = Module_Service(MONGO)
    data, code, message = moduleservice.update(mid, name, namespace, version, permission)
    return __result(data, code, message)

@MODULE.route('/delete', methods=['GET', 'POST'])
@auth(MONGO)
def module_delete():
    """
        Delete module
        params mid
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    mid = request.form['mid']
    moduleservice = Module_Service(MONGO)
    data, code, message = moduleservice.delete(mid)
    return __result(data, code, message)

@MODULE.route('/list', methods=['GET', 'POST'])
@auth(MONGO)
def module_list():
    """
        List all of module

        return {
                    "data":[
                    {
                    	'name':name,
                		'namespace':namespace,
                		'version':version
                	},
                	{
                    	'name':name,
                		'namespace':namespace,
                		'version':version
                	}
                ], "status":{"code":0, "message":""}}
    """
    moduleservice = Module_Service(MONGO)
    data, code, message = moduleservice.list()
    return __result(data, code, message)
