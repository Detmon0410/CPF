import httpClient from "./httpClient.service";
import { server } from "./constants.service";

export function createShiftService(data) {
  const Axiosmodel = server.CREATE_SHIFT;
  return new Promise((resolve, reject) => {
    httpClient({
      method: "POST",
      url: Axiosmodel.url,
      config: Axiosmodel,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getEmployeeService() {
  const Axiosmodel = server.GET_EMPLOYEE_LIST;
  return new Promise((resolve, reject) => {
    httpClient({
      method: "GET",
      url: Axiosmodel.url,
      config: Axiosmodel,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getAllShiftService() {
  const Axiosmodel = server.GET_ALL_SHIFT;
  return new Promise((resolve, reject) => {
    httpClient({
      method: "GET",
      url: Axiosmodel.url,
      config: Axiosmodel,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getShiftService(data) {
  const Axiosmodel = server.GET_SHIFT;
  return new Promise((resolve, reject) => {
    httpClient({
      method: "POST",
      url: Axiosmodel.url,
      config: Axiosmodel,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function postAssignEmployee(data) {
  const Axiosmodel = server.ASSIGN_EMPLOYEE;
  return new Promise((resolve, reject) => {
    httpClient({
      method: "POST",
      url: Axiosmodel.url,
      config: Axiosmodel,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function postUnassignEmployee(data) {
  const Axiosmodel = server.UNASSIGN_EMPLOYEE;
  return new Promise((resolve, reject) => {
    httpClient({
      method: "POST",
      url: Axiosmodel.url,
      config: Axiosmodel,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function postEditShift(data) {
  const Axiosmodel = server.EDIT_SHIFT;
  return new Promise((resolve, reject) => {
    httpClient({
      method: "POST",
      url: Axiosmodel.url,
      config: Axiosmodel,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function postAddOT(data) {
  const Axiosmodel = server.ADD_OT;
  return new Promise((resolve, reject) => {
    httpClient({
      method: "POST",
      url: Axiosmodel.url,
      config: Axiosmodel,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// start_time: "2021-01-01 00:00:00"
// end_time: "2021-01-01 00:00:00"
export function addTime(data) {
  const Axiosmodel = server.ADD_WORK_TIME;
  return new Promise((resolve, reject) => {
    httpClient({
      method: "POST",
      url: Axiosmodel.url,
      config: Axiosmodel,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getUserInfo() {
  const Axiosmodel = server.USER_INFO;
  return new Promise((resolve, reject) => {
    httpClient({
      method: "GET",
      url: Axiosmodel.url,
      config: Axiosmodel,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getUserWorkList() {
  const Axiosmodel = server.USER_WORK_LIST;
  return new Promise((resolve, reject) => {
    httpClient({
      method: "GET",
      url: Axiosmodel.url,
      config: Axiosmodel,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getUserWorkerList(data) {
  const Axiosmodel = server.USER_WORKER_IN_SHIFT;
  return new Promise((resolve, reject) => {
    httpClient({
      method: "POST",
      url: Axiosmodel.url,
      config: Axiosmodel,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
