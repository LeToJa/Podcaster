import { ReactNode } from 'react'

export interface ReactElementWithChildrenTypes {
    children: ReactNode
}

export type GenericObjectTypes<T = unknown> = Record<string, T>