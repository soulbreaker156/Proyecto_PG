import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import {
    ImagenProducto,
    Producto,
    ProductoForm,
} from '../Interfaces/interfaceInventario';
export default function FormularioProducto({
    productos,
    imagenes,
}: {
    productos?: Producto[];
    imagenes?: ImagenProducto[];
}) {
    const [imagenPreview, setImagenPreview] = useState<string | null>(null);
    // useForm para manejar el formulario
    const { data, setData, post, errors } = useForm<ProductoForm>({
        id: productos ? productos[0].id_producto : 0,
        producto: productos ? productos[0].producto : '',
        descripcion: productos ? productos[0].descripcion : '',
        precio: Number(productos ? productos[0].precio : 0).toFixed(2),
        cantidad: Number(productos ? productos[0].cantidad : 0).toFixed(0),
        imagen: null,
    });
    //Crea una url temporal para la imagen seleccionada para mostrar como preview
    useEffect(() => {
        if (!data.imagen) {
            setImagenPreview(null);
            return;
        }
        const img = data.imagen;
        const preview =
            img && typeof img !== 'string' ? URL.createObjectURL(img) : img;
        setImagenPreview(preview);
    }, [data.imagen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!productos) {
            post('/inventario/guardarProducto');
        } else {
            post('/inventario/actualizar');
        }
    };

    return (
        <>
            <div className="flex h-full w-full flex-col items-center justify-center gap-5">
                <div className="h-[30%] w-[20%] rounded-[5px] border-2 border-gray-300 p-2">
                    {imagenes && imagenes.length > 0 ? (
                        imagenes.map((img, index) => (
                            <img
                                key={index}
                                className="h-full w-full object-cover"
                                src={
                                    imagenPreview ||
                                    (typeof img.imagen === 'string'
                                        ? img.imagen
                                        : '/assets/productos/no-hay-imagen.jpg')
                                }
                                alt={`producto-${index}`}
                            />
                        ))
                    ) : (
                        <img
                            className="h-full w-full object-cover"
                            src={
                                imagenPreview ||
                                '/assets/productos/no-hay-imagen.jpg'
                            }
                            alt="no-hay-imagen"
                        />
                    )}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex w-full flex-col items-center justify-center gap-5"
                >
                    <div className="flex w-full justify-center gap-5">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="producto">Nombre del Producto</label>
                            <input
                                className="w-[300px] rounded-[10px] border border-gray-300 p-2"
                                type="text"
                                value={data.producto}
                                onChange={(e) =>
                                    setData('producto', e.target.value)
                                }
                                placeholder="Producto"
                            />
                                {errors.producto && (
                                    <span className="text-red-500">
                                        {errors.producto}
                                    </span>
                                )}
                            <label htmlFor="precio">Precio del Producto</label>
                            <input
                                className="w-[300px] rounded-[10px] border border-gray-300 p-2"
                                type="number"
                                value={data.precio}
                                onChange={(e) =>
                                    setData('precio', e.target.value)
                                }
                                placeholder="Precio"
                            />
                            {errors.precio && (
                                <span className="text-red-500">
                                    {errors.precio}
                                </span>
                            )}
                            <label htmlFor="descripcion">Descripción del Producto</label>
                            <textarea
                                className="w-[300px] rounded-[10px] border border-gray-300 p-2"
                                value={data.descripcion}
                                onChange={(e) =>
                                    setData('descripcion', e.target.value)
                                }
                                placeholder="Descripción"
                                rows={4}
                                maxLength={255}
                            />
                                {errors.descripcion && (
                                    <span className="text-red-500">
                                        {errors.descripcion}
                                    </span>
                                )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="cantidad">Cantidad del Producto</label>
                            <input
                                className="w-[300px] rounded-[10px] border border-gray-300 p-2"
                                type="number"
                                value={data.cantidad}
                                onChange={(e) =>
                                    setData('cantidad', e.target.value)
                                }
                                placeholder="Cantidad"
                            />
                            {errors.cantidad && (
                                <span className="text-red-500">
                                    {errors.cantidad}
                                </span>
                            )}
                            <label htmlFor="imagen">Imagen del Producto</label>
                            <input
                                className="w-[300px] rounded-[10px] border border-gray-300 p-2"
                                type="file"
                                onChange={(e) =>
                                    setData(
                                        'imagen',
                                        e.target.files?.[0] || null,
                                    )
                                }
                            />
                            {errors.imagen && (
                                <span className="text-red-500">
                                    {errors.imagen}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        className="w-[20%] rounded-[8px] text-white bg-[#0B0B0B] p-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#282727] cursor-pointer"
                        type="submit"
                    >
                        Agregar Producto
                    </button>
                </form>
            </div>
        </>
    );
}
