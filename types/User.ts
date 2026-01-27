export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
