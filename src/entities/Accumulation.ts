export enum StatusCode {
  USED = 'USED',
  UNUSED = 'UNUSED',
  EXPIRED = 'EXPIRED'
}

export interface AccumulatePointsEntity {
  id: number;
  code: string;
  status: StatusCode;
  user_id: number;
  user_by_user_id: number;
  user_at: Date;
  created_at: Date;
}