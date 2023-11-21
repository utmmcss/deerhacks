export type PhotoListResp = {
  data: Photo[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type Photo = {
  id: number
  attributes: {
    alt: string
    img: {
      data: {
        attributes: {
          url: string
          formats: {
            small?: {
              url: string
            }
            medium?: {
              url: string
            }
            large?: {
              url: string
            }
            thumbnail?: {
              url: string
            }
          }
        }
      }
    }
  }
}
