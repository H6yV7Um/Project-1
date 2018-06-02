# -*- coding: utf-8 -*-
"""
    HRS
    ~~~~~~~~

    A tap4fun HR system written with Flask and mongodb.

    :copyright: (c) 2016 by Bob Yeoh.
    :license: BSD, see LICENSE for more details.
"""
import os
import sys
import config
import datetime
from flask import Flask
from flask_cors import CORS, cross_origin

from celery import Celery, platforms
from celery.result import AsyncResult
from celery.schedules import crontab

from attendance.service.log import Log as Log_Service

from blueprint.dding import DDING
from blueprint.performance.preferences import PREFERENCES

from blueprint.organization.department import DEPARTMENT
from blueprint.organization.field import FIELD
from blueprint.organization.file import FILE
from blueprint.organization.permission import PERMISSION
from blueprint.organization.user import USER

from blueprint.kernel.module import MODULE
from blueprint.kernel.menu import MENU

from blueprint.remuneration.taxes import TAXES
from blueprint.remuneration.insurance import INSURANCE
from blueprint.remuneration.fund import FUND
from blueprint.remuneration.salary import SALARY
from blueprint.remuneration.salary_setting import SALARY_SETTING

from blueprint.attendance.machine import MACHINE
from blueprint.attendance.cycle import CYCLE
from blueprint.attendance.rule import RULE
from blueprint.attendance.calendar import CALENDAR

from blueprint.workflow.solution import SOLUTION
from blueprint.workflow import WORKFLOW
from blueprint.workflow.file import WORKFLOW_FILE

from libs import __result
from mongo import MONGO

reload(sys)
sys.setdefaultencoding('utf8')
# Setting encoding

APP = Flask(__name__)
APP.config.from_object(__name__)
# Initialize flask

CORS(APP)
cross_origin(APP)
# Setting cross origin

APP.config['MONGO_DBNAME'] = config.mongo
APP.config['MONGO_CONNECT'] = False
MONGO.init_app(APP)
# Setting mongodb

APP.config['CELERY_BROKER_URL'] = config.celery_redis
APP.config['CELERY_RESULT_BACKEND'] = config.celery_redis
APP.config['CELERY_TIMEZONE'] = 'Asia/Shanghai'
APP.config['CELERYBEAT_SCHEDULE'] = {
    'synch_attendance':
    {
        'task': 'hrs.__synch_attendance',
        'schedule': datetime.timedelta(seconds=60),
        'args': ()
    }
}

CELERY = Celery('hrs', broker=APP.config['CELERY_BROKER_URL'])
CELERY.conf.update(APP.config)

@CELERY.task(bind=True)
def __synch_attendance(self):
    with APP.app_context():
        log_service = Log_Service(MONGO)
        log_service.synch()
        print "synch"

# Celery configuration
@APP.route('/version', methods=['GET', 'POST'])
def __version():
    """ Display Project Version """
    print os.getcwd()
    print config.version
    return __result({"version":config.version}, 0, "")

APP.register_blueprint(DEPARTMENT, url_prefix='/organization/department')
APP.register_blueprint(FIELD, url_prefix='/organization/field')
APP.register_blueprint(FILE, url_prefix='/organization/file')
APP.register_blueprint(PERMISSION, url_prefix='/organization/permission')
APP.register_blueprint(USER, url_prefix='/organization/user')

APP.register_blueprint(DDING, url_prefix='/dding')
APP.register_blueprint(PREFERENCES, url_prefix='/performance/preferences')

APP.register_blueprint(MODULE, url_prefix='/kernel/module')
APP.register_blueprint(MENU, url_prefix='/kernel/menu')

APP.register_blueprint(TAXES, url_prefix='/remuneration/taxes')
APP.register_blueprint(INSURANCE, url_prefix='/remuneration/insurance')
APP.register_blueprint(FUND, url_prefix='/remuneration/fund')
APP.register_blueprint(SALARY, url_prefix='/remuneration/salary')
APP.register_blueprint(SALARY_SETTING, url_prefix='/remuneration/salary_setting')

APP.register_blueprint(MACHINE, url_prefix='/attendance/machine')
APP.register_blueprint(CYCLE, url_prefix='/attendance/cycle')
APP.register_blueprint(RULE, url_prefix='/attendance/rule')
APP.register_blueprint(CALENDAR, url_prefix='/attendance/calendar')

APP.register_blueprint(SOLUTION, url_prefix='/workflow/solution')
APP.register_blueprint(WORKFLOW_FILE, url_prefix='/workflow/file')
APP.register_blueprint(WORKFLOW, url_prefix='/workflow')
