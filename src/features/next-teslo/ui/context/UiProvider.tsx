import { FC, useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
    isMenuOpen: boolean;
    is3DModeActivated: boolean;
}


const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
    is3DModeActivated: false
}

interface Props {
    children: React.ReactNode;
}

export const UiProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer , UI_INITIAL_STATE );

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu' });
    }

    const toggle3DMode = () => {
        dispatch({ type: '[UI] - Toggle3DMode' });
    }


    return (
        <UiContext.Provider value={{
            ...state,

            // Methods
            toggleSideMenu,
            toggle3DMode,
        }}>
            { children }
        </UiContext.Provider>
    )
};