import DataTable from "react-data-table-component";
import '../../../css/datatable.css';


export default function TablaDetallesCreditos({ usuario }: { usuario: any }) {
    const data = (usuario?.creditos || []).map((credito: any) => ({
        nombre: usuario.usuario,
        monto: credito.monto,
        movimiento: credito.tipo_mov,
        descripcion: credito.descripcion,
        fecha: credito.fecha_mov,
        
    }));
    

    const columns = [
        { name: "Nombre", selector: (row: any) => row.nombre, sortable: true },
        { name: "Monto", selector: (row: any) => row.monto, sortable: true },
        { name: "Movimiento", selector: (row: any) => row.movimiento, sortable: true },
        { name: "Descripción", selector: (row: any) => row.descripcion, sortable: true },
        { name: "Fecha", selector: (row: any) => row.fecha, sortable: true },
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
