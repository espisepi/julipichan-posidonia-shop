import ProductScene from "../../../components/canvas/product-scene/ProductScene";


export default function ProductPageCanvas ({ product, ...props }) {
    return < ProductScene image={ product.images[0] } />
}