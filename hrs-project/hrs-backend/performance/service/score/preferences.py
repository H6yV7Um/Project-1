""" Score Performance Service Class"""
from performance.model.score.preferences import Preferences as score_preferences_model
class Preferences(object):
    """ Score Performance Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.score_preferences_model = score_preferences_model(self.mongo)

    def add(self, title, remark, cycle, start, end, avoid, objects, options, performanceType):
        """ add preference """
        code = 0
        message = ""
        if not title:
            code = 1
            message = "Title cannot be empty."

        if cycle != "quarter" and cycle != "monthly" and cycle != "weekly" and cycle != "day":
            code = 2
            message = "Incorrect cycle."

        if not objects:
            code = 3
            message = "No users and departments."

        if not options:
            code = 4
            message = "No options."

        for option in options:
            if not option['name']:
                code = 5
                message = "Option name cannot be empty."
                break
            if option['upper'] <= option['lower']:
                code = 6
                message = "Score range incorrect."
                break
        if not performanceType:
            code = 7
            message = "No type."

        if not code:
            pid = self.score_preferences_model.add(title, remark, cycle, start, end, avoid,
                                                   options, objects, performanceType)
            return pid.inserted_id, code, message
        else:
            return {}, code, message

    def update(self, _id, title, remark, cycle, start, end, avoid, objects, options, performanceType):
        """ update preference """
        code = 0
        message = ""
        if not title:
            code = 1
            message = "Title cannot be empty."

        if cycle != "quarter" and cycle != "monthly" and cycle != "weekly" and cycle != "day":
            code = 2
            message = "Incorrect cycle."

        if not objects:
            code = 3
            message = "No users and departments."

        if not options:
            code = 4
            message = "No options."

        for option in options:
            if not option['name']:
                code = 5
                message = "Option name cannot be empty."
                break
            if option['upper'] <= option['lower']:
                code = 6
                message = "Score range incorrect."
                break
        if not performanceType:
            code = 7
            message = "No type."

        if not code:
            self.score_preferences_model.update(_id, title, remark, cycle, start, end, avoid,
                                                options, objects, performanceType)
            return {}, code, message
        else:
            return {}, code, message
    def list_all(self):
        """ list all of preferences """
        code = 0
        message = ""
        cursor = self.score_preferences_model.list_all()
        preferences = []
        for preference in cursor:
            preferences.append(preference)
        return preferences, code, message

    def remove(self, aid):
        """ remove preferences by id """
        code = 0
        message = ""
        self.score_preferences_model.remove(aid)
        return {}, code, message
