import LoginLayout from '@/layouts/LoginLayout';
import { useForm, usePage } from '@inertiajs/react';
import {Inertia} from '@inertiajs/inertia';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
export default function LoginPage() {

    const { flash } = usePage().props as { flash?: { title: string; message: string; icon: 'success' | 'error'}};
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
          showConfirmButton: false
        });
        // Puedes redirigir aquí si lo necesitas
      } else if (flash?.icon === 'error') {
        Swal.fire({
          title: flash.title,
          text: flash.message,
          icon: flash.icon,
          timer: 2500,
          showConfirmButton: false
        });
      }
    }, [flash]);

    return (
        <LoginLayout>
            <form onSubmit={handleSubmit}>
                <label htmlFor="usuario">Usuario</label>
                <input
                    type="text"
                    id="usuario"
                    value={data.usuario}
                    onChange={(e) => setData('usuario', e.target.value)}
                />
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </LoginLayout>
    );
}
