import { router } from "@inertiajs/react";
import DataTable from "react-data-table-component";
export default function TablaCreditos({ usuarios }: { usuarios?: any }) {
   const data = usuarios.map((credito: any) => ({
        id: credito.id_usuario,
        cliente: credito.usuario,
        deuda: credito.creditos
            .filter((c: any) => c.tipo_mov === 'credito')
            .reduce((total: number, c: any) => total + parseFloat(c.monto), 0)
            .toLocaleString('en-US', {style: 'currency', currency: 'GTQ'}),
        saldo: credito.creditos
            .filter((c: any) => c.tipo_mov === 'abono')
            .reduce((total: number, c: any) => total + parseFloat(c.monto), 0)
            .toLocaleString('en-US', {style: 'currency', currency: 'GTQ'}),
        acciones: (<button onClick={() => router.get('/creditos/detalles', { usuarioId: credito.id_usuario })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Ver Detalles
            </button>)
    }));

    const columns = [
        { name: "ID", selector: (row: any) => row.id, sortable: true },
        { name: "Cliente", selector: (row:any) => row.cliente, sortable: true },
        { name: "Saldo", selector: (row:any) => row.saldo, sortable: true },
        { name: "Deuda", selector: (row:any) => row.deuda, sortable: true },
        { name: "Acciones", selector: (row:any) => row.acciones, sortable: true },
    ];

   

    return (
        <div className="w-full h-full overflow-auto p-5">
            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
            />
        </div>
    );
}
