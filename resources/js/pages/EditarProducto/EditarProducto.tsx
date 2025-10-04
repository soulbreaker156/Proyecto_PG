import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import { usePage } from "@inertiajs/react";
export default function EliminarProducto() {
    const { productos, imagenes } = usePage().props;
console.log(productos);
console.log(imagenes);
    return (
        <SistemaLayout>
            <h1>Editar Producto</h1>
        </SistemaLayout>
    );
}