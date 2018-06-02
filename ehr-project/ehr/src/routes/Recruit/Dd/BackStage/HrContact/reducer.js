import {ACTION_TYPES} from './action';

const initialState = {
    // HR联系方式列表
    hrs        :   null,
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        case ACTION_TYPES.RECRUIT_DD_BACKSTAGE_GET_HRCONTACT:
            newState.hrs = action.data;
            break;
    }

    return {...newState};
}