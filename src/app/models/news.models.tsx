export interface CreateNewsData {
  newsTitle: string;
  newsSummary: string;
  newsDescription: string;
  type: number;
  thumbnail: File;
}

export interface NewsData {
  newsID: number;
  newsTitle: string;
  newsSummary: string;
  thumbnail: string;
  newsDescription: string;
  dateCreate: string;
}
