import { AuthenticationModel } from "../models";

const initialState = new AuthenticationModel();

const authenticationReducer = (state = initialState, action) => {
    console.log('authen input :', action)
    switch (action.type) {
        case 'authentication/requestOTP':
            return action.payload;
        default:
            return state;
    }
};

export default authenticationReducer;
