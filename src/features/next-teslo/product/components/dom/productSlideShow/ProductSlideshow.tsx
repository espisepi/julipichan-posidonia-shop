import { FC } from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from './ProductSlideshow.module.css';

interface Props {
    images: string[]
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Slide
        easing="ease"
        duration={ 7000 }
        indicators
    >
        {
            images.map( image =>  {
                // En produccion aparece el error de que la imagen del producto tiene esta url: ...sv.ondigitalocean.app/product/products/1740507-00-A_1.jpg
                // Con la siguiente linea el resultado deberia ser:  ...sv.ondigitalocean.app/products/1740507-00-A_1.jpg
                image = image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
                image = image.includes("/product/") ? image.replace("/product/","/") : image;
                return (
                    <div className={ styles['each-slide'] } key={ image }>
                        <div style={{
                            backgroundImage: `url(${ image })`,
                            backgroundSize: 'cover'
                        }}>
                        </div>
                    </div>
                )

            })
        }

    </Slide>
  )
}
