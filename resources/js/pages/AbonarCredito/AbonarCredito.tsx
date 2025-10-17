import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import FormularioAbonarCredito from "@/components/FormularioAbonarCredito/FormularioAbonarCredito";
import { Usuario } from "@/components/Interfaces/interfaceUsuario";
import { Cliente } from "@/components/Interfaces/interfaceCliente";
export default function AbonarCredito({ usuarios, clientes }: { usuarios?: Usuario[], clientes?: Cliente[] }) {
    console.log(usuarios);
    console.log(clientes);
    return (
        <>
            <SistemaLayout>
                <main className="flex flex-col justify-center h-[90vh] mt-10 gap-3">
                    <FormularioAbonarCredito />
                </main>
            </SistemaLayout>
        </>
    );
}
                   