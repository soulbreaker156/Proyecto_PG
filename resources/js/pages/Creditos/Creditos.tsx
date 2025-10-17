import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import TablaCreditos from "@/components/TablaCreditos/TablaCreditos";
import '../../../css/datatable.css';
export default function Creditos({ usuarios }: { usuarios?: any }) {
    console.log(usuarios);
    return (
        <>
            <SistemaLayout>
            <main className="flex flex-col w-full h-[90vh] mt-10 gap-3">
                    <TablaCreditos usuarios={usuarios} />
                    <div className="flex justify-between">
                        <button className="w-[30%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:scale-105">
                            Agregar Crédito
                        </button>
                        <button className="w-[30%] bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:scale-105">
                            Eliminar Crédito
                        </button>
                        <button className="w-[30%] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:scale-105">
                            Abonar
                        </button>
                    </div>
            </main>
            </SistemaLayout>
        </>
    );
}