export interface HeightCalculatorEntity {
  id: number,
  code: string,
  fatherName: string,
  fatherHeight: number,
  motherName: string,
  motherHeight: number,
  phoneNumber: string,
  fullName: string,
  date_of_birth: string,
  currentHeight: number,
  currentWeight: number,
  gender: Gender;
  createdAt: Date;
}

export enum Gender {
  BOY = "BOY",
  GIRL = 'GIRL'
}