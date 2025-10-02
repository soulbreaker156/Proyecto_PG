import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
export default function BarraDeNavegacion() {
    const { flash } = usePage().props as {
        flash?: { title: string; message: string; icon: 'success' | 'error' };
    };
    const cerrarSesion = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: 'estas a punto de cerrar sesión!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar sesión!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Se cerró sesión',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => {
                    Inertia.visit('/logout');
                });
            }
        });
    };

    return (
        <>
            <div className="fixed flex min-h-full w-1/6 flex-col items-center bg-[#736D6D] p-4">
                <div className="mb-6 h-32 w-32 overflow-hidden rounded-full bg-white">
                    <img
                        className="object-cover"
                        src="/images/KaijuKing.jpeg"
                        alt="Profile"
                    />
                </div>
                <div className="flex w-full flex-col items-center">
                    <nav className="mb-6 w-full border-t border-gray-300 pt-6 text-3xl text-white">
                        <ul>
                            <li className="mb-6 transition delay-75 ease-in-out hover:translate-x-6 hover:scale-110 hover:text-gray-300">
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
                            <li className="mb-6 transition delay-75 ease-in-out hover:translate-x-6 hover:scale-110 hover:text-gray-300">
                                <a href="#" className="flex items-center gap-2">
                                    <img
                                        src="/assets/icon/catalogo.png"
                                        alt="Catalogo"
                                        className="h-6 w-6"
                                    />
                                    Catalogo
                                </a>
                            </li>
                            <li className="mb-6 transition delay-75 ease-in-out hover:translate-x-6 hover:scale-110 hover:text-gray-300">
                                <a href="#" className="flex items-center gap-2">
                                    <img
                                        src="/assets/icon/facturacion.png"
                                        alt="Facturación"
                                        className="h-6 w-6"
                                    />
                                    Facturación
                                </a>
                            </li>
                            <li className="mb-6 transition delay-75 ease-in-out hover:translate-x-6 hover:scale-110 hover:text-gray-300">
                                <a href="#" className="flex items-center gap-2">
                                    <img
                                        src="/assets/icon/credito.png"
                                        alt="Creditos"
                                        className="h-6 w-6"
                                    />
                                    Creditos
                                </a>
                            </li>
                            <li className="mb-6 transition delay-75 ease-in-out hover:translate-x-6 hover:scale-110 hover:text-gray-300">
                                <a href="#" className="flex items-center gap-2">
                                    <img
                                        src="/assets/icon/inventario.png"
                                        alt="Inventario"
                                        className="h-6 w-6"
                                    />
                                    Inventario
                                </a>
                            </li>
                            <li className="mb-6 transition delay-75 ease-in-out hover:translate-x-6 hover:scale-110 hover:text-gray-300">
                                <a href="#" className="flex items-center gap-2">
                                    <img
                                        src="/assets/icon/pedido.png"
                                        alt="Pedidos"
                                        className="h-6 w-6"
                                    />
                                    Pedidos
                                </a>
                            </li>
                            <div className="mb-1 flex w-full justify-end border-t border-gray-300 pt-6"></div>
                            <li className="flex w-full justify-end transition delay-75 ease-in-out hover:scale-110">
                                <a onClick={cerrarSesion} href="#">
                                    <img
                                        src="/assets/icon/logout.svg"
                                        alt="Logout"
                                        className="h-10 w-10"
                                    />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
