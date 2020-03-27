import * as ACTION_TYPES from './action.types'
export const login_success = () => {
    return {
      type: ACTION_TYPES.LOGIN_SUCCESS
    }
}
  
export const login_failure = () => {
    return {
        type: ACTION_TYPES.LOGIN_FAILURE
    }
}

export const add_profile = (profile) => {
    return {
      type: ACTION_TYPES.ADD_PROFILE,
      payload: profile
    }
}
  
export const remove_profile = () => {
    return {
        type: ACTION_TYPES.REMOVE_PROFILE
    }
}

export const set_db_profile = (db_profile) => {
    return {
      type: ACTION_TYPES.SET_DB_PROFILE,
      payload: db_profile
    }
}
  
export const remove_db_profile = () => {
    return {
        type: ACTION_TYPES.REMOVE_DB_PROFILE
    }
}

export const set_customer = (customers) => {
    return {
        type: ACTION_TYPES.SET_CUSTOMER,
        payload: customers
    }
}

export const set_rider = (riders) => {
    return {
        type: ACTION_TYPES.SET_RIDER,
        payload: riders
    }
}