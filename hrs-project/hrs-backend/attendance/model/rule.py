""" Rule Model Class """
from bson import ObjectId

class Rule(object):
    """ Machine Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def update_late(self, fee, free_times, remark):
        """ update late rule """
        if not self.mongo.db.attendance_rule.count({"type": "late"}):
            data = {
                "_id": ObjectId(),
                "fee": fee,
                "free_times": free_times,
                "remark": remark,
                "type": "late"
            }
            self.mongo.db.attendance_rule.insert_one(data)
            return data
        else:
            data = {
                "fee": fee,
                "free_times": free_times,
                "remark": remark
            }
            self.mongo.db.attendance_rule.update({"type": "late"}, {"$set":data})
            return self.mongo.db.attendance_rule.find_one({"type": "late"})

    def update_absenteeism(self, fee, free_hours, remark):
        """ update absenteeism rule """
        if not self.mongo.db.attendance_rule.count({"type": "absenteeism"}):
            data = {
                "_id": ObjectId(),
                "fee": fee,
                "free_hours": free_hours,
                "remark": remark,
                "type": "absenteeism"
            }
            self.mongo.db.attendance_rule.insert_one(data)
            return data
        else:
            data = {
                "fee": fee,
                "free_hours": free_hours,
                "remark": remark
            }
            self.mongo.db.attendance_rule.update({"type": "absenteeism"}, {"$set":data})
            return self.mongo.db.attendance_rule.find_one({"type": "absenteeism"})

    def update_overtime(self, weekday_fee, weekend_fee,
                        weekday_minimum_pay_hours, weekend_minimum_pay_hours,
                        weekday_multiple_payment, weekend_multiple_payment, remark):
        """ update overtime rule """
        if not self.mongo.db.attendance_rule.count({"type": "absenteeism"}):
            data = {
                "_id": ObjectId(),
                "weekday_fee": weekday_fee,
                "weekend_fee": weekend_fee,
                "weekday_minimum_pay_hours": weekday_minimum_pay_hours,
                "weekend_minimum_pay_hours": weekend_minimum_pay_hours,
                "weekday_multiple_payment": bool(int(weekday_multiple_payment)),
                "weekend_multiple_payment": bool(int(weekend_multiple_payment)),
                "remark": remark,
                "type": "overtime"
            }
            self.mongo.db.attendance_rule.insert_one(data)
            return data
        else:
            data = {
                "weekday_fee": weekday_fee,
                "weekend_fee": weekend_fee,
                "weekday_minimum_pay_hours": weekday_minimum_pay_hours,
                "weekend_minimum_pay_hours": weekend_minimum_pay_hours,
                "weekday_multiple_payment": bool(int(weekday_multiple_payment)),
                "weekend_multiple_payment": bool(int(weekend_multiple_payment)),
                "remark": remark
            }
            self.mongo.db.attendance_rule.update({"type": "overtime"}, {"$set":data})
            return self.mongo.db.attendance_rule.find_one({"type": "overtime"})

    def update_days_off(self, fee, remark):
        """ update days off rule """
        if not self.mongo.db.attendance_rule.count({"type": "daysoff"}):
            data = {
                "_id": ObjectId(),
                "fee": fee,
                "remark": remark,
                "type": "daysoff"
            }
            self.mongo.db.attendance_rule.insert_one(data)
            return data
        else:
            data = {
                "fee": fee,
                "remark": remark,
                "type": "daysoff"
            }
            self.mongo.db.attendance_rule.update({"type": "daysoff"}, {"$set":data})
            return self.mongo.db.attendance_rule.find_one({"type": "daysoff"})

    def update_business_trip(self, fee, remark):
        """ update days off rule """
        if not self.mongo.db.attendance_rule.count({"type": "businesstrip"}):
            data = {
                "_id": ObjectId(),
                "fee": fee,
                "remark": remark,
                "type": "businesstrip"
            }
            self.mongo.db.attendance_rule.insert_one(data)
            return data
        else:
            data = {
                "fee": fee,
                "remark": remark,
                "type": "businesstrip"
            }
            self.mongo.db.attendance_rule.update({"type": "businesstrip"}, {"$set":data})
            return self.mongo.db.attendance_rule.find_one({"type": "businesstrip"})

    def update_annual_vacation(self, days, clear_date, remark):
        """ update annual vacation rule """
        if not self.mongo.db.attendance_rule.count({"type": "annualvacation"}):
            data = {
                "_id": ObjectId(),
                "days": days,
                "remark": remark,
                "clear_date": clear_date,
                "type": "annualvacation"
            }
            self.mongo.db.attendance_rule.insert_one(data)
            return data
        else:
            data = {
                "days": days,
                "remark": remark,
                "clear_date": clear_date,
                "type": "annualvacation"
            }
            self.mongo.db.attendance_rule.update({"type": "annualvacation"}, {"$set":data})
            return self.mongo.db.attendance_rule.find_one({"type": "annualvacation"})

    def add_leave(self, name, fee, deduct_subsidy, deduct_type, remark):
        """ add leave type """
        data = {
            "_id": ObjectId(),
            "name": name,
            "fee": fee,
            "deduct_subsidy": bool(int(deduct_subsidy)),
            "deduct_type": deduct_type,
            "remark": remark,
            "type": "leave"
        }
        self.mongo.db.attendance_rule.insert_one(data)
        return data

    def remove(self, _id):
        """ remove one file """
        _id = ObjectId(_id)
        return self.mongo.db.attendance_rule.remove({"_id":_id})

    def find(self, _id):
        """ find one file """
        _id = ObjectId(_id)
        return self.mongo.db.attendance_rule.find_one({"_id":_id})

    def list(self):
        """ find one file """
        return self.mongo.db.attendance_rule.find({"type": "leave"})

    def list_others(self):
        """ find one file """
        return self.mongo.db.attendance_rule.find({"type": {"$ne":"leave"}})

    def update_leave(self, _id, name, fee, deduct_subsidy, deduct_type, remark):
        """ update machine information """
        _id = ObjectId(_id)
        self.mongo.db.attendance_rule.update(
            {
                "_id": ObjectId(_id)
            },
            {
                "$set":
                {
                    "name": name,
                    "fee": fee,
                    "deduct_subsidy": bool(int(deduct_subsidy)),
                    "deduct_type": deduct_type,
                    "remark": remark
                }
            })
        return self.mongo.db.attendance_rule.find_one({"_id": ObjectId(_id)})
