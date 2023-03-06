


export const fixUrlImages = (images: Array<String>) => {
    return images.map( image => (
        fixUrlImage(image)
    ));
}

export const fixUrlImage = (image: String) => {
    return image.includes('http') ? image : `/${image}`;
}