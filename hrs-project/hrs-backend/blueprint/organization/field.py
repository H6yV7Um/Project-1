# coding=UTF-8

""" Field Router """
import json
from flask import Blueprint, request, send_file
from flask_cors import CORS, cross_origin
from libs import __result, auth
from mongo import MONGO
from organization.service.field import Field as Field_Service
FIELD = Blueprint('field', __name__)
CORS(FIELD)
cross_origin(FIELD)

FIELD_SERVICE = Field_Service(MONGO)
@FIELD.route('/add_group', methods=['GET', 'POST'])
@auth(MONGO)
def add_group():
    """
        add field group
        params name
        code 1 Invalid token,
        return {
                    "data":[
                    {"$oid":"xxxxx"}
                ], "status":{"code":0, "message":""}}
    """
    name = request.form['name']
    data, code, message = FIELD_SERVICE.add_group(name)
    return __result(data, code, message)

@FIELD.route('/update_group', methods=['GET', 'POST'])
@auth(MONGO)
def update_group():
    """
        update field group
        params name, _id
        code 1 Invalid token,
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    _id = request.form['_id']
    name = request.form['name']
    data, code, message = FIELD_SERVICE.update_group(_id, name)
    return __result(data, code, message)

@FIELD.route('/remove_group', methods=['GET', 'POST'])
@auth(MONGO)
def remove_group():
    """
        remove field group
        params _id
        code 1 Invalid token,
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    _id = request.form['_id']
    data, code, message = FIELD_SERVICE.remove_group(_id)
    return __result(data, code, message)


@FIELD.route('/sort_group', methods=['GET', 'POST'])
@auth(MONGO)
def sort_group():
    """
        sort group
        params _id, old_index, new_index
        code 1 Invalid token,
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    _id = request.form['_id']
    old_index = request.form['old_index']
    new_index = request.form['new_index']
    data, code, message = FIELD_SERVICE.sort_group(_id, old_index, new_index)
    return __result(data, code, message)

@FIELD.route('/list_group', methods=['GET', 'POST'])
@auth(MONGO)
def list_group():
    """
        list group
        params
        code 1 Invalid token,
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    data, code, message = FIELD_SERVICE.list_group()
    return __result(data, code, message)


