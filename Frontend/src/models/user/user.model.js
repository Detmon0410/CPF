export class UserModel {
  constructor() {
    this.avatar = null;
    this.name = "Employee Name";
    this.role = 0;
  }

  isAdmin() {
    return this.role === 1 ? true : false;
  }
}
