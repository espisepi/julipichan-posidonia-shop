

import { createContext } from 'react';


interface ContextProps {
    isMenuOpen: boolean;
    is3DModeActivated: boolean;

    // Methods
    toggleSideMenu: () => void;
    toggle3DMode: () => void;
}


export const UiContext = createContext({} as ContextProps );