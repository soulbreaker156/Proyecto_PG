import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import { usePage } from "@inertiajs/react";
import FormularioProducto from "@/components/FormularioProducto/FormularioProducto";
import { Producto,ImagenProducto } from "@/components/Interfaces/interfaceInventario";
export default function EliminarProducto() {
    const { productos, imagenes } = usePage().props as {productos?:Producto[], imagenes?:ImagenProducto[]};
console.log(productos);
console.log(imagenes);
    return (
        <SistemaLayout>
           <FormularioProducto productos={productos} imagenes={imagenes} />
        </SistemaLayout>
    );
}