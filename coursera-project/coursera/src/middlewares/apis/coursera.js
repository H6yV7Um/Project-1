export const coursera = SERVER => {
    return {
        ADD : `${SERVER}/add`,

        SEARCH_NAME :`${SERVER}/search_name`,

        GET_DEPARTMENT: `${SERVER}/get_department`,

        GET_CONRSERA_LIST: `${SERVER}/get_courseralist`,

        GET_SEARCH_LIST: `${SERVER}/search_list`,

        GET_ALL_COURSERA_LIST: `${SERVER}/get_allcourseralist`,

        ZE_URL: `${SERVER}/ze_url`,

        IMPORT: `${SERVER}/get_file`,

        FILTER: `${SERVER}/filter`,

        GET_SCHOOL: `${SERVER}/get_school`,

        GET_LATEST_COURSERA_LIST: `${SERVER}/get_latestcourseralist`,

        RESET_DB_COURSERA: `${SERVER}/reset_dbcoursera`,

        GET_SEARCH_PERSONAL_LIST: `${SERVER}/search_personallist`,

        CROSSS_DOMAIN: `${SERVER}/cross_domain`,

        GET_PERSONAL_DEPARTMENT: `${SERVER}/get_personal_department`,

        DELETE: `${SERVER}/delete`,

        MANAGEMENT_SAVE_MANAGEMENT: `${SERVER}/savemanagement`,

        TRAIN_SEARCH_COURSERA_BY_DEPARTMENT: `${SERVER}/search_coursera_by_department`,

    }
}