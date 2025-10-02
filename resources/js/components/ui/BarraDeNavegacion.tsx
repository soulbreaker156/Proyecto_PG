export default function BarraDeNavegacion() {
    return (
        <>
            <div className="flex w-1/6 flex-col items-center bg-[#736D6D] p-4">
                <div className="bg-white rounded-full mb-6 w-32 h-32 overflow-hidden">
                    <img className="object-cover" src="/images/KaijuKing.jpeg" alt="Profile"/>
                </div>

                <nav className="w-full text-white">
                    <ul>
                        <li>
                            <a href="/dashboard">Dashboard</a>
                        </li>
                        <li>
                            <a href="#"></a>Catalogo
                        </li>
                        <li>
                            <a href="#"></a>Facturación
                        </li>
                        <li>
                            <a href="#"></a>Creditos
                        </li>
                        <li>
                            <a href="#"></a>Inventario
                        </li>
                        <li>
                            <a href="#"></a>Pedidos
                        </li>
                        <li>
                            <a href="#"></a>Logout
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
