""" User Service Class"""
from organization.model.department import Department as department_model
from organization.model.user import User as user_model
from dding import Dding

class Department(object):
    """ User Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.dding = Dding(self.mongo)
        self.department_model = department_model(self.mongo)
        self.user_model = user_model(self.mongo)

    def list_all(self):
        """ list all departments """
        data = self.department_model.list_all()
        return data, 0, ''
    def list_tree(self):
        """ list all tree """
        data = self.department_model.list_tree()
        return data, 0, ''

    def create(self, name, parentid, create_dept_group):
        """ create department """
        parent_result = self.department_model.find_id(parentid)
        dd_result = self.dding.create_department(name, parent_result['did'], create_dept_group)
        if not dd_result['errcode']:
            return self.department_model.add(dd_result['id'], name, parentid), 0, ''
        else:
            return "", dd_result['errcode'], dd_result['errmsg']

    def update(self, _id, name, parentid, manager):
        """ update department """
        department = self.department_model.find_id(_id)
        parent = self.department_model.find_id(parentid)
        if manager:
            user = self.user_model.find_id(manager)
            if user:
                manager = user['userid']
        if not department:
            return "", 1, ""
        dd_result = self.dding.update_department(department['did'], name, parent['did'],
                                                 manager)
        if not dd_result['errcode']:
            return self.department_model.update(_id, name, parentid, manager), 0, ''
        else:
            return "", dd_result['errcode'], dd_result['errmsg']

    def remove(self, _id):
        """ remove department """
        department = self.department_model.find_id(_id)
        if not department:
            return "", 1, ""

        dd_result = self.dding.delete_department(department['did'])
        if not dd_result['errcode']:
            self.department_model.remove(_id)
            return "", 0, ""
        else:
            return "", dd_result['errcode'], dd_result['errmsg']
