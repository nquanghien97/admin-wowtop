export interface HeightCalculatorEntity {
  id: number,
  code: string,
  parentName: string,
  fatherHeight: string,
  motherHeight: string,
  phoneNumber: string,
  province: string,
  district: string,
  ward: string,
  address: string,
  fullName: string,
  gender: Gender;
  date_of_birth: string,
  currentHeight: string,
  currentWeight: string,
  currentProduct: string,
  sport: string,
  timeSleep: string,
  createdAt: Date;
}

export enum Gender {
  BOY = "BOY",
  GIRL = 'GIRL'
}