import { Link } from '@inertiajs/react';
import { useState } from 'react';
export default function CarritoComponente({url,}: {url: string;}) {
    // Define las rutas donde no se debe mostrar el carrito
        const rutasSinCarrito = ['/carrito', '/inventario/agregar'];
        const ocultarPorPrefijo = ['/inventario/editar'];
        const mostrarCarrito =
            !rutasSinCarrito.includes(url) &&
            !ocultarPorPrefijo.some(prefijo => url.startsWith(prefijo));
    
    return (
        <Link className={`absolute top-4 right-4 transition duration-300 ease-in-out hover:scale-110 ${mostrarCarrito ? 'block' : 'hidden'}`} href="#">
            <img src="/assets/icon/carrito.png" alt="Carrito" />
        </Link>
    );
}