import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import { useState } from "react";
import Swal from "sweetalert2";
import { usePage } from "@inertiajs/react";
import FormularioCreditos from "@/components/FormularioCreditos/FormularioCreditos";
import { Usuario } from "@/components/Interfaces/interfaceUsuario";
import { Cliente } from "@/components/Interfaces/interfaceCliente";
export default function AgregarCredito({ usuarios, clientes }: { usuarios?: Usuario[], clientes?: Cliente[] }) {
    console.log(usuarios);
    console.log(clientes);
    return (
        <SistemaLayout>
            <main className="flex flex-col justify-center">
                <FormularioCreditos usuarios={usuarios} clientes={clientes} />
            </main>
        </SistemaLayout>
    );
}
