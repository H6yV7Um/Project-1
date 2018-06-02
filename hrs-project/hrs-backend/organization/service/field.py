""" Field Service Class"""
from operator import itemgetter
from organization.model.field import Field as field_model
class Field(object):
    """ Field Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.field_model = field_model(self.mongo)

    def add_group(self, name):
        """ add group """
        data = self.field_model.add_group(name)
        return data, 0, ''

    def update_group(self, _id, name):
        """ update group """
        self.field_model.update_group(_id, name)
        return {}, 0, ''

    def remove_group(self, _id):
        """ remove """
        self.field_model.remove_group(_id)
        return {}, 0, ''

    def sort_group(self, _id, old_index, new_index):
        """ sort group """
        self.field_model.sort_group(_id, old_index, new_index)
        return {}, 0, ''

    def list_group(self):
        """ list group """
        data = []
        cursor = self.field_model.list_group()
        for group in cursor:
            group['fields'].sort(key=itemgetter('index'))
            data.append(group)
        return data, 0, ''

    def add_field_input(self, groupid, name, namespace, require, modify, check, fill,
                        regex, warning, unique, remark):
        """ add input field """
        data = self.field_model.add_field_input(groupid, name, namespace, require, modify,
                                                check, fill, regex, warning, unique, remark)
        return data, 0, ''

    def add_field_select(self, groupid, name, namespace, require, modify, check, fill, remark, options):
        """ add select field """
        data = self.field_model.add_field_select(groupid, name, namespace, require, modify,
                                                 check, fill, remark, options)
        return data, 0, ''

    def add_field_file(self, groupid, name, namespace, require, modify, check, fill, filetype,
                       size, maximum, remark):
        """ add upload file field """
        data = self.field_model.add_field_file(groupid, name, namespace, require, modify, check, fill,
                                               filetype, size, maximum, remark)
        return data, 0, ''

    def add_field_date(self, groupid, name, namespace, require, modify, check, fill, remark):
        """ add date field """
        data = self.field_model.add_field_date(groupid, name, namespace, require, modify,
                                               check, fill, remark)
        return data, 0, ''

    def add_field_department(self, groupid, name, namespace, require, modify, check, fill,
                             remark, multiple, tree_check_strictly):
        """ add date field """
        data = self.field_model.add_field_department(groupid, name, namespace, require,
                                                     modify, check, fill, remark, multiple,
                                                     tree_check_strictly)
        return data, 0, ''

    def add_field_member(self, groupid, name, namespace, require, modify, check, fill, remark, multiple):
        """ add date field """
        data = self.field_model.add_field_member(groupid, name, namespace,
                                                 require, modify, check, fill, remark, multiple)
        return data, 0, ''

    def update_field_input(self, fieldid, name, namespace, require,
                           modify, check, fill, regex, warning, unique, remark):
        """ update input field """
        data = self.field_model.update_field_input(fieldid, name, namespace, require, modify,
                                                   check, fill, regex, warning, unique, remark)
        return data, 0, ''

    def update_field_select(self, fieldid, name, namespace, require,
                            modify, check, fill, remark, options):
        """ update select field """
        data = self.field_model.update_field_select(fieldid, name, namespace, require, modify,
                                                    check, fill, remark, options)
        return data, 0, ''

    def update_field_file(self, fieldid, name, namespace, require,
                          modify, check, fill, filetype, size, maximum, remark):
        """ update file field """
        data = self.field_model.update_field_file(fieldid, name, namespace, require, modify,
                                                  check, fill, filetype, size, maximum, remark)
        return data, 0, ''

    def update_field_date(self, fieldid, name, namespace, require, modify, check, fill, remark):
        """ update date field """
        data = self.field_model.update_field_date(fieldid, name, namespace,
                                                  require, modify, check, fill, remark)
        return data, 0, ''

    def update_field_department(self, fieldid, name, namespace, require, modify,
                                check, fill, remark, multiple, treeCheckStrictly):
        """ update date field """
        data = self.field_model.update_field_department(fieldid, name, namespace, require, modify,
                                                        check, fill, remark, multiple,
                                                        treeCheckStrictly)
        return data, 0, ''

    def update_field_member(self, fieldid, name, namespace, require,
                            modify, check, fill, remark, multiple):
        """ update date field """
        data = self.field_model.update_field_member(fieldid, name, namespace,
                                                    require, modify, check, fill, remark, multiple)
        return data, 0, ''

    def remove_field(self, fieldid):
        """ remove field """
        self.field_model.remove_field(fieldid)
        return {}, 0, ''

    def sort_field(self, _id, old_index, new_index):
        """ sort field """
        self.field_model.sort_field(_id, old_index, new_index)
        return {}, 0, ''

    def find_field(self, _id):
        """ find field """
        result = self.field_model.find(_id)
        return result, 0, ''
