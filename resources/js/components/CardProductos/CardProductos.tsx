import {ImagenProducto,Producto,} from '@/components/Interfaces/interfaceCatalogo';

export default function CardProductos({producto,imagen,}: {producto: Producto;imagen: ImagenProducto;}) {
    return (
        <section className="relative z-0 flex h-[40vh] w-[90%] transform flex-col items-center gap-5 rounded-[8px] border p-2 transition duration-300 ease-in-out hover:scale-105">
            <header className="left-center absolute -top-4 z-10 rounded-[8px] border border-gray-300 bg-white px-2 py-1 text-sm font-semibold shadow-md">
                {producto.producto}
            </header>
            <figure className="mt-3 h-[50%] w-[60%] overflow-hidden rounded-[8px] border border-gray-300 p-2 shadow-[0px_20px_10px_5px_rgba(0,0,0,0.1)]">
                <img
                    className="h-full w-full object-fill"
                    src={
                        typeof imagen.imagen === 'string'
                            ? imagen.imagen
                            : '/assets/productos/no-hay-imagen.jpg'
                    }
                    alt={
                        imagen.id_imagen !== undefined
                            ? imagen.id_imagen.toString()
                            : 'Imagen'
                    }
                />
                <figcaption className="absolute right-2 bottom-2 z-10 rounded-[8px] border border-gray-300 bg-white px-2 py-1 text-sm font-semibold shadow-md">
                    {`Q.${producto.precio}`}
                </figcaption>
            </figure>
            <main>
                <p className="text-justify text-sm">{producto.descripcion}</p>
            </main>
        </section>
    );
}
