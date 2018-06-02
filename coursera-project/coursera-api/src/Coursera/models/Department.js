const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    // 部门ID
    department_name : {
        type : String
    },
    user_num : {
        type : Number
    },
    company_num: {
        type : Number
    }
})
module.exports = mongoose.model('department', Schema);
