import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import { Head } from "@inertiajs/react";
import { Producto,ImagenProducto } from "@/components/Interfaces/interfaceCatalogo";
import {  useEffect, useState } from "react";
export default function Carrito() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [imagenes, setImagenes] = useState<ImagenProducto[]>([]);
    console.log(productos);
    console.log(imagenes);
    
    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem("carrito") || "[]");
        setProductos(productosGuardados.map((item:any) => item.producto));
        setImagenes(productosGuardados.map((item:any) => item.imagen));
    }, []);

    
    return (
        <SistemaLayout>
            <Head>
                <title>Carrito</title>
                <meta name="description" content="Página del carrito de compras" />
            </Head>
            <div>
                <h1>Carrito</h1>
            </div>
        </SistemaLayout>
    );
}
