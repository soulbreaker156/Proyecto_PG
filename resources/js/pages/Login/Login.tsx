import LoginLayout from "@/layouts/LoginLayout";
import { useForm } from "@inertiajs/react";
export default function LoginPage() {
    const { data, setData, post } = useForm({
        usuario: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <LoginLayout>
            <form onSubmit={handleSubmit}>
                <label htmlFor="usuario">Usuario</label>
                <input
                    type="text"
                    id="usuario"
                    value={data.usuario}
                    onChange={(e) => setData("usuario", e.target.value)}
                />
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </LoginLayout>
    );
}