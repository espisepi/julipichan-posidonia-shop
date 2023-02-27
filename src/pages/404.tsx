import { Box, Typography } from '@mui/material';
import { ShopLayout } from '@/features/global';

export default function Error() {
  //return <h1>404 - Something went wrong</h1>
    return (
    <ShopLayout title='Page not found' pageDescription='No hay nada que mostrar aquí'>
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' }}}
        >
            <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>404 |</Typography>
            <Typography marginLeft={2}>No encontramos ninguna página aquí</Typography>
        </Box>
    </ShopLayout>
  )
}
