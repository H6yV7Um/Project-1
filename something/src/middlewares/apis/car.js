export const car = SERVER => {
    return {
        /**
         * 新增车
         * @param num 车牌号
         * @param photo 照片
         * @param parking 车位
         * @param color 颜色
         * @param frequency 停车频率
         */
        CAR_ADD : `${SERVER}/car/add`,

        /**
         * 获取车
         * @param car_id 车ID
         */
        CAR_GET : `${SERVER}/car/get`,

        /**
         * 获取车列表
         */
        CAR_GET_LIST : `${SERVER}/car/get_list`,

        /**
         * 编辑车
         * @param car_id 车ID
         * @param num 车牌号
         * @param photo 照片
         * @param parking 车位
         * @param color 颜色
         * @param frequency 停车频率
         */
        CAR_EDIT : `${SERVER}/car/edit`,

        /**
         * 删除车
         * @param carId 车ID
         */
        CAR_DELETE : `${SERVER}/car/delete`
    }
}