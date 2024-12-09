export interface RegisterUser {
  phone_number: string
  full_name: string
  mother_dob: Date
  child_dob: Date
  province_id: string
  province: string
  district_id: string
  district: string
  ward_id: string;
  ward: string
  address: string
  password: string
}

export interface LoginUser {
  phone_number: string
  password: string
}

export interface ChangePassword {
  old_password: string
  new_password: string
}

export interface UpdateUserDTO {
  full_name: string;
  mother_dob: Date;
  child_dob: Date;
  province_id: string;
  province: string;
  district_id: string;
  district: string;
  ward_id: string;
  ward: string;
  address: string;
}