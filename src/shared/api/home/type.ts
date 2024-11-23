export interface GetMentorsResponse {
  data: Mentor[];
}

export interface Mentor {
  mentorId: number;
  auditStatus: string;
  profileImgUrl: string;
  name: string;
  keyword: string[];
}
