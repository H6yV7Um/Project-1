""" Permission Service Class"""
from kernel.model.menu import Menu as menu_model
from kernel.model.module import Module as module_model
from organization.model.department import Department as department_model

class Permission(object):
    """ Permission Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.module_model = module_model(self.mongo)
        self.menu_model = menu_model(self.mongo)
        self.department_model = department_model(self.mongo)

    def list(self):
        """ List module and organization tree """
        message = ""
        code = 0
        data = self.module_model.list()
        result = {}
        result['module'] = []
        result['organization'] = self.department_model.list_tree()
        for module in data:
            module['menus'] = self.menu_model.list(module['_id'])
            result['module'].append(module)
        return result, code, message
