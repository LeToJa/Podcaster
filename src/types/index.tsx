import { ReactNode } from 'react'

export interface ReactElementWithChildrenTypes {
    children: ReactNode
}

export type GenericObject<T = unknown> = Record<string, T>