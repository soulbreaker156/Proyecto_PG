import SistemaLayout from '@/layouts/SistemaLayout/SistemaLayout';
import DataTable from 'react-data-table-component';

export default function Inventario() {
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
            name: 'Nombre',
            selector: (row) => row.nombre,
            sortable: true,
        },
        {
            name: 'Edad',
            selector: (row) => row.edad,
            sortable: true,
        },
    ];
    return (
        <SistemaLayout>
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
        </SistemaLayout>
    );
}
