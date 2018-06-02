module.exports = {
    // 获取token
    getToken : `http://something-api.nibirutech.com/dd/get_token/isRelease/${process.env.NODE_ENV == 'development' ? 0 : 1}`,
    // 获取ticket
    getTicket : `http://something-api.nibirutech.com/dd/get_ticket/isRelease/${process.env.NODE_ENV == 'development' ? 0 : 1}`,
    // 获取signature
    getSignature : `http://something-api.nibirutech.com/dd/get_signature/isRelease/${process.env.NODE_ENV == 'development' ? 0 : 1}`,
    // get 获取部门列表
    getDepartmentList : 'https://oapi.dingtalk.com/department/list',
    // get 获取部门详情
    getDepartmentInfo : 'https://oapi.dingtalk.com/department/get',
    // get 获取部门的所有上级父部门路径
    getDepartmentParents : 'https://oapi.dingtalk.com/department/list_parent_depts_by_dept',
    // get 获取成员列表
    getUserSimpleList : 'https://oapi.dingtalk.com/user/simplelist',
    // get 获取成员列表详情
    getUserList : 'https://oapi.dingtalk.com/user/list',
    // get 获取成员身份
    getUserStatus : 'https://oapi.dingtalk.com/user/getuserinfo',
    // get 获取成员信息
    getUserInfo : 'https://oapi.dingtalk.com/user/get',
    // get 获取指定用户的所有上级父部门路径
    getListParentDepts : 'https://oapi.dingtalk.com/department/list_parent_depts',
    // post 发送面试签到机器人连接
    robotMessage : process.env.NODE_ENV == 'development' ? 'https://oapi.dingtalk.com/robot/send?access_token=ec8a2ed62cad35416806f85eca86763ecaba5fea2ca935067638960c97e9185c' : 'https://oapi.dingtalk.com/robot/send?access_token=cb94abaeed90726030cbc9a7f5e05bb4f1dea65cee93cabd6420c96f4f46a6b1',
    // post 发送新简历通知
    robotMessageNewCv : process.env.NODE_ENV == 'development' ? 'https://oapi.dingtalk.com/robot/send?access_token=ec8a2ed62cad35416806f85eca86763ecaba5fea2ca935067638960c97e9185c' : 'https://oapi.dingtalk.com/robot/send?access_token=293ca84e56d7b67f31d728342b6aa69800840e06c47aa3e36c1d7c8926703a66',
};