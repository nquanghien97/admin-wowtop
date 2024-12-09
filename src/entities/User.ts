export interface UserEntity {
  id: number
  phone_number: string
  full_name: string
  mother_dob: Date
  child_dob: Date
  province_id: string
  province: string
  district_id: string
  district: string
  ward_id: string
  ward: string
  address: string
  points_accumulation: number
  role: string
}