@FIELD.route('/add_field', methods=['GET', 'POST'])
@auth(MONGO)
def add_field():
    """
        add field
        params input: groupid, type, name, require, modify, check, fill, regex, warning, unique, remark
               select: groupid, type, name, require, modify, check, fill, remark, options
               file: groupid, type, name, require, modify, check, fill, filetype, size, maximum, remark
               date: groupid, type, name, require, modify, check, fill, remark
        code 1 Invalid token,
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    groupid = request.form['groupid']
    _type = request.form['type']
    name = request.form['name']
    namespace = request.form['namespace']
    require = request.form['require']
    modify = request.form['modify']
    check = request.form['check']
    fill = request.form['fill']
    remark = request.form['remark']
    if _type == 'input':
        regex = request.form['regex']
        warning = request.form['warning']
        unique = request.form['unique']
        data, code, message = FIELD_SERVICE.add_field_input(groupid, name, namespace, require,
                                                            modify, check, fill, regex, warning,
                                                            unique, remark)
        return __result(data, code, message)
    elif _type == 'select':
        options = json.loads(request.form['options'])
        data, code, message = FIELD_SERVICE.add_field_select(groupid, name, namespace, require,
                                                             modify, check, fill, remark, options)
        return __result(data, code, message)
    elif _type == 'file':
        filetype = request.form['filetype']
        size = request.form['size']
        maximum = request.form['maximum']
        data, code, message = FIELD_SERVICE.add_field_file(groupid, name, namespace, require,
                                                           modify, check, fill, filetype,
                                                           size, maximum, remark)
        return __result(data, code, message)
    elif _type == 'date':
        data, code, message = FIELD_SERVICE.add_field_date(groupid, name, namespace, require,
                                                           modify, check, fill, remark)
        return __result(data, code, message)
    elif _type == 'department':
        multiple = request.form['multiple']
        tree_check_strictly = request.form['treeCheckStrictly']
        data, code, message = FIELD_SERVICE.add_field_department(groupid, name, namespace, require,
                                                                 modify, check, fill, remark,
                                                                 multiple, tree_check_strictly)
        return __result(data, code, message)
    elif _type == 'member':
        multiple = request.form['multiple']
        data, code, message = FIELD_SERVICE.add_field_member(groupid, name, namespace, require,
                                                             modify, check, fill, remark, multiple)
        return __result(data, code, message)


@FIELD.route('/update_field', methods=['GET', 'POST'])
@auth(MONGO)
def update_field():
    """
        update field
        params input: fieldid, type, name, require, modify, check, fill, regex, warning, unique, remark
               select: fieldid, type, name, require, modify, check, fill, remark, options
               file: fieldid, type, name, require, modify, check, fill, filetype, size, maximum, remark
               date: fieldid, type, name, require, modify, check, fill, remark
        code 1 Invalid token,
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    fieldid = request.form['_id']
    _type = request.form['type']
    name = request.form['name']
    namespace = request.form['namespace']
    require = request.form['require']
    modify = request.form['modify']
    check = request.form['check']
    fill = request.form['fill']
    remark = request.form['remark']
    if _type == 'input':
        regex = request.form['regex']
        warning = request.form['warning']
        unique = request.form['unique']
        data, code, message = FIELD_SERVICE.update_field_input(fieldid, name, namespace, require,
                                                               modify, check, fill, regex, warning,
                                                               unique, remark)
        return __result(data, code, message)
    elif _type == 'select':
        options = json.loads(request.form['options'])
        data, code, message = FIELD_SERVICE.update_field_select(fieldid, name, namespace, require,
                                                                modify, check, fill, remark,
                                                                options)
        return __result(data, code, message)
    elif _type == 'file':
        filetype = request.form['filetype']
        size = request.form['size']
        maximum = request.form['maximum']
        data, code, message = FIELD_SERVICE.update_field_file(fieldid, name, namespace, require,
                                                              modify, check, fill, filetype, size,
                                                              maximum, remark)
        return __result(data, code, message)
    elif _type == 'date':
        data, code, message = FIELD_SERVICE.update_field_date(fieldid, name, namespace, require,
                                                              modify, check, fill, remark)
        return __result(data, code, message)
    elif _type == 'department':
        multiple = request.form['multiple']
        tree_check_strictly = request.form['treeCheckStrictly']
        data, code, message = FIELD_SERVICE.update_field_department(fieldid, name, namespace,
                                                                    require, modify, check, fill,
                                                                    remark, multiple,
                                                                    tree_check_strictly)
        return __result(data, code, message)
    elif _type == 'member':
        multiple = request.form['multiple']
        data, code, message = FIELD_SERVICE.update_field_member(fieldid, name, namespace, require,
                                                                modify, check, fill, remark,
                                                                multiple)
        return __result(data, code, message)



@FIELD.route('/remove_field', methods=['GET', 'POST'])
@auth(MONGO)
def remove_field():
    """
        remove field
        params _id
        code 1 Invalid token,
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    _id = request.form['_id']
    data, code, message = FIELD_SERVICE.remove_field(_id)
    return __result(data, code, message)


@FIELD.route('/sort_field', methods=['GET', 'POST'])
@auth(MONGO)
def sort_field():
    """
        sort field
        params _id, old_index, new_index
        code 1 Invalid token,
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    _id = request.form['_id']
    old_index = request.form['old_index']
    new_index = request.form['new_index']
    data, code, message = FIELD_SERVICE.sort_field(_id, old_index, new_index)
    return __result(data, code, message)

@FIELD.route('/find_field', methods=['GET', 'POST'])
@auth(MONGO)
def find_field():
    """
        find field
        params _id
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    _id = request.form['_id']
    data, code, message = FIELD_SERVICE.find_field(_id)
    return __result(data, code, message)
