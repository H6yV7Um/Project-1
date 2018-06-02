""" DDing Service Class"""
import time
import hashlib
from uac import UAC

class Service(object):
    """ UAC Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.uac = UAC(self.mongo)

    def validate(self, ticket):
        """ validate """
        result = self.uac.validate(ticket)
        if result.has_key('errcode'):
            return {}, result['errcode'], ""
        else:
            return result, 0, "success"
