export interface FeedResponseTypes {
    feed: {
        entry: {
            id: {
                attributes: {
                    'im:id': string
                }
            }
            'im:name': { label: string }
            'im:artist': { label: string }
            'im:image': { label: string }[]
        }[]
    }
}