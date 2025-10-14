import { ImagenProducto, Producto } from '@/components/Interfaces/interfaceCatalogo';
import { useState, useEffect } from 'react';

export default function CardProductos({ producto, imagen }: { producto: Producto; imagen: ImagenProducto; }) {
  const [cantidad, setCantidad] = useState<number | undefined>();

  /* Al montar, revisa si el producto ya está en el carrito
   useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const item = carrito.find((item: any) => item.producto.id_producto === producto.id_producto);
    if (item) {
      setCantidad(item.cantidad);
    } else {
      setCantidad(undefined);
    }
  }, [producto.id_producto]);*/

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

      <div className="flex items-center gap-2">
        <label htmlFor={`cantidad-${producto.id_producto}`}>Cantidad:</label>
        <input
          id={`cantidad-${producto.id_producto}`}
          type="number"
          min={1}
          value={cantidad}
          onChange={e => {
            const value = e.target.value;
            if (value === '') {
              setCantidad(undefined);
            } else {
              setCantidad(Math.max(0, Number(value)));
            }
          }}
          className="w-16 border rounded px-2 py-1"
        />
      </div>
      <button
        className="mt-2 mr-4 rounded-[8px] bg-[#0B0B0B] px-4 py-2 text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#282727]"
        onClick={() => {
          const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
          let index = carrito.findIndex(
            (item: any) => item.producto.id_producto === producto.id_producto
          );

          let nuevaCantidad = cantidad !== undefined ? cantidad : 1;

          if (index !== -1) {
            carrito[index].cantidad += nuevaCantidad;
          } else {
            carrito.push({ producto, imagen, cantidad: nuevaCantidad });
          }

          localStorage.setItem('carrito', JSON.stringify(carrito));
          setCantidad(nuevaCantidad); // Refleja el cambio en el input
        }}
      >
        Agregar al carrito
      </button>
    </section>
  );
}
