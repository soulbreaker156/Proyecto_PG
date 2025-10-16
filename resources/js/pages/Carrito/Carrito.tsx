import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import { Head } from "@inertiajs/react";
import { Producto,ImagenProducto } from "@/components/Interfaces/interfaceCatalogo";
import {  useEffect, useState } from "react";
import '../../../css/datatable.css';
import DataTable from 'react-data-table-component';
export default function Carrito() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [imagenes, setImagenes] = useState<ImagenProducto[]>([]);
    console.log(productos);
    console.log(imagenes);
    // Al montar, carga los productos del carrito desde localStorage
    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem("carrito") || "[]");
        setProductos(productosGuardados.map((item:any) => {return { ...item.producto, cantidad: item.cantidad }}));
        setImagenes(productosGuardados.map((item:any) => item.imagen));
    }, []);
    // Función para eliminar un producto del carrito
    const eliminarProducto = (id_produ: number) => {
       const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
       const nuevoCarrito = carrito.filter((item: any) => item.producto.id_producto !== productos[id_produ].id_producto);
       localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
       window.location.reload();
    }
    // Cancelar la compra
    const cancelarCompra = () => {
        localStorage.removeItem('carrito');
        setProductos([]);
        setImagenes([]);
    }

    // Se transforman los datos para la tabla
    const data = productos.map((producto, index) => ({
        id: index,
        producto: producto.producto,
        descripcion: producto.descripcion,
        precio: `Q. ${producto.precio}`,
        cantidad: producto.cantidad,
        imagen: imagenes.find(img => img.id_imagen === producto.fk_id_imagen)?.imagen || '/assets/productos/no-hay-imagen.jpg',
    }));
 
    const columns = [
        {
            name: 'Imagen',
            selector: (row: any) => row.imagen,
            cell: (row: any) => <img src={row.imagen} alt="imagen" />,
        },
        {
            name: 'Producto',
            selector: (row: any) => row.producto,
        },
        {
            name: 'Descripción',
            selector: (row: any) => row.descripcion,
        },
        {
            name: 'Precio',
            selector: (row: any) => {
                const precio = typeof row.precio === 'string'
                    ? parseFloat(row.precio.replace('Q. ', '').replace(',', ''))
                    : row.precio;
                return precio.toLocaleString('es-US', { style: 'currency', currency: 'GTQ' });
            },
        },
        {
            name: 'Cantidad',
            selector: (row: any) => row.cantidad,
        },
        {
            name: 'Total',
            selector: (row: any) => {
                const precio = typeof row.precio === 'string'
                    ? parseFloat(row.precio.replace('Q. ', '').replace(',', ''))
                    : row.precio;
                const cantidad = row.cantidad;
                const total = precio * cantidad;
                return total.toLocaleString('es-US', { style: 'currency', currency: 'GTQ' });
            },
        },
        {
            name: 'Acciones',
            cell: (row: any) => (<button onClick={() => eliminarProducto(row.id)} className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded hover:bg-red-600">Eliminar</button>),
            width: '120px',
        },
    ];

    return (
        <SistemaLayout>
                <Head>
                    <title>Carrito</title>
                    <meta name="description" content="Página del carrito de compras" />
                </Head>
                <div className=" flex w-[95%] justify-center p-6 min-h-[100%] flex-col gap-5">
                <div className="w-full max-h-[75vh] overflow-auto">
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        paginationPerPage={10}
                        responsive
                        highlightOnHover
                    />
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="bg-black text-white text-2xl p-3 rounded-2xl">Total: {data.reduce((acc: number, item: any) => acc + (item.cantidad * parseFloat(item.precio.replace('Q. ', '').replace(',', ''))), 0).toLocaleString('es-US', { style: 'currency', currency: 'GTQ' })}</p>     
                    <button onClick={cancelarCompra} className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600 h-[40px] min-w-[30%] transition ease-in-out hover:scale-105">Cancelar Compra</button>
                    <button className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-600 h-[40px] min-w-[30%] transition ease-in-out hover:scale-105">Enviar Pedido</button>
                </div>
            </div>
        </SistemaLayout>
    );
}
