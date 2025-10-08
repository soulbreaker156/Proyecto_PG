import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import FormularioProducto from "@/components/FormularioProducto/FormularioProducto";
import { Head } from "@inertiajs/react";
export default function AgregarProducto() {
    return (
        <>
            <Head>
                <title>Agregar Producto</title>
                <meta name="Agregar Producto" content="Agregar un nuevo producto" />
            </Head>
            <SistemaLayout>
                <FormularioProducto />
            </SistemaLayout>
        </>
    );
}