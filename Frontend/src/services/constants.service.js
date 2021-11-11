import { AxiosModel } from "../models/index";

export const NETWORK_CONNECTION_MESSAGE = "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE = "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE = "An error has occurred. The photo was unable to upload.";
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const BACKEND_URL = `${process.env.REACT_APP_API_URL}apis/`;

export const server = {
  SIGN_IN: new AxiosModel({ url: `auth/signin` }),
  SIGN_UP: new AxiosModel({ url: `auth/signup` }),
  CREATE_SHIFT: new AxiosModel({ url: 'shift/create_shift'}),
  GET_EMPLOYEE_LIST: new AxiosModel({ url: 'user/get_employee_list'}),
  GET_ALL_SHIFT: new AxiosModel({ url: 'shift/get_all_shift'}),
  GET_SHIFT: new AxiosModel({ url: 'shift/get_shift'}),


};
