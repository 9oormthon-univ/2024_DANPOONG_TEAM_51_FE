export interface getMentorRoomResponse {
  data: MentorRoom[];
}

export interface MentorRoom {
  id: number;
  menteeName: string;
  menteeKeywords: string[];
  isStable: boolean;
  mentorLastViewedAt: Date;
}

export interface getMenteeRoomResponse {
  data: MenteeRoom[];
}

export interface MenteeRoom {
  id: number;
  mentorName: string;
  mentorKeywords: string[];
  isStable: boolean;
  mentorLastViewedAt: Date;
}
