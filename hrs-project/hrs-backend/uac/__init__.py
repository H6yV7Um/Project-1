""" UAC API """
import datetime
import requests
class UAC(object):
    """ UAC API """
    TOKEN = "40fe409d-ac68-4b58-87ae-0f3420a31ad3"
    GET_VALIDATE = "https://uac.pf.tap4fun.com/client_systems/validate"
    def __init__(self, mongo):
        self.mongo = mongo

    def validate(self, ticket):
        """ Validate ticket """
        data = {
            "ticket":ticket,
            "token":self.TOKEN
        }
        result = requests.post(self.GET_VALIDATE, data=data)
        if result.status_code == requests.codes.ok:
            return result.json()
        else:
            return {"errcode": result.status_code}

