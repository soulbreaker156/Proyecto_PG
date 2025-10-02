import LoginLayout from '@/layouts/LoginLayout';
import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
export default function LoginPage() {
    const { flash } = usePage().props as {
        flash?: { title: string; message: string; icon: 'success' | 'error' };
    };
    const { data, setData, post } = useForm({
        usuario: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    useEffect(() => {
        if (flash?.icon === 'success') {
            Swal.fire({
                title: flash.title,
                text: flash.message,
                icon: flash.icon,
                timer: 1500,
                showConfirmButton: false,
            });
        } else if (flash?.icon === 'error') {
            Swal.fire({
                title: flash.title,
                text: flash.message,
                icon: flash.icon,
                timer: 2500,
                showConfirmButton: false,
            });
        }
    }, [flash]);

    return (
        <LoginLayout>
            <form
                className="mt-2 flex flex-col sm:mt-10"
                onSubmit={handleSubmit}
            >
                <label className="text-[22px]" htmlFor="usuario">
                    Usuario
                </label>
                <input
                    type="text"
                    id="usuario"
                    className="mb-4 rounded-[8px] border border-gray-300 bg-[#DADADA] p-3 outline-none focus:border-gray-400"
                    value={data.usuario}
                    onChange={(e) => setData('usuario', e.target.value)}
                />
                <label className="text-[22px]" htmlFor="password">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    className="mb-5 rounded-[8px] border border-gray-300 bg-[#DADADA] p-3 outline-none focus:border-gray-400"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                <div className="flex min-w-full justify-center">
                    <button
                        className="min-w-[60%] rounded-[8px] bg-[#0B0B0B] p-2 text-[22px] text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#282727]"
                        type="submit"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </LoginLayout>
    );
}
