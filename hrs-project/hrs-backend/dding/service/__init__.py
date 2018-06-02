""" DDing Service Class"""
import time
import hashlib
from dding import Dding

class Service(object):
    """ DDing Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.dding = Dding(self.mongo)

    def get_jsapi_signature(self):
        """ Get JS-API Signature """
        result = self.dding.get_jsapi_ticket()
        if result['errcode']:
            return {"token":''}, result['errcode'], result['errmsg']
        else:
            str_sign = ""
            sign = {
                "noncestr" : "a5se512436rqwuschsew8r7t23462783",
                "jsapi_ticket" : result['ticket'],
                "timestamp" : int(time.time()),
                "url" : "//okrs.tap4fun.com/dingding",
            }

            for key, value in sorted(sign.items()):
                if str_sign:
                    str_sign += "&{}={}".format(key, value)
                else:
                    str_sign = "{}={}".format(key, value)
            result = {"signatue":hashlib.sha1(str_sign).hexdigest(),
                      "url": sign["url"],
                      "noncestr":sign["noncestr"],
                      "timestamp":sign["timestamp"]}
            return result, 0, "success"
