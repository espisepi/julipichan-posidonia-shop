import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { UiContext } from '../../../context'

export const ButtonEnabled3d = () => {
  // Poner aqui salir modo 3d
  const { is3DModeActivated, toggle3DMode } = useContext(UiContext)
  return (
    <div style={{ position: 'fixed', bottom: 0 }}>
      <Button color='secondary' className='circular-btn' onClick={toggle3DMode}>
        {is3DModeActivated ? 'Salir del modo 3D' : 'Entrar al modo 3D'}
      </Button>
    </div>
  )
}
