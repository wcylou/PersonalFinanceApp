export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  active: number;

  constructor(
    id?: number,
    username?: string,
    password?: string,
    email?: string,
    role?: string,
    active?: number
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    this.active = active;
  }
}
