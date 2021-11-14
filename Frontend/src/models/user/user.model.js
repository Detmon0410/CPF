export class UserModel {
  constructor() {
    this.employee_id = null;
    this.firstname = null;
    this.lastname = "Employee Name";
    this.is_manager = false;
  }

  isAdmin() {
    return this.is_manager === 1 ? true : false;
  }
}
