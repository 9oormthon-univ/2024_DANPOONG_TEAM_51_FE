export interface getUserInfoResponse {
  data: {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    username: string;
    profileImgUrl: null;
    platformType: string;
    platformId: string;
    role: string;
  };
}
