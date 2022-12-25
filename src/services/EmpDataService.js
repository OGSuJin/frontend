// 2)
import http from "../http-common";

class EmpDataService {
  getAll(ename, page, size) {
    return http.get(`/emp?ename=${ename}&page=${page}&size=${size}`);
  }

  get(eno) {
    return http.get(`/emp/${eno}`);
  }

  create(data) {
    return http.post("/emp", data);
  }

  update(eno, data) {
    return http.put(`/emp/${eno}`, data);
  }

  delete(eno) {
    return http.delete(`/emp/deletion/${eno}`);
  }

  deleteAll() {
    return http.delete(`/emp/all`);
  }

  // findByDname(ename) {
  //   return http.get(`/emp?ename=${ename}`);
  // }
}

export default new EmpDataService();
