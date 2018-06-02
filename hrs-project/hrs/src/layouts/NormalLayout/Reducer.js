import {ACTIONS} from './Action'

const initialState = {

}

// ------------------------------------
// Reducer
// ------------------------------------

const Reducer = (state = initialState, action) => {
    switch (action.type) {

        case ACTIONS.LOADING_START:
            console.log('loading start')
            break

        case ACTIONS.LOADING_STOP:
            console.log('loading stop')
            break

    }

    return {...state}
}
export default Reducer
