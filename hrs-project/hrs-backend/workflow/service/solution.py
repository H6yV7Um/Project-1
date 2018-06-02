""" Workflow Service Class"""
from workflow.model.solution import Solution as solution_model

class Solution(object):
    """ Workflow Solution Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.solution_model = solution_model(self.mongo)

    def list_all(self):
        """ list all workflow solution """
        data = self.solution_model.list_all()
        return data, 0, ''

    def add(self, name, copyto, remark, fields, flow):
        """ add workflow solution """
        model = self.solution_model.add(name, copyto, remark, False, fields, flow)
        return model, 0, ''

    def update(self, _id, name, copyto, remark, fields, flow):
        """ update workflow solution """
        model = self.solution_model.update(_id, name, copyto, remark, fields, flow)
        return model, 0, ''

    def remove(self, _id):
        """ remove workflow solution """
        self.solution_model.remove(_id)
        return {}, 0, ''
