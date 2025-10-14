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
    
    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem("carrito") || "[]");
        setProductos(productosGuardados.map((item:any) => {return { ...item.producto, cantidad: item.cantidad }}));
        setImagenes(productosGuardados.map((item:any) => item.imagen));
    }, []);

    // Estado para la búsqueda
    const [buscar, setBuscar] = useState('');
    // Se transforman los datos para la tabla
    const data = productos.map((producto, index) => ({
        id: index,
        producto: producto.producto,
        descripcion: producto.descripcion,
        precio: `Q. ${producto.precio}`,
        cantidad: producto.cantidad,
        imagen: imagenes.find(img => img.id_imagen === producto.fk_id_imagen)?.imagen || '/assets/productos/no-hay-imagen.jpg',
    }));
    // Filtrado de datos basado en la búsqueda
    const datosFiltrados = data.filter(item =>
        item.producto.toLowerCase().includes(buscar.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(buscar.toLowerCase())
    );
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
    ];

    return (
        <SistemaLayout>
            <Head>
                <title>Carrito</title>
                <meta name="description" content="Página del carrito de compras" />
            </Head>
            <div className="w-full max-h-[75vh] overflow-auto">
                    <DataTable
                        columns={columns}
                        data={datosFiltrados}
                        pagination
                        paginationPerPage={10}
                        responsive
                        highlightOnHover
                    />
                </div>
        </SistemaLayout>
    );
}
