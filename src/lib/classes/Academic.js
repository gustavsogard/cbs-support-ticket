const User = require("./User");

class Academic extends User {
  constructor(
    userId,
    name,
    email,
    password,
    status,
    createdAt,
    passwordChangedAt,
    academicId,
    title,
    department,
    phone
  ) {
    super(userId, name, email, password, status, createdAt, passwordChangedAt);
    this.academicId = academicId;
    this.title = title;
    this.department = department;
    this.phone = phone;
  }
}
