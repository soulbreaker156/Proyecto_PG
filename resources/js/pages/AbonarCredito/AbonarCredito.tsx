import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import FormularioAbonarCredito from "@/components/FormularioAbonarCredito/FormularioAbonarCredito";
import { Usuario } from "@/components/Interfaces/interfaceUsuario";
import { Cliente } from "@/components/Interfaces/interfaceCliente";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
export default function AbonarCredito({ usuarios, clientes }: { usuarios?: Usuario[], clientes?: Cliente[] }) {
    const { flash } = usePage().props as { flash?: { title?: string; message?: string; icon?: 'success'|'error' } };
    useEffect(() => {
        if (flash) {
            Swal.fire({
                title: flash.title,
                text: flash.message,
                icon: flash.icon,
                confirmButtonText: 'Aceptar'
            });
        }
    }, [flash]);

    return (
        <>
            <SistemaLayout>
                <main className="flex flex-col justify-center h-[90vh] mt-10 gap-3">
                    <FormularioAbonarCredito usuarios={usuarios} clientes={clientes} />
                </main>
            </SistemaLayout>
        </>
    );
}
                   