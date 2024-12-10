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