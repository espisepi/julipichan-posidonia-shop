import { UiState } from './';


type UiActionType = 
   | { type: '[UI] - ToggleMenu' } 
   | { type: '[UI] - Toggle3DMode' } 


export const uiReducer = ( state: UiState, action: UiActionType ): UiState => {

   switch (action.type) {
      case '[UI] - ToggleMenu':
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen
        }

      case '[UI] - Toggle3DMode':
         return {
            ...state,
            is3DModeActivated: !state.is3DModeActivated
        } 

       default:
          return state;
   }

}