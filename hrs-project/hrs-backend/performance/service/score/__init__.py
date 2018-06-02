""" score """
import datetime
from bson import ObjectId
from performance.model.score.preferences import Preferences as preferences_model
from organization.model.department import Department as department_model
from organization.model.user import User as user_model
class Score(object):
    """ score Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.preferences_model = preferences_model(self.mongo)
        self.department_model = department_model(self.mongo)
        self.user_model = user_model(self.mongo)

    def publish(self):
        preferences = self.preferences_model.list_today()
        for preference in preferences:
          departments = self.department_model.list_ids(preference['objects'])
          users = self.user_model.list_ids(preference['objects'])
