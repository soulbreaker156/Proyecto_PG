import {
    ImagenProducto,
    Producto,
} from '@/components/Interfaces/interfaceInventario';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function Tabla({productos,imagenes,}: {productos?: Producto[];imagenes?: ImagenProducto[];}) {
    // Estado para la búsqueda
    const [buscar, setBuscar] = useState('');
    console.log(productos);
    // Se transforman los datos para la tabla
    const data =
        productos?.map((producto) => ({
            id: producto.id_producto,
            producto: producto.producto,
            descripcion: producto.descripcion,
            precio: `Q. ${producto.precio}`,
            cantidad: producto.cantidad,
            imagen: (() => {
                const img = imagenes?.find(
                    (img) => img.id_imagen === producto.fk_id_imagen,
                );
                return img ? <img src={img.imagen || ''} alt="imagen" /> : <img src={'/assets/productos/no-hay-imagen.jpg'} alt="No hay imagen" />;
            })(),
            estado: producto.estado,
            estatus: producto.estatus,
        })) || [];

        const botonBorrar = (id: number) => {
            Swal.fire({
                title: "Estas seguro?",
                text: "No podras revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminarlo!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Inertia.post('/inventario/eliminar', { id: id });
                        }
                    });
        };
         const botonEstado = (id: number) => {
            Swal.fire({
                title: "Estas seguro?",
                text: "No se mostrara en el catalogo!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, cambiarlo!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Inertia.post('/inventario/actualizarEstado', { id: id });
                        }
                    });
        };

    const columns = [
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
                        onClick={() => Inertia.visit('/inventario/editar', {data: { id: row.id }})}/*Se hace la visita a la pagina (la ruta es get) y 
                        con inertia permite mandar informacion sin ser un post, 
                        en este caso se manda el id del producto para asi solo enviar la informacion del producto a editar.
                        */
                    >
                         <img
                            className="w-90"
                            src="/assets/icon/editar.png"
                            alt="editar"
                            />
                    </button>
                    <button
                        className="transition delay-75 ease-in-out hover:scale-150 cursor-pointer"
                        onClick={() => {botonBorrar(row.id)}}
                    >
                        <img
                            className="w-50"
                            src="/assets/icon/eliminar.png"
                            alt="eliminar"
                        />
                    </button>
                    <button
                        className="transition delay-75 ease-in-out hover:scale-150 cursor-pointer"
                        onClick={() => {botonEstado(row.id)}}
                    >
                        <img
                            className="w-60"
                            src={`${row.estado === 'mostrado' ? '/assets/icon/verEstado.png' : '/assets/icon/ocultoEstado.png'}`}
                            alt="detalles"
                        />
                    </button>
                </div>
            ),
        },
    ];

    // Filtro para la busqueda
    const datosFiltrados = data.filter((item) =>
        item.producto?.toLowerCase().includes(buscar.toLowerCase()),
    );

    return (
        <>
            <div>
                <div className="w-[30vh] p-4 mt-0">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                        className="mb-3 w-full rounded border p-2"
                    />
                </div>

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
            </div>
        </>
    );
}
