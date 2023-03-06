import { fixUrlImage } from "@/features/next-teslo/utils/images";
import ProductScene from "../../../components/canvas/product-scene/ProductScene";


export default function ProductPageCanvas ({ product, ...props }) {
    return < ProductScene image={ fixUrlImage(product.images[0]) } />
}