import BarraDeNavegacion from '@/components/ui/BarraDeNavegacion';
export default function SistemaLayout({children,}: {children: React.ReactNode;}) {
    return (
        <>
            <BarraDeNavegacion />
            <div className="h-screen flex ml-[16.666667%] justify-center p-4">
                {children}
            </div>
        </>
    );
}
