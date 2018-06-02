export const coursera = SERVER => {
    return {
        /**
         * 新coursera
         * @param name 姓名
         * @param department 部门
         * @param date 日期
         * @param school 学校名称
         * @param courseraname 课程名称
         * @param certificate 课程链接
         */
        COURSERA_ADD : `${SERVER}/coursera/add`,

        /**
         * 获取车
         * @param car_id 车ID
         */
        CAR_GET : `${SERVER}/car/get`,
    }
}