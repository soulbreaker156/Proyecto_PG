import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import { usePage } from "@inertiajs/react";
import FormularioProducto from "@/components/FormularioProducto/FormularioProducto";
import { Producto,ImagenProducto } from "@/components/Interfaces/interfaceInventario";
import { useEffect } from "react";

export default function EditarProducto() {

    const { productos, imagenes } = usePage().props as {productos?:Producto[], imagenes?:ImagenProducto[]};

    return (
        <SistemaLayout>
           <FormularioProducto productos={productos} imagenes={imagenes} />
        </SistemaLayout>
    );
}