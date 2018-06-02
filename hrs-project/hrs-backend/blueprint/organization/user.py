# coding=UTF-8

""" User Router """
import json
from flask import Blueprint, request, send_file
from flask_cors import CORS, cross_origin
from libs import __result, __result_cookie, auth
from mongo import MONGO
from organization.service.user import User as user_service

USER = Blueprint('user', __name__)
CORS(USER)
cross_origin(USER)

USER_SERVICE = user_service(MONGO)

@USER.route('/update_group', methods=['GET', 'POST'])
@auth(MONGO)
def update_group():
    """
        Update user group
        params _id, group
        return {
                    "data":
                    [
                        {}
                    ], "status":{ "code":0, "message":"" }
                }
    """
    _id = request.form['_id']
    group = request.form['group']

    data, code, message = USER_SERVICE.update_group(_id, group)
    return __result(data, code, message)

@USER.route('/find_id', methods=['GET', 'POST'])
@auth(MONGO)
def find_id():
    """
        find user
        params _id
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    _id = request.form['_id']

    data, code, message = USER_SERVICE.find_id(_id)
    return __result(data, code, message)

@USER.route('/list', methods=['GET', 'POST'])
@auth(MONGO)
def list():
    """
        List user
        params condition, pagination
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    condition = json.loads(request.form['condition'])
    pagination = int(request.form['pagination'])

    data, code, message = USER_SERVICE.list_user(condition, pagination)
    return __result(data, code, message)

@USER.route('/list_name', methods=['GET', 'POST'])
@auth(MONGO)
def list_name():
    """
        List names
        params keywords
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}
            }
    """
    keywords = request.form['keywords']
    if not keywords:
        return __result({}, 1, '')

    data, code, message = USER_SERVICE.list_name(keywords)
    return __result(data, code, message)

@USER.route('/update_permission', methods=['GET', 'POST'])
@auth(MONGO)
def update_permission():
    """
        Update user permissions
        params userid, permission
        code 1 Invalid userid,
             2 Invalid module id,
             3 Module access denied,
             4 Invalid menu id,
             5 Menu access denied
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    _id = request.form['_id']
    permission = request.form['permission']
    data, code, message = USER_SERVICE.update_permission(_id, permission)
    return __result(data, code, message)

@USER.route('/get_menus', methods=['GET', 'POST'])
@auth(MONGO)
def get_menus():
    """
        get current user menus
        params
        code 1 Invalid token,
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    data, code, message = USER_SERVICE.get_menus()
    return __result(data, code, message)

@USER.route('/auth', methods=['GET', 'POST'])
def auth_email():
    """
        auth by email
        params
        code 1 Invalid token,
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    ticket = request.form['ticket']
    data, code, message, key, value, expires, httponly = USER_SERVICE.auth(ticket)
    return __result_cookie(data, code, message, key, value, expires, httponly)

@USER.route('/exists_custom_field', methods=['GET', 'POST'])
def exists_custom_field():
    """
        exists custom field
        params
        return {
                    "data":[
                    true
                ], "status":{"code":0, "message":""}}
    """
    _id = request.form['_id']
    value = request.form['value']
    data, code, message = USER_SERVICE.exists_custom_field(_id, value)
    return __result(data, code, message)


@USER.route('/entry', methods=['GET', 'POST'])
def entry():
    """
        New User Entry
        params custom_field, insurance, taxes, fund, salary, salaries
    """
    custom_field = json.loads(request.form['custom_field'])
    insurance = request.form['insurance']
    taxes = request.form['taxes']
    fund = request.form['fund']
    salary = request.form['salary']
    salaries = json.loads(request.form['salaries'])
    data, code, message = USER_SERVICE.entry(custom_field, insurance, taxes, fund, salary, salaries)

    return __result(data, code, message)


@USER.route('/completed', methods=['GET', 'POST'])
def completed():
    """
        completed profile
        params custom_field
    """
    custom_field = json.loads(request.form['custom_field'])
    data, code, message = USER_SERVICE.completed(custom_field)

    return __result(data, code, message)

@USER.route('/update', methods=['GET', 'POST'])
def update():
    """
        update profile
        params _id, custom_field, insurance, taxes, fund, salary, salaries
    """
    _id = request.form['_id']
    insurance = request.form['insurance']
    taxes = request.form['taxes']
    fund = request.form['fund']
    salary = request.form['salary']
    salaries = json.loads(request.form['salaries'])
    custom_field = json.loads(request.form['custom_field'])
    data, code, message = USER_SERVICE.update(_id, custom_field, insurance, taxes, fund,
                                              salary, salaries)

    return __result(data, code, message)


@USER.route('/authorizing', methods=['GET', 'POST'])
def authorizing():
    """
        Authorizing User
        params code
        return {
                "data":["token":"xxxxxxxx"],
                "status":{"code":result['errcode'],
                "message":result['errmsg']}
               }
    """
    code = request.form['code']
    data, code, message, key, value, expires, httponly = USER_SERVICE.authorizing(code)
    return __result_cookie(data, code, message, key, value, expires, httponly)

@USER.route('/verify', methods=['GET', 'POST'])
def verify():
    """
        Verify Cookie
        return {
                "data":[],
                "status":{"code":0/1,
                "message":result['errmsg']}
               }
    """
    data, code, message = USER_SERVICE.verify()
    return __result(data, code, message)

@USER.route('/get_current', methods=['GET', 'POST'])
@auth(MONGO)
def get_current():
    """
        Get Current User Information
        return {
                "data":[{
                            "_id" : ObjectId("58aea34bcf30a54223b46632"),
                            "active" : true,
                            "name" : "杨祥吉",
                            "mobile" : "15208412033",
                            "did" : [
                                12810626,
                                16918898
                            ],
                            "position" : "董事长",
                            "userid" : "024554446226424492",
                            "email" : "yangxiangji@nibirutech.com",
                            "avatar" : "http://static.dingtalk.com/media/lADOSt49.jpg"
                        }],
                "status":{"code":0/1,
                "message":result['errmsg']}
               }
    """
    data, code, message = USER_SERVICE.get_current()
    return __result(data, code, message)

