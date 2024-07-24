export interface User{
  name: string;
  password: string;
  email: string;
}

export interface SignupApiResponse {
  status: number;
  message: string;
  data: {
    user: User;
  };
}

export interface LoginApiResponse {
  status: number;
  message: string;
  data: {
    token: string;
  };
}

export interface LogoutApiResponse {
  status: number;
  message: string;
}
