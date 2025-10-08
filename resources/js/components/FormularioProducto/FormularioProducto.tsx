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
    console.log(productos);
    console.log(imagenes);
    const { data, setData, post } = useForm<ProductoForm>({
        id: productos ? productos[0].id_producto : 0,
        producto: productos ? productos[0].producto : '',
        descripcion: productos ? productos[0].descripcion : '',
        precio: String(productos ? productos[0].precio : ''),
        cantidad: String(productos ? productos[0].cantidad : ''),
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
            <div className="flex h-full w-full flex-col items-center gap-5">
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
                    className="flex w-full flex-col items-center justify-center gap-3"
                >
                    <div className="flex w-full justify-center gap-3">
                        <div className="flex flex-col gap-3">
                            <input
                                className="w-[300px] rounded-[10px] border border-gray-300 p-2"
                                type="text"
                                value={data.producto}
                                onChange={(e) =>
                                    setData('producto', e.target.value)
                                }
                                placeholder="Producto"
                            />
                            <input
                                className="w-[300px] rounded-[10px] border border-gray-300 p-2"
                                type="text"
                                value={data.descripcion}
                                onChange={(e) =>
                                    setData('descripcion', e.target.value)
                                }
                                placeholder="Descripción"
                            />
                            <input
                                className="w-[300px] rounded-[10px] border border-gray-300 p-2"
                                type="number"
                                value={data.precio}
                                onChange={(e) =>
                                    setData('precio', e.target.value)
                                }
                                placeholder="Precio"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <input
                                className="w-[300px] rounded-[10px] border border-gray-300 p-2"
                                type="number"
                                value={data.cantidad}
                                onChange={(e) =>
                                    setData('cantidad', e.target.value)
                                }
                                placeholder="Cantidad"
                            />
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
                        </div>
                    </div>
                    <button
                        className="w-[20%] rounded-[10px] border border-gray-300 p-2"
                        type="submit"
                    >
                        Agregar Producto
                    </button>
                </form>
            </div>
        </>
    );
}
