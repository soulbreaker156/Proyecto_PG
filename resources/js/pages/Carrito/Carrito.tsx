import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import { Head } from "@inertiajs/react";
import { Producto,ImagenProducto } from "@/components/Interfaces/interfaceCatalogo";
export default function Carrito() {
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
