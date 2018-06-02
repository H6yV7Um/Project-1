# coding=UTF-8

""" DingDing Router """
import json
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from performance.service.score.preferences import Preferences as ScorePreferences_Service

PREFERENCES = Blueprint('preferences', __name__)
CORS(PREFERENCES)
cross_origin(PREFERENCES)

@PREFERENCES.route('/add', methods=['GET', 'POST'])
def add():
    """
        Add preferences
        params title,remark,cycle = day, weekly, monthly, quarter
               start, end, avoid
               objects = [{'xxx','sss'}],
               options = [{"name":name, "upper":upper, "lower":lower}]

        return {"data":{ObjectId('xxx')}
                , "status":{"code":0, "message":"success"}}

        code 1:Title cannot be empty.
             2:Incorrect cycle.
             3:No users and departments.
             4:No options.
             5:No timestanps.
             6:Option name cannot be empty.
             7:Score range incorrect.
             8:Start/End time cannot be empty.
    """
    title = request.form['title']
    remark = request.form['remark']
    cycle = request.form['cycle']
    start = request.form['start']
    end = request.form['end']
    avoid = request.form['avoid']
    objects = json.loads(request.form['objects'])
    options = json.loads(request.form['options'])
    performanceType = json.loads(request.form['performanceType'])
    
    pfservice = ScorePreferences_Service(MONGO)
    data, code, message = pfservice.add(title, remark, cycle, start, end,
                                        avoid, objects, options, performanceType)
    return __result(data, code, message)

@PREFERENCES.route('/update', methods=['GET', 'POST'])
def update():
    """
        Add preferences
        params _id, title,remark,cycle = day, weekly, monthly, quarter
               start, end, avoid
               objects = [{'xxx','sss'}],
               options = [{"name":name, "upper":upper, "lower":lower}]

        return {"data":{ObjectId('xxx')}
                , "status":{"code":0, "message":"success"}}

        code 1:Title cannot be empty.
             2:Incorrect cycle.
             3:No users and departments.
             4:No options.
             5:No timestanps.
             6:Option name cannot be empty.
             7:Score range incorrect.
             8:Start/End time cannot be empty.
    """
    _id = request.form['_id']
    title = request.form['title']
    remark = request.form['remark']
    cycle = request.form['cycle']
    start = request.form['start']
    end = request.form['end']
    avoid = request.form['avoid']
    objects = json.loads(request.form['objects'])
    options = json.loads(request.form['options'])
    performanceType = json.loads(request.form['performanceType'])
    pfservice = ScorePreferences_Service(MONGO)
    data, code, message = pfservice.update(_id, title, remark, cycle, start, end,
                                        avoid, objects, options, performanceType)
    return __result(data, code, message)

@PREFERENCES.route('/list', methods=['GET', 'POST'])
def list():
    """
        List preferences
        return {"data":[
            {
                {
                    "_id" : ObjectId("58d4a7d5cf30a538b5bdf812"),
                    "start" : "2",
                    "remark" : "阿萨德不就爱上风格好时机二等分",
                    "objects" : [ 
                        "024554446226424492", 
                        "024555234624265211", 
                    ],
                    "end" : "5",
                    "title" : "测试标题",
                    "avoid" : "true",
                    "options" : [ 
                        {
                            "upper" : 4,
                            "lower" : 0,
                            "_id" : ObjectId("58d4a7d5cf30a538b5bdf810"),
                            "name" : "是大是大非但是"
                        }, 
                        {
                            "upper" : 4,
                            "lower" : 0,
                            "_id" : ObjectId("58d4a7d5cf30a538b5bdf811"),
                            "name" : "胜多负少的"
                        }
                    ],
                    "cycle" : "weekly"
                }
            }
        ]
                , "status":{"code":0, "message":"success"}}
    
    """
    pfservice = ScorePreferences_Service(MONGO)
    data, code, message = pfservice.list_all()
    return __result(data, code, message)


@PREFERENCES.route('/remove', methods=['GET', 'POST'])
def remove():
    """
        Remove preferences
        param _id
        return {"data":[
            {
                
            }
        ]
        , "status":{"code":0, "message":"success"}}
    
    """
    pfservice = ScorePreferences_Service(MONGO)
    _id = request.form['_id']
    data, code, message = pfservice.remove(_id)
    return __result(data, code, message)
    