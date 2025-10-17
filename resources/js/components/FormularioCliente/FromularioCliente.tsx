import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from 'sweetalert2';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function FormularioCliente({ isOpen, onClose, onSuccess }: Props) {
    const { flash } = usePage<{ flash: { title: string; message: string; icon: 'success' | 'error' } }>().props;
 

    const { data, setData, post, errors, reset } = useForm<{
        nombre: string,
        apellido: string,
        dpi: number | null,
    }>({
        nombre: '',
        apellido: '',
        dpi: null,
    });

    // Detectar flash messages cuando cambian las props
    useEffect(() => {
        if (flash?.icon) {
            Swal.fire({
                title: flash.title,
                text: flash.message,
                icon: flash.icon,
                timer: 1500,
                showConfirmButton: false,
            }).then(() => {
                onClose();
                reset();
            });
        }

    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/creditos/crearCliente', {
            onError: (errors) => {
                // Mostrar errores de validación
                const errorMessages = Object.values(errors).join('\n');
                Swal.fire({
                    title: 'Error de validación',
                    text: errorMessages,
                    icon: 'error',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        });
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Agregar Nuevo Cliente</h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            className="border p-2 rounded" 
                            type="text" 
                            name="nombre" 
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            required
                        />
                        {errors.nombre && <span className="text-red-500">{errors.nombre}</span>}
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="apellido">Apellido</label>
                        <input 
                            className="border p-2 rounded" 
                            type="text" 
                            name="apellido" 
                            value={data.apellido}
                            onChange={(e) => setData('apellido', e.target.value)}
                            required
                        />
                        {errors.apellido && <span className="text-red-500">{errors.apellido}</span>}
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="dpi">DPI</label>
                        <input 
                            className="border p-2 rounded" 
                            type="number" 
                            name="dpi" 
                            value={data.dpi ?? ''}
                            onChange={(e) => setData('dpi', e.target.value === '' ? null : Number(e.target.value))}
                            required
                        />
                        {errors.dpi && <span className="text-red-500">{errors.dpi}</span>}
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                        <button 
                            type="button"
                            onClick={handleClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Guardar Cliente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}