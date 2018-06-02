""" score preferences """
import datetime
from bson import ObjectId
class Preferences(object):
    """ score preferences Class"""
    def __init__(self, mongo):
        self.mongo = mongo

    def add(self, title, remark, cycle, start, end, avoid, options, objects, performanceType):
        """ add score preferences """
        for option in options:
            option["_id"] = ObjectId()

        if cycle == 'day':
            start = datetime.datetime.strptime(start, '%Y-%m-%d')
            end = datetime.datetime.strptime(end, '%Y-%m-%d')
        else:
            start = int(start)
            end = int(end)

        return self.mongo.db.score_preferences.insert_one(
            {
                'title':title,
                'remark':remark,
                'cycle':cycle,
                'start':start,
                'end':end,
                'avoid':bool(avoid),
                'options':options,
                'objects':objects,
                'performanceType':performanceType
            })

    def update(self, aid, title, remark, cycle, start, end, avoid, options, objects, performanceType):
        """ update score preferences basic information """
        if cycle == 'day':
            start = datetime.datetime.strptime(start, '%Y-%m-%d')
            end = datetime.datetime.strptime(end, '%Y-%m-%d')
        else:
            start = int(start)
            end = int(end)
        for option in options:
            if option['_id']:
                option['_id']=ObjectId(option['_id']['$oid'])
            else:
                option['_id']=ObjectId()

        return self.mongo.db.score_preferences.update(
            {
                "_id":ObjectId(aid)
            },
            {
                "$set":
                {
                    'title':title,
                    'remark':remark,
                    'cycle':cycle,
                    'start':start,
                    'end':end,
                    'avoid':bool(avoid),
                    'options':options,
                    'objects':objects,
                    'performanceType':performanceType
                }
            })

    def remove(self, aid):
        return self.mongo.db.score_preferences.remove({"_id":ObjectId(aid)})

    def list_all(self):
        """ list all of preferences """
        return self.mongo.db.score_preferences.find({})

    def list_today(self):
        """ list today score """
        today = datetime.date.today()
        if today.month in (1, 2, 3):
            quarter_end = datetime.date(today.year, 4, 1) - datetime.timedelta(days=1)
        elif today.month in (4, 5, 6):
            quarter_end = datetime.date(today.year, 7, 1) - datetime.timedelta(days=1)
        elif datetime.date.today().month in (7, 8, 9):
            quarter_end = datetime.date(today.year, 10, 1) - datetime.timedelta(days=1)
        else:
            quarter_end = datetime.date(today.year+1, 1, 1) - datetime.timedelta(days=1)
        quarter_leftdays = (quarter_end - datetime.date.today()).days+1
        # quarter params
        month_end = datetime.date(today.year, today.month + 1, 1) - datetime.timedelta(days=1)
        month_leftdays = (month_end - datetime.date.today()).days+1
        # monthly params
        week = datetime.date.today().weekday()+1
        # weekly params
        starttime = datetime.datetime.combine(today, datetime.time.min)
        endtime = datetime.datetime.combine(today, datetime.time.max)
        # exact day params
        condition = {
            "$or":[
                {
                    "cycle": "quarter",
                    "start": quarter_leftdays
                },
                {
                    "cycle": "monthly",
                    "start": month_leftdays
                },
                {
                    "cycle": "weekly",
                    "start": week
                },
                {
                    "cycle": "day",
                    "$and":[
                        {
                            "start":{
                                "$gte":starttime
                            }
                        },
                        {
                            "start":{
                                "$lte":endtime
                            }
                        }
                    ]
                }
            ]
        }
        return self.mongo.db.score_preferences.find(condition)
