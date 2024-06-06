export interface RecentTree {
  plantCodeID: string;
  username: string;
  dateCreate: string;
}

export interface UserTreesCode {
  plantCodeID: string;
  provice: string;
  proviceAddress: string;
  dateCreate: string;
  status: number;
}

export interface TreeCodeDetail {
  trackingID: number;
  plantCodeID: string;
  provice: string;
  proviceAddress: string;
  contentText: string;
  dateCreate: string;
  status: number;
  totalStatus: number;
  plantImageDetail: string[];
}
