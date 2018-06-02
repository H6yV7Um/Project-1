""" Module Service Class"""
import re
import datetime
from bson import ObjectId
from kernel.model.menu import Menu as menu_model
from kernel.model.module import Module as module_model
from flask import request

class Module(object):
    """ User Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.module_model = module_model(self.mongo)
        self.menu_model = menu_model(self.mongo)

    def add(self, name, namespace, version, permission):
        """ add module """
        message = ""
        code = 0
        if not name.strip():
            code = 1
            message = "name cannot be empty."

        if not namespace.strip():
            code = 2
            message = "namespace cannot be empty."

        if not re.match(r'\w{1,25}', namespace):
            code = 3
            message = "namespace format error."

        if self.module_model.exists_namespace(namespace):
            code = 4
            message = "namespace already exists."

        if not code:
            mid = self.module_model.add(name, namespace, version, permission)
            return mid.inserted_id, code, message
        else:
            return {}, code, message


        

    def update(self, mid, name, namespace, version, permission):
        """ Update module """
        message = ""
        code = 0
        model = self.module_model.find(mid)

        if not name.strip():
            code = 1
            message = "name cannot be empty."

        if not namespace.strip():
            code = 2
            message = "namespace cannot be empty."

        if not re.match(r'\w{1,25}', namespace):
            code = 3
            message = "namespace format error."

        if not model:
            code = 5
            message = "the module doesn't exists."
        elif self.module_model.exists_namespace(namespace) and model['namespace'] != namespace:
            code = 4
            message = "namespace already exists."

        if not code:
            self.module_model.update(mid, name, namespace, version, permission)

        return {}, code, message


    def delete(self, mid):
        """ Delete module """
        message = ""
        code = 0
        self.module_model.delete(mid)
        return {}, code, message

    def list(self):
        """ List module """
        message = ""
        code = 0
        data = self.module_model.list()
        result = []
        for module in data:
            module['menus'] = self.menu_model.list(module['_id'])
            result.append(module)
        return result, code, message
        