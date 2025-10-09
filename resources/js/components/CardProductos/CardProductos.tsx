import { ImagenProducto, Producto } from '@/components/Interfaces/interfaceCatalogo';

export default function CardProductos({producto,imagen,}: {producto: Producto;imagen: ImagenProducto;}) {
  return (
    <section className="relative z-0 flex h-[43vh] w-[90%] transform flex-col items-center gap-5 rounded-[8px] border border-gray-300 shadow-[0px_20px_10px_5px_rgba(0,0,0,0.1)]  p-2 transition duration-300 ease-in-out hover:scale-105">
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
        <figcaption className="absolute right-2 bottom-2 z-10 rounded-[8px] border border-gray-300 bg-white px-2 py-1 text-md font-semibold shadow-md">
          {`Q.${producto.precio}`}
        </figcaption>
      </figure>
      <main className="border border-gray-400 rounded-[8px] p-2 text-center w-full h-[30%]">
        <textarea
          disabled
          className="text-md w-full h-full overflow-y-auto"
          value={producto.descripcion}
        >
          {producto.descripcion}
        </textarea>
      </main>
      <button
        className="mt-2 mr-4 rounded-[8px] bg-[#0B0B0B] px-4 py-2 text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#282727]"
        onClick={() => {
          // Obtiene el carrito actual o crea uno nuevo
          const carrito = JSON.parse(
            localStorage.getItem('carrito') || '[]'
          );
          // Agrega el producto actual
          carrito.push({ producto, imagen });
          // Guarda el carrito actualizado
          localStorage.setItem('carrito', JSON.stringify(carrito));
        }}
      >
        Agregar al carrito
      </button>
    </section>
  );
}
