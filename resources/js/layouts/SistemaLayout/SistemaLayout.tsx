import BarraDeNavegacion from '@/components/ui/BarraDeNavegacion';
export default function SistemaLayout({children,}: {children: React.ReactNode;}) {
    return (
        <>
            
            <div className="h-screen flex">
                <BarraDeNavegacion />
                {children}
                </div>
        </>
    );
}
