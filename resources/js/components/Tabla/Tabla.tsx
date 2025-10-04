import DataTable from 'react-data-table-component';
import { Producto, ImagenProducto } from '@/components/Interfaces/interfaceInventario';

export default function Tabla({ productos, imagenes }: { productos?: Producto[]; imagenes?: ImagenProducto[] }) {

    const data = productos?.map((producto) => ({
        id: producto.id_producto,
        producto: producto.producto,
        descripcion: producto.descripcion,
        precio: producto.precio,
        cantidad: producto.cantidad,
        imagen:  (() => {
            const img = imagenes?.find((img) => img.id_imagen === producto.fk_id_imagen);
            return img ? <img src={img.imagen} alt="imagen"/>: 'No image';
        })(),

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
    ];
    return (
        <div>
            <div>
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    highlightOnHover
                />
            </div>
        </div>
    );
}
