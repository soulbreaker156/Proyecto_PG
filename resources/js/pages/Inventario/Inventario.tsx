import SistemaLayout from '@/layouts/SistemaLayout/SistemaLayout';
import Tabla from '@/components/Tabla/Tabla';
import { usePage, Link, Head } from '@inertiajs/react';
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
        <>
            <Head>
                <title>Inventario</title>
                <meta name="Inventario" content="Inventario de productos" />
            </Head>

            <SistemaLayout>
                <div className="flex w-[95%] justify-center p-20 min-h-[80vh] flex-col overflow-auto gap-5">
                    <Tabla productos={productos} imagenes={imagenes} />
                    <Link href='/inventario/agregar' className='p-5 w-[15%] h-[5vh] flex items-center justify-center rounded-[8px] bg-[#0B0B0B] text-[15px] text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#282727] cursor-pointer '>Agregar un Producto</Link>
                </div>
            </SistemaLayout>
        </>
    );
}
