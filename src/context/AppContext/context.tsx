import { createContext, useState } from 'react'

import { ReactElementWithChildrenTypes } from '../../types'
import { AppContextTypes } from './types'

export const AppContext = createContext<AppContextTypes | undefined>(undefined)

export const AppProvider = ({ children }: ReactElementWithChildrenTypes) => {
    const [loading, setLoading] = useState<boolean>(true)

    const toggleLoading = (value: boolean) => setLoading(value)

    return <>
        <AppContext.Provider value={{ loading, toggleLoading }}>
            {children}
        </AppContext.Provider>
    </>
}