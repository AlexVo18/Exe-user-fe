export interface RecentTree {
  plantCodeID: string;
  username: string;
  dateCreate: string;
}

export interface TreeCode {
  plantCodeID: string;
  provice: string;
  proviceAddress: string;
  dateCreate: string;
  status: number;
  username?: string;
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

export interface CreateTreeLogData {
  PlantCodeID: string;
  ContentText: string;
  DateCreate: Date;
  TotalStatus: number;
  TrackingStatus: number;
  PlantImageDetails?: File[];
}
