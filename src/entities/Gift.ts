import { UserEntity } from "./User"

export interface GiftEntity {
  id: number
  name: string
  imageUrl: string
  point: string
  quantity: string
  exchange_time: Date
  user: {
    id: number,
    full_name: string
  }
  created_at: Date
}

export enum GiftStatus {
  PENDING,    // Chờ xử lý
  SHIPPING ,  // Đang giao hàng
  COMPLETED,  // Giao hàng thành công
  CANCELLED  // Đã hủy
} 

export interface ExchangeGiftEntity {
  id: number
  gift_id: number
  user_id: number
  status: GiftStatus,
  delivered_at: Date,
  gift: GiftEntity,
  user: UserEntity
}