import NextLink from 'next/link';

import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import { ShopLayout } from '@/features/next-teslo/global';


export const EmptyPage = () => {
  return (
    <ShopLayout title="Carrito vacío" pageDescription="No hay artículos en el carrito de compras">
         <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' }}}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography>Su carrito está vació</Typography>
                    <Link
                    href='/'
                    component={NextLink}
                    typography="h4" color='secondary'>
                        Regresar
                    </Link>
            </Box>


        </Box>
    </ShopLayout>
  )
}

// TENER EN CUENTA: EL CODIGO DE ABAJO ES SOLAMENTE PARA CUANDO ESTE EN LA CARPETA DE PAGE GLOBAL DE NEXTJS EN ESTE PROYECTO
//export default EmptyPage