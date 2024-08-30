/* eslint-disable */

import { RSSFeedResponse } from "./types"

const parser = new window.RSSParser()

export const parseURL = async (url: string): Promise<RSSFeedResponse | undefined> => {
    try {
        return await parser.parseURL(url) as RSSFeedResponse
    } catch (err) {
        console.error((err as Error).message)
    }
}