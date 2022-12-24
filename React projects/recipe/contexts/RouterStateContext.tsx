import { createContext } from 'react'

export type RouterStateContextType = null | {
    routerState: Record<string, any>;
    setRouterState: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const RouterStateContext = createContext<RouterStateContextType>(null);

export default RouterStateContext;