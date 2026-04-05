import { useEffect, useState } from "react";
import { ProductContext } from "./productContext";

import { getProducts } from "../api/productService";

export default function ProductProvider({ children }) {

    const [data, setData] = useState([]);
    const [imageprev, setImageprev] = useState([]);

    const loadData = async () => {
        try {
            const res = await getProducts('/products');
            console.log(res);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <ProductContext.Provider value={{ data, setData ,loadData,imageprev,setImageprev}}>
            {children}
        </ProductContext.Provider>
    );
}