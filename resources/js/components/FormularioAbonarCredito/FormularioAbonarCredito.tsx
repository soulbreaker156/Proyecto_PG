import { Usuario } from "../Interfaces/interfaceUsuario";
import { Cliente } from "../Interfaces/interfaceCliente";
import { useForm } from "@inertiajs/react";
import { useState, useEffect} from "react";
    
export default function FormularioAbonarCredito({ usuarios, clientes }: { usuarios?: Usuario[], clientes?: Cliente[] }) {

    const [saldoDisponible, setSaldoDisponible] = useState<number | null>(null);
    const [usarSaldo, setUsarSaldo] = useState<boolean>(false);

    const { data, setData, post, errors } = useForm<{
                cliente_id: number | null,
                usuario_id: number | null,
                monto: number | null,
                descripcion: string,
            }>({
                cliente_id: null,
                usuario_id: null,
                monto: null,
                descripcion: '',
            });
        //Mostrar el saldo total del cliente o usuario seleccionado
            useEffect(() => {
                if (data.cliente_id) {
                    const cliente = clientes?.find(c => c.id_cliente === data.cliente_id);
                    setSaldoDisponible(
                        cliente?.creditos
                            .filter((credito: any) => credito.tipo_mov === 'abono')
                            .reduce((total: any, credito: any) => Number(total) + Number(credito.monto), 0)
                    );
                } else if (data.usuario_id) {
                    const usuario = usuarios?.find(u => u.id_usuario === data.usuario_id);
                    setSaldoDisponible(
                        usuario?.creditos
                            .filter((credito: any) => credito.tipo_mov === 'abono')
                            .reduce((total: any, credito: any) => Number(total) + Number(credito.monto), 0)
                    );
                }
            }, [data.cliente_id, data.usuario_id, clientes, usuarios]);

            const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                post('/creditos/guardarAbono');
            }
        
        
            //Transformar usuarios
            const usuariosTransformados = (usuarios || []).map((usuario) => ({
                id: usuario.id_usuario,
                nombre: usuario.usuario,
                tipo: 'Usuario',
                dpi: undefined
            }));
            
            //Transformar clientes
            const clientesTransformados = (clientes || []).map((cliente) => ({
                id: cliente.id_cliente,
                nombre: `${cliente.nombre} ${cliente.apellido}`,
                dpi: cliente.dpi,
                tipo: 'Cliente'
            }));
            
            //Combinar ambos arrays
            const datos = [...usuariosTransformados, ...clientesTransformados];

            
    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="lista">Seleccione un cliente: </label>
        <select 
            name="lista" 
            id="lista"
            onChange={(e) => {
                if (e.target.value) {
                    const selectedItem = JSON.parse(e.target.value);
                    if (selectedItem.tipo === 'Usuario') {
                        setData('usuario_id', selectedItem.id);
                        setData('cliente_id', null);
                    } else {
                        setData('cliente_id', selectedItem.id);
                        setData('usuario_id', null);
                    }
                    //Limpiar estados cuando cambia la selección
                    setUsarSaldo(false);
                    setData('monto', null);
                }
            }}
        >
            <option value="">-- Seleccione --</option>
            {datos.map((item) => (
                <option key={item.id} value={JSON.stringify(item)}>
                    {item.tipo === 'Usuario' ? `${item.nombre}` : `${item.nombre} (DPI: ${item.dpi})`}
                </option>
            ))}
        </select>

        {/*Mostrar saldo disponible si existe */}
        {saldoDisponible !== null && saldoDisponible > 0 && (
            <div className="bg-blue-100 p-3 rounded">
                <p className="text-blue-800">
                    Saldo disponible: <strong>Q{saldoDisponible.toFixed(2)}</strong>
                </p>
            </div>
        )}

        {/*Solo mostrar checkbox si hay saldo disponible */}
        {saldoDisponible !== null && saldoDisponible > 0 && (
            <div className="flex gap-4">
                <label htmlFor="usarSaldo">Usar Saldo Disponible</label>
                <input 
                    type="checkbox" 
                    id="usarSaldo" 
                    checked={usarSaldo} 
                    onChange={(e) => {
                        const checked = e.target.checked;
                        setUsarSaldo(checked);
                        
                        //Actualizar el monto cuando se marca/desmarca
                        if (checked) {
                            setData('monto', saldoDisponible);
                        } else {
                            setData('monto', null);
                        }
                    }} 
                />
            </div>
        )}
    
        <div className="flex flex-col">
            <label htmlFor="Monto">Monto</label>
            <input 
                className="border" 
                type="number" 
                name="monto" 
                value={data.monto ?? ''}
                onChange={(e) => {
                    const value = e.target.value === '' ? null : Number(e.target.value);
                    setData('monto', value);
                    
                    //Si cambia el monto manualmente, desmarcar el checkbox
                    if (usarSaldo && value !== saldoDisponible) {
                        setUsarSaldo(false);
                    }
                }}
                disabled={usarSaldo} //Deshabilitar cuando usa saldo automático
            />
            {errors.monto && <span className="text-red-500">{errors.monto}</span>}
        </div>
        
        <div className="flex flex-col">
            <label htmlFor="descripcion">Descripción</label>
            <textarea 
                className="border" 
                name="descripcion" 
                value={data.descripcion} 
                onChange={(e) => setData('descripcion', e.target.value)}
            ></textarea>
            {errors.descripcion && <span className="text-red-500">{errors.descripcion}</span>}
        </div>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Guardar Crédito
        </button>
    </form>
);
}
