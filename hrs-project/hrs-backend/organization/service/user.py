""" User Service Class"""
import datetime
import json
import libs
from bson import ObjectId
from dding import Dding
from uac.service import Service as uac_service
from organization.model.department import Department as department_model
from organization.model.user import User as user_model
from kernel.model.module import Module as module_model
from kernel.model.menu import Menu as menu_model
from organization.model.field import Field as field_model
from organization.model.file import File as file_model
from flask import request

class User(object):
    """ User Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.department_model = department_model(self.mongo)
        self.user_model = user_model(self.mongo)
        self.module_model = module_model(self.mongo)
        self.menu_model = menu_model(self.mongo)
        self.field_model = field_model(self.mongo)
        self.file_model = file_model(self.mongo)
        self.dding = Dding(self.mongo)
        self.uac_service = uac_service(self.mongo)

    def auth(self, ticket):
        """ auth with gmail """
        result, code, message = self.uac_service.validate(ticket)
        if not code:
            token = self.user_model.authorized_email(result['email'])
            expiretime = datetime.datetime.now()
            expiretime = expiretime + datetime.timedelta(days=7)
            data = {"token":token, "expiretime":expiretime}
            return data, 0, "", "token", token, expiretime, True
        else:
            return result, 1, message, "", "", "", False

    def authorizing(self, code):
        """ authorizing user """
        result = self.dding.get_user_info(code)
        if not result['errcode']:
            token = self.user_model.authorized_user_id(result['userid'])
            expiretime = datetime.datetime.now()
            expiretime = expiretime + datetime.timedelta(days=7)
            data = {"token":token, "expiretime":expiretime}
            return data, result['errcode'], "", "token", token, expiretime, True
        else:
            return {}, result['errcode'], result['errmsg'], "", "", "", False

    def verify(self):
        """ verify cookie """
        token = request.cookies.get('token')
        code = 0
        message = ""
        if not token:
            code = 1
            message = "invalid token"
        else:
            if self.user_model.verify(token):
                code = 0
                message = "valid token"
            else:
                code = 1
                message = "invalid token"

        return {}, code, message

    def get_current(self):
        """ get current user information """
        token = request.cookies.get('token')
        data = {}
        code = 0
        message = ""
        if not token:
            code = 1
            message = "invalid token"
        else:
            data = self.user_model.find_user_token(token)
            if not data:
                code = 1
                message = "invalid token"
            group_result = self.field_model.list_group()
            group_list = []
            for group in group_result:
                group_list.append(group)

            for group in group_list:
                for field in group['fields']:
                    if field['type'] == 'file':
                        files = []
                        for file in data[field['namespace']]:
                            files.append(self.file_model.find(file))
                        data[field['namespace']] = files
                    if field['type'] == 'date':
                        if field['namespace'] in data:
                            date = data[field['namespace']]
                            if date:
                                data[field['namespace']] = libs.utc_to_local(date).strftime("%Y-%m-%d")
        return data, code, message

    def list_all(self):
        """ list all users """
        data = self.user_model.list_all()
        return data, 0, ''

    def list_user(self, condition, pagination):
        """ list users """
        group_result = self.field_model.list_group()
        result = {}
        for key in condition.keys():
            if not condition[key]:
                del condition[key]
        if condition.has_key('regularizationdate'):
            if bool(int(condition['regularizationdate'])):
                condition['regularizationdate'] = {"$ne": ''}
            else:
                condition['regularizationdate'] = ""
        if condition.has_key('department'):
            temp_department = []
            for department_id in condition['department']:
                temp_department.append({"department.value": department_id['value']})
            condition['$or'] = temp_department
            del condition['department']
        user_list = self.user_model.list_user(condition, {"loginrecord":0}, 40, pagination)
        result['data'] = []
        # set file default value
        group_list = []
        for group in group_result:
            group_list.append(group)
        for user in user_list:
            for group in group_list:
                for field in group['fields']:
                    if field['type'] == 'file':
                        files = []
                        for file in user[field['namespace']]:
                            files.append(self.file_model.find(file))
                        user[field['namespace']] = files
                    if field['type'] == 'date':
                        if field['namespace'] in user:
                            date = user[field['namespace']]
                            if date:
                                user[field['namespace']] = libs.utc_to_local(date).strftime("%Y-%m-%d")
            result['data'].append(user)
        result['count'] = self.user_model.count_user(condition)
        return result, 0, ''

    def list_name(self, keywords):
        """ list users """
        result = self.user_model.list_name(keywords)
        return result, 0, ''

    def update_group(self, _id, group):
        """ list all users """
        data = self.user_model.update_group(_id, group)
        self._update_permission_group(_id, group)
        return data, 0, ''

    def get_menus(self):
        """ get current user menus """
        ids = []
        token = request.cookies.get('token')
        data = {}
        menus = []
        code = 0
        message = ""
        if not token:
            code = 1
            message = "invalid token"
        else:
            data = self.user_model.find_user_token(token)
            if not data:
                code = 1
                message = "invalid token"
        if data:
            if data['group'] == '2':
                result = self.menu_model.list_all()
                for menu in result:
                    menus.append(menu)
            else:
                for permission in data['permission']:
                    if 'menus' in permission.keys():
                        for menu in permission['menus']:
                            ids.append(str(menu['menuid']))
                result = self.menu_model.list_sub_ids(ids)
                for menu in result:
                    sub_menu = []
                    for sub in menu['sub']:
                        for _id in ids:
                            if str(_id) == str(sub['_id']):
                                sub_menu.append(sub)
                    menu['sub'] = sub_menu
                    menus.append(menu)

        return menus, code, message

    def _update_permission_group(self, _id, group):
        """ update user permission by group """
        permission = []
        modules = []
        if group == '0':
            modules = self.module_model.list_permission('0')
        elif group == '1':
            modules = self.module_model.list_permission('1')
        elif group == '2':
            modules = self.module_model.list_permission('2')
        for module in modules:
            menus = self.menu_model.list(module['_id'])
            menu_permission = []
            for menu in menus:
                for sub in menu['sub']:
                    if group == '0':
                        if sub['permission'] == '0':
                            menu_permission.append({
                                "menuid": sub['_id'],
                                "permission": '0'
                            })
                    elif group == '1':
                        if sub['permission'] == '0' or sub['permission'] == '1':
                            menu_permission.append({
                                "menuid": sub['_id'],
                                "permission": '1'
                            })
                    elif group == '2':
                        menu_permission.append({
                            "menuid": sub['_id'],
                            "permission": '1'
                        })
            permission.append({
                "moduleid": module['_id'],
                "menus": menu_permission
            })
            if group == '2':
                permission = []
            self.user_model.update_permission(_id, permission)

    def update_permission(self, _id, permissions):
        """ update user permission """
        code = 0
        message = ""
        user_obj = self.user_model.find_id(_id)
        permissions = json.loads(permissions)
        if not user_obj:
            code = 1
            message = 'Invalid userid'
        for permission in permissions:
            module = self.module_model.find(permission['moduleid']['$oid'])
            permission['moduleid'] = ObjectId(permission['moduleid']['$oid'])
            if not module:
                code = 2
                message = 'Invalid module id'
            if user_obj['group'] == '0' and module['permission'] != "0":
                code = 3
                message = 'Module access denied'
            if user_obj['group'] == '1' and module['permission'] == "2":
                code = 3
                message = 'Module access denied'
            if 'menus' in permission.keys():
                for menu in permission['menus']:
                    menu_obj = self.menu_model.find_sub(menu['menuid']['$oid'])
                    menu['menuid'] = ObjectId(menu['menuid']['$oid'])
                    if not menu_obj:
                        code = 4
                        message = 'Invalid menu id'
                    if user_obj['group'] == '0' and menu_obj['sub'][0]['permission'] != "0":
                        code = 5
                        message = 'Menu access denied'
                    if user_obj['group'] == '1' and menu_obj['sub'][0]['permission'] == "2":
                        code = 5
                        message = 'Menu access denied'
        if not code:
            self.user_model.update_permission(_id, permissions)
        return {}, code, message
    def find_id(self, _id):
        """ find user by id """
        return self.user_model.find_id(_id), 0, ""

    def entry(self, custom_field, insurance, taxes, fund, salary, salaries):
        """ new member entry """
        code = 0
        message = ""
        status = "passed"
        field_group = self.field_model.list_group()
        fields = {}
        for group in field_group:
            for field in group['fields']:
                if field['type'] == 'input':
                    if custom_field.has_key(field['namespace']):
                        fields.update({field['namespace']: custom_field[field['namespace']]})
                    else:
                        fields.update({field['namespace']: ""})

                elif field['type'] == 'select':
                    if custom_field.has_key(field['namespace']):
                        fields.update({field['namespace']: custom_field[field['namespace']]})
                    else:
                        fields.update({field['namespace']:[]})

                elif field['type'] == 'file':
                    if custom_field.has_key(field['namespace']):
                        file_ids = []
                        for file_id in custom_field[field['namespace']]:
                            file_ids.append(ObjectId(file_id))
                        fields.update({field['namespace']: file_ids})
                    else:
                        fields.update({field['namespace']:[]})
                elif field['type'] == 'date':
                    if custom_field.has_key(field['namespace']):
                        if custom_field[field['namespace']]:
                            custom_field[field['namespace']] = libs.str_to_utc(custom_field[field['namespace']], "%Y-%m-%d")
                        fields.update({field['namespace']: custom_field[field['namespace']]})
                    else:
                        fields.update({field['namespace']: ""})

                elif field['type'] == 'department':
                    if custom_field.has_key(field['namespace']):
                        departments = custom_field[field['namespace']]
                        for department in departments:
                            if field['treeCheckStrictly']:
                                department = ObjectId(department['value'])
                            else:
                                department = ObjectId(department)
                        fields.update({field['namespace']: departments})
                    else:
                        fields.update({field['namespace']: []})

                elif field['type'] == 'member':
                    if custom_field.has_key(field['namespace']):
                        members = custom_field[field['namespace']]
                        for member in members:
                            member = ObjectId(member)
                        fields.update({field['namespace']: members})
                    else:
                        fields.update({field['namespace']: []})
        return self.user_model.add(fields, status, insurance,
                                   taxes, fund, salary, salaries), code, message

    def completed(self, custom_field):
        """ completed profile """
        current_user, code, message = self.get_current()
        status = "admitted"
        code = 0
        message = ""
        _id = str(current_user['_id'])
        field_group = self.field_model.list_group()
        fields = {}
        for group in field_group:
            for field in group['fields']:
                if field['fill']:
                    if field['type'] == 'input':
                        if custom_field.has_key(field['namespace']):
                            fields.update({field['namespace']: custom_field[field['namespace']]})
                        else:
                            fields.update({field['namespace']: ""})

                    elif field['type'] == 'select':
                        if custom_field.has_key(field['namespace']):
                            fields.update({field['namespace']: custom_field[field['namespace']]})
                        else:
                            fields.update({field['namespace']:[]})

                    elif field['type'] == 'file':
                        if custom_field.has_key(field['namespace']):
                            file_ids = []
                            for file_id in custom_field[field['namespace']]:
                                file_ids.append(ObjectId(file_id))
                            fields.update({field['namespace']: file_ids})
                        else:
                            fields.update({field['namespace']:[]})
                    elif field['type'] == 'date':
                        if custom_field.has_key(field['namespace']):
                            if custom_field[field['namespace']]:
                                custom_field[field['namespace']] = libs.str_to_utc(custom_field[field['namespace']], "%Y-%m-%d")
                            fields.update({field['namespace']: custom_field[field['namespace']]})
                        else:
                            fields.update({field['namespace']: ""})

                    elif field['type'] == 'department':
                        if custom_field.has_key(field['namespace']):
                            departments = custom_field[field['namespace']]
                            for department in departments:
                                if field['treeCheckStrictly']:
                                    department = ObjectId(department['value'])
                                else:
                                    department = ObjectId(department)
                            fields.update({field['namespace']: departments})
                        else:
                            fields.update({field['namespace']: []})

                    elif field['type'] == 'member':
                        if custom_field.has_key(field['namespace']):
                            members = custom_field[field['namespace']]
                            for member in members:
                                member = ObjectId(member)
                            fields.update({field['namespace']: members})
                        else:
                            fields.update({field['namespace']: []})

        return self.user_model.completed(_id, status, fields), code, message

    def update(self, _id, custom_field, insurance, taxes, fund, salary, salaries):
        """ completed profile """
        current_user = self.user_model.find_id(_id)
        code = 0
        message = ""
        field_group = self.field_model.list_group()
        fields = {}
        for group in field_group:
            for field in group['fields']:
                if field['type'] == 'input':
                    if custom_field.has_key(field['namespace']):
                        fields.update({field['namespace']: custom_field[field['namespace']]})
                    else:
                        fields.update({field['namespace']: ""})

                elif field['type'] == 'select':
                    if custom_field.has_key(field['namespace']):
                        fields.update({field['namespace']: custom_field[field['namespace']]})
                    else:
                        fields.update({field['namespace']:[]})

                elif field['type'] == 'file':
                    if custom_field.has_key(field['namespace']):
                        file_ids = []
                        for file_id in custom_field[field['namespace']]:
                            file_ids.append(ObjectId(file_id))
                        fields.update({field['namespace']: file_ids})
                    else:
                        fields.update({field['namespace']:[]})
                elif field['type'] == 'date':
                    if custom_field.has_key(field['namespace']):
                        if custom_field[field['namespace']]:
                            custom_field[field['namespace']] = libs.str_to_utc(custom_field[field['namespace']], "%Y-%m-%d")
                        fields.update({field['namespace']: custom_field[field['namespace']]})
                    else:
                        fields.update({field['namespace']: ""})

                elif field['type'] == 'department':
                    if custom_field.has_key(field['namespace']):
                        departments = custom_field[field['namespace']]
                        for department in departments:
                            if field['treeCheckStrictly']:
                                department = ObjectId(department['value'])
                            else:
                                department = ObjectId(department)
                        fields.update({field['namespace']: departments})
                    else:
                        fields.update({field['namespace']: []})

                elif field['type'] == 'member':
                    if custom_field.has_key(field['namespace']):
                        members = custom_field[field['namespace']]
                        for member in members:
                            member = ObjectId(member)
                        fields.update({field['namespace']: members})
                    else:
                        fields.update({field['namespace']: []})

        return self.user_model.update(_id, fields, insurance, taxes, fund, salary, salaries), code, message

    def exists_custom_field(self, _id, value):
        """ new member entry """
        code = 0
        message = ""
        field_group = self.field_model.list_group()
        field_name = ""
        for group in field_group:
            for field in group['fields']:
                if str(field['_id']) == _id:
                    field_name = field['namespace']
                    break
            if field_name:
                break
        return self.user_model.exists_custom_field(field_name, value), code, message
