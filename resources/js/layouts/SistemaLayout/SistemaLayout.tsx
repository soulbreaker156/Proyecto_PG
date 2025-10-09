import BarraDeNavegacion from '@/components/ui/BarraDeNavegacion';
import CarritoComponente from '@/components/ui/CarritoComponente';
import { usePage } from '@inertiajs/react';


export default function SistemaLayout({children,}: {children: React.ReactNode;}) {
    const { url } = usePage();

    return (
        <>
        <aside>
            <BarraDeNavegacion />
        </aside>

            <main className="relative h-screen flex ml-[16.666667%] justify-center p-4">
                <CarritoComponente url={url} />
                {children}
            </main>
        </>
    );
}
