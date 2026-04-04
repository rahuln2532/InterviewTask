import { useEffect, useState } from "react";
import { ProductContext } from "./productContext";
import axios from "axios";

export default function ProductProvider({ children }) {

    const [data, setData] = useState([]);

    const loadData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/products");
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
        <ProductContext.Provider value={{ data, setData ,loadData}}>
            {children}
        </ProductContext.Provider>
    );
}