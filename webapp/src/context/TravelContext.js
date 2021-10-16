import React, {createContext, useReducer} from 'react';
import { initialState, Travelreducer } from '../reducer/TravelReducer';

const TravelContext =createContext()

const TravelProvider=({children})=>{
    const [state, dispatch]= useReducer(Travelreducer, initialState)

    return(
        <TravelContext.Provider  value={{state,dispatch}}>
                {children}
        </TravelContext.Provider>
    )
}

export  {TravelContext,  TravelProvider}
 