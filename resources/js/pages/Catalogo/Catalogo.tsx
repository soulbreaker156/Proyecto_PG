import SistemaLayout from "@/layouts/SistemaLayout/SistemaLayout";
import { usePage,Head } from "@inertiajs/react";
import { Producto,ImagenProducto } from "@/components/Interfaces/interfaceCatalogo";
import CardProductos from "@/components/CardProductos/CardProductos";
export default function Catalogo() {
    const { productos, imagenes } = usePage<{ productos: Producto[]; imagenes: ImagenProducto[]; }>().props;
console.log(productos);
    console.log(imagenes);
    return (
        <>
        <Head>
            <title>Catálogo</title>
            <meta name="description" content="Catálogo de productos disponibles" />
        </Head>
        <SistemaLayout>
            <div className=" h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                {productos.map((producto) => {
                    const imagen = imagenes.find(img => img.id_imagen === producto.fk_id_imagen);
                    return imagen ? (
                        <CardProductos key={producto.id_producto} producto={producto} imagen={imagen} />
                    ) : null;
                })}
            </div>
        </SistemaLayout>
        </>
    );
}
