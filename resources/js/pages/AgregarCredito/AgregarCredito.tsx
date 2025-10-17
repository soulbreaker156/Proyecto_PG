import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { usePage,router } from "@inertiajs/react";
import FormularioCreditos from "@/components/FormularioCreditos/FormularioCreditos";
import { Usuario } from "@/components/Interfaces/interfaceUsuario";
import { Cliente } from "@/components/Interfaces/interfaceCliente";

export default function AgregarCredito({ usuarios, clientes }: { usuarios?: Usuario[], clientes?: Cliente[] }) {
    const { flash } = usePage<{ flash: { title: string; message: string; icon: 'success' | 'error' } }>().props;
    //Flash message 
        useEffect(() => {
            if (flash?.icon) {
                Swal.fire({
                    title: flash.title,
                    text: flash.message,
                    icon: flash.icon,
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => {
                    router.get('/creditos');
                });
            }
        }, [flash]);
    return (
        <SistemaLayout>
            <main className="flex flex-col justify-center">
                <FormularioCreditos usuarios={usuarios} clientes={clientes} />
            </main>
        </SistemaLayout>
    );
}
