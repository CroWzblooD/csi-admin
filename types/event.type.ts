export type Event = {
  id: string
  name: string
  description: string
  venue: string
  banner: string
  isPaid: boolean
  isOnline: boolean
  guest: string | null
  eventDate: Date
  eventTime: string
  imageUrls?: string[]
  isPrivate: boolean
}

export type eventModel = {
  id: string
  name: string
  description: string
  venue: string
  isPaid: boolean
  isOnline: boolean
  guest?: string | null
  eventDate: Date
  eventTime: string
  banner: string
  imageUrls: string[]
  isPrivate: boolean
  createdAt: Date
  updatedAt: Date
}
