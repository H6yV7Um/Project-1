# -*- coding: utf-8 -*-
""" Workflow Service Class"""
import datetime
import libs
from flask import request
from workflow.model.solution import Solution as solution_model
from workflow.model import Workflow as workflow_model
from workflow.model.file import File as file_model
from organization.model.user import User as user_model
from dding import Dding
from urllib import quote
class Workflow(object):
    """ Workflow Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.solution_model = solution_model(self.mongo)
        self.workflow_model = workflow_model(self.mongo)
        self.file_model = file_model(self.mongo)
        self.user_model = user_model(self.mongo)
        self.dding = Dding(self.mongo)

    def list_all(self):
        """ list all workflow """
        data = self.solution_model.list_all()
        return data, 0, ''

    def add(self, solution_id, fields):
        now = datetime.datetime.now()
        token = request.cookies.get('token')
        creator = self.user_model.find_user_token(token)
        solution = self.solution_model.find(solution_id)
        nodes = self.flow_generator(solution['flow'], fields, '0', creator['_id'])
        copyto_users = []
        next_user = []
        for user in solution['copyto']:
            usermodel = self.user_model.find_id(user)
            copyto_users.append(usermodel['user_id'])

        usermodel = self.user_model.find_id(nodes[0])
        next_user.append(usermodel['user_id'])

        self.dding.send_link(copyto_users, "审批提醒", creator['name']+"于"+now.strftime("%Y-%m-%d %H:%M:%S")+"发起了"+solution['name']+"审批并抄送您。", "http://office.tap4fun.com/hrs/jump?url="+quote("http://office.tap4fun.com/workflow/copyto"))

        self.dding.send_link(next_user, "审批提醒", creator['name']+"于"+now.strftime("%Y-%m-%d %H:%M:%S")+"发起了"+solution['name']+"审批，等待您的审批。", "http://office.tap4fun.com/hrs/jump?url="+quote("http://office.tap4fun.com/workflow/pending"))

        return self.workflow_model.add(solution_id, fields, nodes, creator['_id']), 0, ''

    def flow_generator(self, flow, fields, parentNode, creator):
        current = {}
        result = []
        for node in flow:
            if node['source'] == parentNode and node['type'] == 'action':
                current = node
                break
            elif node['source'] == parentNode and node['type'] == 'condition':
                current = node
                break
        if not current:
            return []

        if current['type'] == 'action':
            result += self.user_generator(current, creator)
            result += self.flow_generator(flow, fields, current['id'], creator)

        elif current['type'] == 'condition':
            final_node = {}
            
            for index, node in enumerate(flow):
                if node['source'] == current['source'] and node['fieldType']=='select':
                    if fields[node['namespace']] in node['options']:
                        final_node = node
                        break
                if node['source'] == current['source'] and node['fieldType']=='number':
                    if node['operator'] == '>' and fields[node['namespace']] > node['fillNumber']:
                        final_node = node
                        break
                    if node['operator'] == '=' and fields[node['namespace']] == node['fillNumber']:
                        final_node = node
                        break
                    if node['operator'] == '<' and fields[node['namespace']] < node['fillNumber']:
                        final_node = node
                        break
                    if node['operator'] == '>=' and fields[node['namespace']] >= node['fillNumber']:
                        final_node = node
                        break
                    if node['operator'] == '<=' and fields[node['namespace']] <= node['fillNumber']:
                        final_node = node
                        break
                if node['source'] == current['source'] and node['fieldType']=='date':
                    if fields[node['namespace']]['dateType'] == 'dateRange':
                        start = libs.str_to_utc(fields[node['namespace']]['value'][0], "%Y-%m-%d")
                        end = libs.str_to_utc(fields[node['namespace']]['value'][1], "%Y-%m-%d") + datetime.timedelta(days=1)
                        current_minutes = (end - start).days*24*60
                        if node['cycle_day'] == -1:
                            last_cycle_time_arr = flow[index-1]['cycle_time'].split(':')
                            last_cycle_minutes = flow[index-1]['cycle_day']*24*60+int(last_cycle_time_arr[0])*60+int(last_cycle_time_arr[1])
                            if current_minutes > last_cycle_minutes:
                                    final_node = node
                                    break
                        else:
                            cycle_time_arr = node['cycle_time'].split(':')
                            cycle_minutes = node['cycle_day']*24*60+int(cycle_time_arr[0])*60+int(cycle_time_arr[1])

                            if index==0:
                                if current_minutes>0 and current_minutes<=cycle_minutes:
                                    final_node = node
                                    break
                            else:
                                last_cycle_time_arr = flow[index-1]['cycle_time'].split(':')
                                last_cycle_minutes = flow[index-1]['cycle_day']*24*60+int(last_cycle_time_arr[0])*60+int(last_cycle_time_arr[1])
                                if current_minutes>last_cycle_minutes and current_minutes<=cycle_minutes:
                                    final_node = node
                                    break
                    elif fields[node['namespace']]['dateType'] == 'timeRange':
                        start = libs.str_to_utc(fields[node['namespace']]['value'][0], "%Y-%m-%d %H:%M")
                        end = libs.str_to_utc(fields[node['namespace']]['value'][1], "%Y-%m-%d %H:%M") + datetime.timedelta(minutes=1)
                        current_minutes = (end - start).seconds/60
                        if node['cycle_day'] == -1:
                            last_cycle_time_arr = flow[index-1]['cycle_time'].split(':')
                            last_cycle_minutes = flow[index-1]['cycle_day']*24*60+int(last_cycle_time_arr[0])*60+int(last_cycle_time_arr[1])
                            if current_minutes > last_cycle_minutes:
                                    final_node = node
                                    break
                        else:
                            cycle_time_arr = node['cycle_time'].split(':')
                            cycle_minutes = node['cycle_day']*24*60+int(cycle_time_arr[0])*60+int(cycle_time_arr[1])

                            if index==0:
                                if current_minutes>0 and current_minutes<=cycle_minutes:
                                    final_node = node
                                    break
                            else:
                                last_cycle_time_arr = flow[index-1]['cycle_time'].split(':')
                                last_cycle_minutes = flow[index-1]['cycle_day']*24*60+int(last_cycle_time_arr[0])*60+int(last_cycle_time_arr[1])
                                if current_minutes>last_cycle_minutes and current_minutes<=cycle_minutes:
                                    final_node = node
                                    break
            result += self.flow_generator(flow, fields, final_node['id'], creator)
        return result

    def time_convert_to_minutes(self, days, time_str):
        time_str_arr = time_str.split(':')
        total = (days*24*60) + int(time_str_arr[0])*60 + int(time_str_arr[1])
        return total

    def user_generator(self, node, creator):
        user = {}
        result = []
        if node['approvalWay']==3:
            return [node['approvalObject']['id']]

        if node['approvedObject'] == '0':
            user = self.user_model.find_id(creator)
        else:
            user = self.user_model.find_id(node['approvedObject'])
        if not user:
            return result
        users = self._user_generator(user, node['approvalWay'], [])
        if node['level'] == 1 and users:
            for index in range(len(users)):
                if node['selectLevel']<=(len(users)-index):
                    result.append(users[index])
        elif node['level'] == 2 and users:
            for index in range(len(users)):
                if len(result) >= node['selectLevel']:
                    break
                result.append(users[index])
        elif node['level'] == 3 and users:
            if len(users)>= node['selectLevel']:
                position = len(users) - node['selectLevel']
                if position >= 0:
                    result.append(users[position])
        return result

    def _user_generator(self, currentUser, _type, users):
        if _type==1 and currentUser['adminreport']:
            users.append(currentUser['adminreport'][0])
            user = self.user_model.find_id(currentUser['adminreport'][0])
            if user:
                users = self._user_generator(user, _type, users)
        elif _type==2 and currentUser['workreport']:
            users.append(currentUser['workreport'][0])
            user = self.user_model.find_id(currentUser['workreport'][0])
            if user:
                users = self._user_generator(user, _type, users)
        return users

    def find_own_workflow(self, status, pagination):
        result = {}
        cursor, result['count'] = self.workflow_model.find_own_workflow(status, 20, pagination)
        result['list'] = []
        for item in cursor:
            users = []
            solution = self.solution_model.find(item['solution_id'])
            item['solution'] = solution
            item['next_user'] = self.user_model.find_id(item['next'])
            item['creator_user'] = self.user_model.find_id(item['creator'])
            for userid in item['member']:
                users.append(self.user_model.find_id(userid))
            item['users'] = users
            for log in item['operation_log']:
                if log['type']=='comment':
                    log['picture_detail'] = []
                    log['attachment_detail'] = []
                    for picture in log['picture']:
                        log['picture_detail'].append(self.file_model.find(picture))
                    for attachment in log['attachment']:
                        log['attachment_detail'].append(self.file_model.find(attachment))

            result['list'].append(item)
        return result, 0, ""

    def find_own_pending_workflow(self, pagination):
        result = {}
        cursor, result['count'] = self.workflow_model.find_own_pending_workflow(20, pagination)
        result['list'] = []
        for item in cursor:
            users = []
            solution = self.solution_model.find(item['solution_id'])
            item['solution'] = solution
            item['next_user'] = self.user_model.find_id(item['next'])
            item['creator_user'] = self.user_model.find_id(item['creator'])
            for userid in item['member']:
                users.append(self.user_model.find_id(userid))
            item['users'] = users
            for log in item['operation_log']:
                if log['type']=='comment':
                    log['picture_detail'] = []
                    log['attachment_detail'] = []
                    for picture in log['picture']:
                        log['picture_detail'].append(self.file_model.find(picture))
                    for attachment in log['attachment']:
                        log['attachment_detail'].append(self.file_model.find(attachment))
            result['list'].append(item)
        return result, 0, ""

    def find_own_done_workflow(self, pagination):
        result = {}
        cursor, result['count'] = self.workflow_model.find_own_done_workflow(20, pagination)
        result['list'] = []
        for item in cursor:
            users = []
            solution = self.solution_model.find(item['solution_id'])
            item['solution'] = solution
            item['next_user'] = self.user_model.find_id(item['next'])
            item['creator_user'] = self.user_model.find_id(item['creator'])
            for userid in item['member']:
                users.append(self.user_model.find_id(userid))
            item['users'] = users
            for log in item['operation_log']:
                if log['type']=='comment':
                    log['picture_detail'] = []
                    log['attachment_detail'] = []
                    for picture in log['picture']:
                        log['picture_detail'].append(self.file_model.find(picture))
                    for attachment in log['attachment']:
                        log['attachment_detail'].append(self.file_model.find(attachment))
            result['list'].append(item)
        return result, 0, ""
    def find_own_copyto_workflow(self, pagination):
        result = {}
        cursor, result['count'] = self.workflow_model.find_own_copyto_workflow(20, pagination)
        result['list'] = []
        for item in cursor:
            users = []
            solution = self.solution_model.find(item['solution_id'])
            item['solution'] = solution
            item['next_user'] = self.user_model.find_id(item['next'])
            item['creator_user'] = self.user_model.find_id(item['creator'])
            for userid in item['member']:
                users.append(self.user_model.find_id(userid))
            item['users'] = users
            for log in item['operation_log']:
                if log['type']=='comment':
                    log['picture_detail'] = []
                    log['attachment_detail'] = []
                    for picture in log['picture']:
                        log['picture_detail'].append(self.file_model.find(picture))
                    for attachment in log['attachment']:
                        log['attachment_detail'].append(self.file_model.find(attachment))
            result['list'].append(item)
        return result, 0, ""

    def cancel(self, _id):
        result = self.workflow_model.cancel(_id)
        return result, 0, ""

    def audit(self, _id, status, content):
        now = datetime.datetime.now()
        result = self.workflow_model.audit(_id, status, content)
        creator = self.user_model.find_id(result['creator'])
        solution = self.solution_model.find(result['solution_id'])
        next_user = self.user_model.find_id(result['next'])
        if result['status'] == 0:
            self.dding.send_link([next_user['user_id']],
                                 "审批提醒",
                                 creator['name']+"于"+result['creation_time'].strftime("%Y-%m-%d %H:%M:%S")+"发起了"+solution['name']+"审批，等待您的审批。",
                                 "http://office.tap4fun.com/hrs/jump?url="+quote("http://office.tap4fun.com/workflow/pending")
                                )
        elif result['status'] == 1:
            self.dding.send_link([creator['user_id']],
                                 "审批提醒",
                                 "您发起的"+solution['name']+"审批，已于"+result['end_time'].strftime("%Y-%m-%d %H:%M:%S")+"通过。",
                                 "http://office.tap4fun.com/hrs/jump?url="+quote("http://office.tap4fun.com/workflow/history")
                                 )
        elif result['status'] == 2:
            self.dding.send_link([creator['user_id']],
                                 "审批提醒",
                                 "您发起的"+solution['name']+"审批，已于"+result['end_time'].strftime("%Y-%m-%d %H:%M:%S")+"被拒绝。",
                                 "http://office.tap4fun.com/hrs/jump?url="+quote("http://office.tap4fun.com/workflow/history")
                                 )

        return {}, 0, ""

    def comment(self, _id, content, picture, attachment):
        item = self.workflow_model.comment(_id, content, picture, attachment)
        users = []
        solution = self.solution_model.find(item['solution_id'])
        item['solution'] = solution
        item['next_user'] = self.user_model.find_id(item['next'])
        item['creator_user'] = self.user_model.find_id(item['creator'])
        for userid in item['member']:
            users.append(self.user_model.find_id(userid))
        item['users'] = users
        for log in item['operation_log']:
            if log['type']=='comment':
                log['picture_detail'] = []
                log['attachment_detail'] = []
                for picture in log['picture']:
                    log['picture_detail'].append(self.file_model.find(picture))
                for attachment in log['attachment']:
                    log['attachment_detail'].append(self.file_model.find(attachment))
        return item, 0, ""
