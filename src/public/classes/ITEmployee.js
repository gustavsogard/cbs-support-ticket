class ITEmployee extends User {
  constructor(
    userId,
    name,
    email,
    password,
    status,
    createdAt,
    passwordChangedAt,
    employeeNumber
  ) {
    super(userId, name, email, password, status, createdAt, passwordChangedAt);
    this.employeeNumber = employeeNumber;
  }
}
