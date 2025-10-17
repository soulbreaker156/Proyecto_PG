import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import TablaDetallesCreditos from "@/components/TablaDetallesCreditos/TablaDetallesCreditos";
export default function DetallesCreditos({usuario}: {usuario?: any}) {
    return (
        <>
            <SistemaLayout>
                <main className="flex flex-col w-full h-[90vh] mt-10 gap-3">
                    <TablaDetallesCreditos usuario={usuario} />
                </main>
            </SistemaLayout>
        </>
    );
}