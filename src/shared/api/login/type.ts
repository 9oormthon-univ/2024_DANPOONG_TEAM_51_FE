export interface postLoginRequestBody {
  platformType: string;
  code: string;
}

export interface PostLoginResponse {
  data: {
    role: string;
  };
}
