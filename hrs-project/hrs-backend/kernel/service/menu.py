""" User Service Class"""
import re
import datetime
from flask import request
from kernel.model.menu import Menu as menu_model
from kernel.model.module import Module as module_model


class Menu(object):
    """ User Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.menu_model = menu_model(self.mongo)
        self.module_model = module_model(self.mongo)

    def add(self, moduleid, name, icon):
        """ add menu """
        message = ""
        code = 0
        _id = {}
        if not name.strip():
            code = 1
            message = "name cannot be empty."

        if not icon.strip():
            code = 2
            message = "icon cannot be empty."

        if not self.module_model.exists_id(moduleid):
            code = 3
            message = "module doesn't exists."

        if not code:
            _id = self.menu_model.add(moduleid, name, icon)

        return _id, code, message

    def update(self, mid, name, icon):
        """ Update menu """
        message = ""
        code = 0
        if not name.strip():
            code = 1
            message = "name cannot be empty."

        if not icon.strip():
            code = 2
            message = "icon cannot be empty."

        if not code:
            self.menu_model.update(mid, name, icon)
        return {}, code, message

    def delete(self, mid):
        """ Delete menu """
        message = ""
        code = 0
        self.menu_model.delete(mid)
        return {}, code, message

    def add_sub(self, parentid, name, url, icon, permission):
        """ add menu """
        message = ""
        code = 0
        if not name.strip():
            code = 1
            message = "name cannot be empty."

        # if not icon.strip():
        #     code = 2
        #     message = "icon cannot be empty."

        if not url.strip():
            code = 3
            message = "url cannot be empty."

        if not code:
            _id = self.menu_model.add_sub(parentid, name, url, icon, permission)
            return _id, code, message

        return {}, code, message

    def update_sub(self, sid, name, url, icon, permission):
        """ Update sub menu """
        message = ""
        code = 0
        if not name.strip():
            code = 1
            message = "name cannot be empty."

        # if not icon.strip():
        #     code = 2
        #     message = "icon cannot be empty."

        if not url.strip():
            code = 3
            message = "url cannot be empty."

        if not code:
            self.menu_model.update_sub(sid, name, url, icon, permission)
        return {}, code, message

    def delete_sub(self, sid):
        """ Delete sub menu """
        message = ""
        code = 0
        self.menu_model.delete_sub(sid)
        return {}, code, message

    def list_all(self):
        """ List all of menus """
        message = ""
        code = 0
        data = self.menu_model.list_all()
        return data, code, message
