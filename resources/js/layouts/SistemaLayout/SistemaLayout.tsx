export default function SistemaLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen">
            {children}
        </div>
    );
}
