export interface LoginForm {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  userInfo: LoginForm
  uniqueAuth: string[]
}

export class LoginData {
  ruleForm: LoginForm = {
    username: "",
    password: ""
  }
}