export interface RSSFeedResponse {
    description: string
    items: RSSResponse[]
}

export interface RSSResponse {
    title: string
    content: string
    isoDate: string
    enclosure: {
        url: string
        type: string
    }
    itunes: {
        duration: string
    }
}