""" Log Service Class"""
import requests
import sqlite3
import datetime
import libs
import config
from attendance.model.log import Log as log_model
from attendance.model.machine import Machine as machine_model
class Log(object):
    """ Machine Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.log_model = log_model(self.mongo)
        self.machine_model = machine_model(self.mongo)

    def synch(self):
        """ synch log data from machines """
        machines = self.machine_model.list_machines()
        for machine in machines:
            self._load(machine)

    def _load(self, machine):
        """ download database """
        filename = config.disk_path+"/attendance_log/"+str(machine['_id'])
        try:
            read = requests.get("http://"+machine['ip_address']+"/ZKDB.db", stream=True)
            database = open(filename, "wb")
            for chunk in read.iter_content(chunk_size=512):
                if chunk:
                    database.write(chunk)
            database.close()
            self._add(machine)
        except Exception, err:
            print err

    def _add(self, machine):
        """ add log """
        filename = config.disk_path+"/attendance_log/"+str(machine['_id'])
        conn = sqlite3.connect(filename)
        cursor = conn.cursor()
        update_time = libs.utc_to_local(machine['updatetime']).strftime("%Y-%m-%d %H:%M:%S")
        sql = "select * from ATT_LOG where Verify_Time>'"+ update_time +"' order by Verify_Time asc"
        rows = cursor.execute(sql)
        verify_time = ''
        for row in rows:
            verify_time = libs.str_to_utc(row[3], "%Y-%m-%dT%H:%M:%S")
            self.log_model.add(row[1], verify_time, str(machine['_id']))
        if verify_time:
            self.machine_model.update_time(str(machine['_id']), verify_time)

