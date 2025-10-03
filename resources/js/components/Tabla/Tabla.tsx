import DataTable from 'react-data-table-component';

export default function Tabla() {
    const data = [
        { id: 1, nombre: 'Jostyn', edad: 22 },
        { id: 2, nombre: 'María', edad: 25 },
        { id: 3, nombre: 'Carlos', edad: 30 },
    ];

    const columns = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'Producto',
            selector: (row) => row.producto,
            sortable: true,
        },
        {
            name: 'Imagen',
            selector: (row) => row.imagen_producto,
            sortable: true,
        },
        {
            name: 'Descripción',
            selector: (row) => row.descripcion,
            sortable: true,
        },
        {
            name: 'Precio',
            selector: (row) => row.precio,
            sortable: true,
        },
        {
            name: 'Cantidad',
            selector: (row) => row.cantidad,
            sortable: true,
        },
    ];
    return (
        <div className="ml-[15%] w-full p-10">
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
