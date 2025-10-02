export default function BarraDeNavegacion() {
    return (
        <>
            <div className="flex w-1/6 flex-col items-center bg-[#736D6D] p-4">
                <div className="mb-6 h-32 w-32 overflow-hidden rounded-full bg-white">
                    <img
                        className="object-cover"
                        src="/images/KaijuKing.jpeg"
                        alt="Profile"
                    />
                </div>
                <div className="flex w-full flex-col items-center">
                    <nav className="w-full text-3xl text-white">
                        <ul>
                            <li className="mb-6">
                                <a
                                    href="/dashboard"
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        src="/assets/icon/dashboard.png"
                                        alt="Dashboard"
                                        className="h-6 w-6"
                                    />
                                    Dashboard
                                </a>
                            </li>
                            <li className="mb-6">
                                <a href="#" className="flex items-center gap-2">
                                    <img
                                        src="/assets/icon/catalogo.png"
                                        alt="Catalogo"
                                        className="h-6 w-6"
                                    />
                                    Catalogo
                                </a>
                            </li>
                            <li className="mb-6">
                                <a href="#" className="flex items-center gap-2">
                                    <img
                                        src="/assets/icon/facturacion.png"
                                        alt="Facturación"
                                        className="h-6 w-6"
                                    />
                                    Facturación
                                </a>
                            </li>
                            <li className="mb-6">
                                <a href="#" className="flex items-center gap-2">
                                    <img
                                        src="/assets/icon/credito.png"
                                        alt="Creditos"
                                        className="h-6 w-6"
                                    />
                                    Creditos
                                </a>
                            </li>
                            <li className="mb-6">
                                <a href="#" className="flex items-center gap-2">
                                    <img
                                        src="/assets/icon/inventario.png"
                                        alt="Inventario"
                                        className="h-6 w-6"
                                    />
                                    Inventario
                                </a>
                            </li>
                            <li className="mb-6">
                                <a href="#" className="flex items-center gap-2">
                                    <img
                                        src="/assets/icon/pedido.png"
                                        alt="Pedidos"
                                        className="h-6 w-6"
                                    />
                                    Pedidos
                                </a>
                            </li>
                            <li className="mb-6">
                                <a href="#" className="flex items-center gap-2">
                                    <img
                                        src="/assets/icon/logout.png"
                                        alt="Logout"
                                        className="h-6 w-6"
                                    />
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
