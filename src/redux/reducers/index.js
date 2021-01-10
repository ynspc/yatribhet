import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer' 
import ErrorReducer from './ErrorReducer'

import TopDestiLists from './PlaceReducer'

export default combineReducers({
    authentication: AuthReducer,
    error: ErrorReducer,
    topDestination: TopDestiLists
})