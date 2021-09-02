import React, {createContext, useReducer} from 'react';
import { initialState, reducer as AppReducer } from '../reducer/AppReducer';

export const AppContext =createContext()

export const AppProvider=({children})=>{
    const [state, dispatch]= useReducer(AppReducer, initialState)

    return(
        <AppContext.Provider  value={{state,dispatch}}>
                {children}
        </AppContext.Provider>
    )
}