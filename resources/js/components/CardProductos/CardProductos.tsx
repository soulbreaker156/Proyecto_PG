import { Producto, ImagenProducto } from '@/components/Interfaces/interfaceCatalogo';
export default function CardProductos({ producto, imagen }: { producto: Producto; imagen: ImagenProducto; }) {
    return (
        <div className='flex gap-5 flex-col items-center border h-[40vh] w-[90%] rounded-[8px] transition duration-300 ease-in-out transform hover:scale-105 p-2'>
            <div>
                {producto.producto}
            </div>
            <div className='h-[50%] w-[60%] overflow-hidden p-2 border border-gray-300 rounded-[8px]'>
                <img className='object-fill h-full w-full' src={typeof imagen.imagen === 'string' ? imagen.imagen : '/assets/productos/no-hay-imagen.jpg'} alt={imagen.id_imagen !== undefined ? imagen.id_imagen.toString() : 'Imagen'} />
            </div>
        </div>
    );
}