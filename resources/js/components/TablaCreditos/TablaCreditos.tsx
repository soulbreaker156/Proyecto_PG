import { router } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import { useState } from "react";

export default function TablaCreditos({ usuarios, clientes }: { usuarios?: any, clientes?: any }) {
    console.log(usuarios);
    console.log(clientes);
    // Estado para la búsqueda
        const [buscar, setBuscar] = useState('');

    // Transformar usuarios
    const dataUsuarios = (usuarios || []).map((credito: any) => {
        const totalCreditos = credito.creditos
            .filter((c: any) => c.tipo_mov === 'credito')
            .reduce((total: number, c: any) => total + parseFloat(c.monto), 0);
            
        const totalAbonos = credito.creditos
            .filter((c: any) => c.tipo_mov === 'abono')
            .reduce((total: number, c: any) => total + parseFloat(c.monto), 0);

        // ✅ Buscar abonoCredito en los créditos del usuario
        const totalAbonoCredito = credito.creditos
            .filter((c: any) => c.tipo_mov === 'abonoCredito')
            .reduce((total: number, c: any) => total + parseFloat(c.monto), 0);
            
        const deudaPendiente = totalCreditos - totalAbonoCredito; // ✅ Restar abonoCredito
        const deudaPendienteAjustada = deudaPendiente < 0 ? 0 : deudaPendiente;
        return {
            id: credito.id_usuario,
            tipo: 'Usuario',
            cliente: credito.usuario,
            apellido: '--',
            dpi: 'N/A',
            deuda: deudaPendienteAjustada.toLocaleString('en-US', {style: 'currency', currency: 'GTQ'}),
            saldo: totalAbonos.toLocaleString('en-US', {style: 'currency', currency: 'GTQ'}),
            abonoCredito: totalAbonoCredito.toLocaleString('en-US', {style: 'currency', currency: 'GTQ'}), // ✅ Mostrar columna abonoCredito
            acciones: (
                <button 
                    onClick={() => router.get('/creditos/detalles', { usuarioId: credito.id_usuario })} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                    Ver Detalles
                </button>
            )
        };
    });

    // Transformar clientes (con créditos también)
    const dataClientes = (clientes || []).map((cliente: any) => {
        const totalCreditos = (cliente.creditos || [])
            .filter((c: any) => c.tipo_mov === 'credito')
            .reduce((total: number, c: any) => total + parseFloat(c.monto), 0);
            
        const totalAbonos = (cliente.creditos || [])
            .filter((c: any) => c.tipo_mov === 'abono')
            .reduce((total: number, c: any) => total + parseFloat(c.monto), 0);

        // ✅ Buscar abonoCredito en los créditos del cliente
        const totalAbonoCredito = (cliente.creditos || [])
            .filter((c: any) => c.tipo_mov === 'abonoCredito')
            .reduce((total: number, c: any) => total + parseFloat(c.monto), 0);
            
        const deudaPendiente = totalCreditos - totalAbonoCredito; // ✅ Restar abonoCredito
        const deudaPendienteAjustada = deudaPendiente < 0 ? 0 : deudaPendiente;

        const saldoDisponible = totalAbonos - totalAbonoCredito;
        const saldoDisponibleAjustado = saldoDisponible < 0 ? 0 : saldoDisponible;
        return {
            id: cliente.id_cliente,
            tipo: 'Cliente',
            cliente: cliente.nombre,
            apellido: cliente.apellido,
            dpi: cliente.dpi,
            deuda: deudaPendienteAjustada.toLocaleString('en-US', {style: 'currency', currency: 'GTQ'}),
            saldo: saldoDisponibleAjustado.toLocaleString('en-US', {style: 'currency', currency: 'GTQ'}),
            abonoCredito: totalAbonoCredito.toLocaleString('en-US', {style: 'currency', currency: 'GTQ'}), // ✅ Mostrar columna abonoCredito
            acciones: (
                <button 
                    onClick={() => router.get('/creditos/detalles', { clienteId: cliente.id_cliente })} 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                    Ver Detalles
                </button>
            )
        };
    });

    // Combina ambos arrays
    const data = [...dataUsuarios, ...dataClientes];

    // Filtro para la búsqueda
    const datosFiltrados = data.filter((item) =>
        item.cliente?.toLowerCase().includes(buscar.toLowerCase()) ||
        item.apellido?.toLowerCase().includes(buscar.toLowerCase()) ||
        item.tipo?.toLowerCase().includes(buscar.toLowerCase()) ||
        item.dpi?.toLowerCase().includes(buscar.toLowerCase())
    );

    const columns = [
        { name: "Tipo", selector: (row: any) => row.tipo, sortable: true },
        { name: "Cliente", selector: (row: any) => row.cliente, sortable: true },
        { name: "Apellido", selector: (row: any) => row.apellido, sortable: true },
        { name: "DPI", selector: (row: any) => row.dpi, sortable: true },
        { name: "Saldo", selector: (row: any) => row.saldo, sortable: true },
        { name: "Deuda", selector: (row: any) => row.deuda, sortable: true },
        { name: "Acciones", selector: (row: any) => row.acciones, sortable: false },
    ];

    return (
        <>
            <div className="w-[30vh] p-4 mt-0">
                <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={buscar}
                    onChange={(e) => setBuscar(e.target.value)}
                    className="mb-3 w-full rounded border p-2"
                />
            </div>
            <div className="w-full h-full overflow-auto p-5">
                <DataTable
                    columns={columns}
                    data={datosFiltrados}
                    pagination
                    highlightOnHover
                />
            </div>
        </>
    );
}
