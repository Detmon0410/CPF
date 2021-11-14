import { UserModel } from "../models";

const initialState = new UserModel();

const userReducer = (state = initialState, action) => {
  console.log('user input :', action)
  switch (action.type) {
    case 'user/signin':
      return action.payload
    default:
      return state;
  }
};

export default userReducer;
