import SistemaLayout from '@/layouts/SistemaLayout/SistemaLayout';
import Tabla from '@/components/Tabla/Tabla';
import { usePage } from '@inertiajs/react';
import {Producto, ImagenProducto} from '@/components/Interfaces/interfaceInventario';
import '../../../css/datatable.css';
export default function Inventario() {
    const { productos, imagenes } = usePage().props as { productos?: Producto[], imagenes?: ImagenProducto[] };
    return (
        <SistemaLayout>
            <div className="flex w-[95%] justify-center p-10">
                <Tabla productos={productos} imagenes={imagenes} />
            </div>
        </SistemaLayout>
    );
}
