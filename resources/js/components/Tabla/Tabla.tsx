import {
    ImagenProducto,
    Producto,
} from '@/components/Interfaces/interfaceInventario';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Tabla({productos,imagenes,}: {productos?: Producto[];imagenes?: ImagenProducto[];}) {
    // Estado para la búsqueda
    const [buscar, setBuscar] = useState('');

    // Se transforman los datos para la tabla
    const data =
        productos?.map((producto) => ({
            id: producto.id_producto,
            producto: producto.producto,
            descripcion: producto.descripcion,
            precio: producto.precio,
            cantidad: producto.cantidad,
            imagen: (() => {
                const img = imagenes?.find(
                    (img) => img.id_imagen === producto.fk_id_imagen,
                );
                return img ? <img src={img.imagen} alt="imagen" /> : 'No image';
            })(),
            estado: producto.estado,
        })) || [];

    const columns = [
        {
            name: 'ID',
            selector: (row: any) => row.id,
            sortable: true,
        },
        {
            name: 'Producto',
            selector: (row: any) => row.producto,
            sortable: true,
        },
        {
            name: 'Imagen',
            selector: (row: any) => row.imagen,
            sortable: true,
        },
        {
            name: 'Descripción',
            selector: (row: any) => row.descripcion,
            sortable: true,
        },
        {
            name: 'Precio',
            selector: (row: any) => row.precio,
            sortable: true,
        },
        {
            name: 'Cantidad',
            selector: (row: any) => row.cantidad,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: (row: any) => row.estado,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: (row: any) => (
                <div className="flex gap-5">
                    <button
                        className="transition delay-75 ease-in-out hover:scale-150 h-full cursor-pointer"
                        onClick={() => Inertia.visit('/inventario/editar', {data: { id: row.id }})}
                    >
                         <img
                            className="w-90"
                            src="/assets/icon/editar.png"
                            alt="editar"
                            />
                    </button>
                    <button
                        className="transition delay-75 ease-in-out hover:scale-150 cursor-pointer"
                        onClick={() => {
                           
                           
                        }}
                    >
                        <img
                            className="w-50"
                            src="/assets/icon/eliminar.png"
                            alt="eliminar"
                        />
                    </button>
                    <button
                        className="transition delay-75 ease-in-out hover:scale-150 cursor-pointer"
                        onClick={() => {
                            // Lógica para ver detalles del producto
                            console.log('Ver detalles del producto:', row);
                        }}
                    >
                        <img
                            className="w-60"
                            src="/assets/icon/estado.png"
                            alt="detalles"
                        />
                    </button>
                </div>
            ),
        },
    ];

    // Filtro para la busqueda
    const datosFiltrados = data.filter((item) =>
        item.producto.toLowerCase().includes(buscar.toLowerCase()),
    );

    return (
        <>
            <div>
                <div className="w-[30vh] p-4">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                        className="mb-3 w-full rounded border p-2"
                    />
                </div>

                <div className="w-full overflow-x-auto">
                    <DataTable
                        columns={columns}
                        data={datosFiltrados}
                        pagination
                        responsive
                        highlightOnHover
                    />
                </div>
            </div>
        </>
    );
}
