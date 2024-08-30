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

export interface DefaultResponseFetch {
    contents: string
}

export interface PodcastResponseTypes {
    resultCount: number;
    results: (PodcastResultsEntity)[];
}
interface PodcastResultsEntity {
    wrapperType: string;
    kind: string;
    artistId: number;
    collectionId: number;
    trackId: number;
    artistName: string;
    collectionName: string;
    trackName: string;
    collectionCensoredName: string;
    trackCensoredName: string;
    artistViewUrl: string;
    collectionViewUrl: string;
    feedUrl: string;
    trackViewUrl: string;
    artworkUrl30: string;
    artworkUrl60: string;
    artworkUrl100: string;
    collectionPrice: number;
    trackPrice: number;
    collectionHdPrice: number;
    releaseDate: string;
    collectionExplicitness: string;
    trackExplicitness: string;
    trackCount: number;
    trackTimeMillis: number;
    country: string;
    currency: string;
    primaryGenreName: string;
    contentAdvisoryRating: string;
    artworkUrl600: string;
    genreIds?: (string)[] | null;
    genres?: (string)[] | null;
}
