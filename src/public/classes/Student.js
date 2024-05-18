class Student extends User {
  constructor(
    userId,
    name,
    email,
    password,
    status,
    createdAt,
    passwordChangedAt,
    studentNumber
  ) {
    super(userId, name, email, password, status, createdAt, passwordChangedAt);
    this.studentNumber = studentNumber;
  }
}
