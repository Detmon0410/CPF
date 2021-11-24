import { AxiosModel } from "../models/index";

export const NETWORK_CONNECTION_MESSAGE = "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE = "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE = "An error has occurred. The photo was unable to upload.";
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const BACKEND_URL = `${process.env.REACT_APP_API_URL}apis/`;

export const server = {
  REQUEST_OTP: new AxiosModel({ url: `auth/get_otp` }),
  SIGN_IN: new AxiosModel({ url: `auth/signin` }),
  SIGN_UP: new AxiosModel({ url: `auth/signup` }),
  CREATE_SHIFT: new AxiosModel({ url: 'shift/create_shift'}),
  GET_EMPLOYEE_LIST: new AxiosModel({ url: 'user/get_employee_list'}),
  GET_ALL_SHIFT: new AxiosModel({ url: 'shift/get_all_shift'}),
  GET_SHIFT: new AxiosModel({ url: 'shift/get_shift'}),
  ASSIGN_EMPLOYEE: new AxiosModel({ url: 'shift/assign_employee'}),
  UNASSIGN_EMPLOYEE: new AxiosModel({ url: 'shift/unassign_employee'}),
  EDIT_SHIFT: new AxiosModel({ url: 'shift/edit_shift'}),
  ADD_OT: new AxiosModel({ url: 'shift/add_ot'}),
  ADD_WORK_TIME: new AxiosModel({ url: 'user/enter_work_time' }),
  USER_INFO: new AxiosModel({ url: 'user/user_detail' }),
  USER_WORK_LIST: new AxiosModel({ url: 'user/get_user_work_time' }),
  USER_WORKER_IN_SHIFT: new AxiosModel({ url: 'shift/get_employee_list_except_employee_already_in_shift' }),
  UPLOAD_FILE: new AxiosModel({ url: `/user/import_employee` }),
};
