""" Machine Service Class"""
from attendance.model.machine import Machine as machine_model

class Machine(object):
    """ Machine Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.machine_model = machine_model(self.mongo)

    def list_machines(self):
        """ list all machines """
        data = self.machine_model.list_machines()
        return data, 0, ''

    def add(self, serial_number, ip_address, location):
        """ add machine """
        data = self.machine_model.add(serial_number, ip_address, location)
        return data, 0, ''

    def update(self, _id, serial_number, ip_address, location):
        """ update machine """
        data = self.machine_model.update(_id, serial_number, ip_address, location)
        return data, 0, ''

    def remove(self, _id):
        """ remove machine """
        self.machine_model.remove(_id)
        return {}, 0, ''
