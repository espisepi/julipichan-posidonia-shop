import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

//import { CartContext, UiContext } from '../../../context';
import { CartContext } from '@/features/next-teslo';
import { UiContext } from '@/features/next-teslo';

/**
 * 
 *  IMPORTANTE:
 * 
 *  Para corregir los errores de renderizado con nextjs 13, se ha modificado los links
 *  gracias a la solucion ofrecida en este enlace: https://stackoverflow.com/questions/66226576/using-the-material-ui-link-component-with-the-next-js-link-component/74419666#74419666
 * 
 * Antes Nextjs 12:
 * 
 * <NextLink href="/" passHref>
    <Link variant="body2">Your Link</Link>
   </NextLink>
 * 
   Ahora Nextjs 13:

   <Link href="/" component={NextLink}>
        Your link
   </Link>
 * 
 */


export const Navbar = () => {

    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext( UiContext );
    const { numberOfItems } = useContext( CartContext );

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);
    }

    

    return (
        <AppBar>
            <Toolbar>
                    <Link href="/" component={NextLink} display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>  

                <Box flex={ 1 } />

                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className="fadeIn">
                        <Link href='/category/men'  component={NextLink}>
                            <Button color={ asPath === '/category/men' ? 'primary':'info'}>Hombres</Button>
                        </Link>
                        <Link href='/category/women' component={NextLink}>
                            <Button color={ asPath === '/category/women' ? 'primary':'info'}>Mujeres</Button>
                        </Link>
                        <Link href='/category/kid' component={NextLink}>
                            <Button color={ asPath === '/category/kid' ? 'primary':'info'}>Niños</Button>
                        </Link>
                </Box>


                <Box flex={ 1 } />
                
                

                {/* Pantallas pantallas grandes */}
                {
                    isSearchVisible 
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                autoFocus
                                value={ searchTerm }
                                onChange={ (e) => setSearchTerm( e.target.value ) }
                                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setIsSearchVisible(false) }
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                    : 
                    (
                        <IconButton 
                            onClick={ () => setIsSearchVisible(true) }
                            className="fadeIn"
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            <SearchOutlined />
                        </IconButton>
                    )
                }


                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined />
                </IconButton>

                {/* <NextLink href="/cart" passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={ numberOfItems > 9 ? '+9': numberOfItems  } color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink> */}


                <Button onClick={ toggleSideMenu }>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}
