import SistemaLayout from '@/layouts/SistemaLayout/SistemaLayout';
import Tabla from '@/components/Tabla/Tabla';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import {Producto, ImagenProducto} from '@/components/Interfaces/interfaceInventario';
import '../../../css/datatable.css';
import Swal from "sweetalert2";
export default function Inventario() {
    const { productos, imagenes } = usePage().props as { productos?: Producto[], imagenes?: ImagenProducto[] };
    const { flash } = usePage().props as {flash?: { title: string; message: string; icon: 'success' | 'error' };};
   
    useEffect(() => {
          if (flash?.icon === 'success') {
              Swal.fire({
                  position: 'top-end',
                  title: flash.title,
                  text: flash.message,
                  icon: flash.icon,
                  timer: 1600,
                  showConfirmButton: false,
              });
          } else if (flash?.icon === 'error') {
              Swal.fire({
                  position: 'top-end',
                  title: flash.title,
                  text: flash.message,
                  icon: flash.icon,
                  timer: 1600,
                  showConfirmButton: false,
              });
          }
      }, [flash]);

    return (
        <SistemaLayout>
            <div className="flex w-[95%] justify-center p-10">
                <Tabla productos={productos} imagenes={imagenes} />
            </div>
        </SistemaLayout>
    );
}
