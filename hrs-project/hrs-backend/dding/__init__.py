""" DingDing API """
import datetime
import requests
from bson.json_util import dumps
from urllib import quote
class Dding(object):
    """ DingDing API """
    GET_TOKEN = ("https://oapi.dingtalk.com/gettoken?corpid=ding055f194a57d1af67"
                 "&corpsecret=sqZfSKtCQq5Sd2BfGtMoLdqZWbNw7zuybd7hnlKwkj5yoyzTShh6bRNlm-MUuBww")
    GET_DEPARTMENT = "https://oapi.dingtalk.com/department/list?access_token={}"
    GET_DEPARTMENT_DETAIL = "https://oapi.dingtalk.com/department/get?access_token={}&id={}"
    GET_USERS_DETAIL = "https://oapi.dingtalk.com/user/list?access_token={}&department_id={}"
    GET_USER_DETAIL = "https://oapi.dingtalk.com/user/get?access_token={}&userid={}"
    GET_JSAPI_TICKET = "https://oapi.dingtalk.com/get_jsapi_ticket?type=jsapi&access_token={}"
    GET_USER_INFO = "https://oapi.dingtalk.com/user/getuserinfo?access_token={}&code={}"
    CREATE_DEPARTMENT = "https://oapi.dingtalk.com/department/create?access_token={}"
    UPDATE_DEPARTMENT = "https://oapi.dingtalk.com/department/update?access_token={}"
    DELETE_DEPARTMENT = "https://oapi.dingtalk.com/department/delete?access_token={}&id={}"
    SEND_MESSAGE  = "https://oapi.dingtalk.com/message/send?access_token={}"
    def __init__(self, mongo):
        self.mongo = mongo

    def get_token(self):
        """ Get Token """
        validtime = datetime.datetime.now() - datetime.timedelta(hours=2)
        if not self.mongo.db.ddtoken.count({}):
            return self._access_token()
        elif self.mongo.db.ddtoken.count({"timestamp":{"$gt":validtime}}):
            result = self.mongo.db.ddtoken.find_one({"timestamp":{"$gt":validtime}})
            return result['token']
        else:
            self.mongo.db.ddtoken.remove({})
            return self._access_token()

    def _access_token(self):
        """ Network request token from dingding """
        result = requests.get(self.GET_TOKEN)
        result = result.json()
        return result['access_token']

    def get_department(self):
        """ Network request departments from dingding """
        token = self.get_token()
        result = requests.get(self.GET_DEPARTMENT.format(token))
        return result.json()

    def get_department_detail(self, did):
        """ Network request departments detail from dingding """
        token = self.get_token()
        result = requests.get(self.GET_DEPARTMENT_DETAIL.format(token, did))
        return result.json()

    def get_users_detail(self, did):
        """ Network request users detail from dingding """
        token = self.get_token()
        result = requests.get(self.GET_USERS_DETAIL.format(token, did))
        return result.json()

    def get_user_detail(self, userid):
        """ Network request user detail from dingding """
        token = self.get_token()
        result = requests.get(self.GET_USER_DETAIL.format(token, userid))
        return result.json()

    def get_jsapi_ticket(self):
        """ Get Token """
        validtime = datetime.datetime.now() - datetime.timedelta(hours=2)
        if not self.mongo.db.ddticket.count({}):
            return self._get_jsapi_ticket()
        elif self.mongo.db.ddticket.count({"timestamp":{"$gt":validtime}}):
            result = self.mongo.db.ddticket.find_one({"timestamp":{"$gt":validtime}})
            return result['ticket']
        else:
            self.mongo.db.ddticket.remove({})
            return self._get_jsapi_ticket()

    def _get_jsapi_ticket(self):
        """ Network request jsapi ticket from dingding """
        token = self.get_token()
        result = requests.get(self.GET_JSAPI_TICKET.format(token))
        return result.json()

    def get_user_info(self, code):
        """ Network request user info from dingding """
        token = self.get_token()
        result = requests.get(self.GET_USER_INFO.format(token, code))
        return result.json()

    def create_department(self, name, parentid, create_dept_group):
        """ create department """
        token = self.get_token()
        data = {
            "name": name,
            "parentid": parentid,
            "createDeptGroup":create_dept_group,
        }
        result = requests.post(self.CREATE_DEPARTMENT.format(token), data=dumps(data))
        return result.json()

    def update_department(self, _id, name, parentid, dept_manager_userid_list):
        """ update department """
        token = self.get_token()
        data = {
            "id": _id,
            "name": name,
            "parentid": parentid,
            "deptManagerUseridList":dept_manager_userid_list
        }
        result = requests.post(self.UPDATE_DEPARTMENT.format(token), data=dumps(data))
        return result.json()

    def delete_department(self, _id):
        """ delete department """
        token = self.get_token()
        result = requests.get(self.DELETE_DEPARTMENT.format(token, _id))
        return result.json()

    def send_link(self, users, title, text, url):
        user_list = ""
        for user in users:
            if user_list:
                user_list+="|"+user
            else:
                user_list = user
        notification = {
            "touser": user_list,
            "toparty": "",
            "agentid":"77290521",
            "msgtype": "link",
            "link": {
                        "messageUrl": "dingtalk://dingtalkclient/page/link?url="+quote(url)+"&pc_slide=true",
                        "picUrl":"",
                        "title": title,
                        "text": text
            }
        }
        token = self.get_token()
        result = requests.post(self.SEND_MESSAGE.format(token), data=dumps(notification))
        return result.json()
        
    def send_message(self, users, text):
        user_list = ""
        for user in users:
            if user_list:
                user_list+="|"+user
            else:
                user_list = user
        notification = {
            "touser": user_list,
            "toparty": "",
            "agentid":"77290521",
            "msgtype": "text",
            "text": {
                        "content": text
                    }
        }
        token = self.get_token()
        result = requests.post(self.SEND_MESSAGE.format(token), data=dumps(notification))
        return result.json()
        