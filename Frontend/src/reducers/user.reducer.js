import { UserModel } from "../models";

const initialState = new UserModel();

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
