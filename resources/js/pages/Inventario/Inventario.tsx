import SistemaLayout from '@/layouts/SistemaLayout/SistemaLayout';
import Tabla from '@/components/Tabla/Tabla';
import { usePage } from '@inertiajs/react';

export default function Inventario() {
    const { productos, imagenes } = usePage().props;
    console.log(productos);
    console.log(imagenes);
    return (
        <SistemaLayout>
            <Tabla />
        </SistemaLayout>
    );
}
