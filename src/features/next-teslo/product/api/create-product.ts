import { tesloApi } from "../../global";
import { IProduct } from "../types";

interface FormData {
    _id?       : string;
    description: string;
    images     : string[];
    inStock    : number;
    price      : number;
    sizes      : string[];
    slug       : string;
    tags       : string[];
    title      : string;
    type       : string;
    gender     : string;
}

type CreateProductProps = {
  data: FormData;
};

export const createProduct = ({
  data,
}: CreateProductProps): Promise<IProduct> => {
  return tesloApi({
                url: '/admin/products',
                method: data._id ? 'PUT': 'POST',  // si tenemos un _id, entonces actualizar, si no crear
                data: data
            });
};