import { Producto, ImagenProducto } from "../Interfaces/interfaceInventario";
export default function FormularioProducto({productos,imagenes}: {productos?: Producto[]; imagenes?: ImagenProducto[];}){
console.log(imagenes);


    return(
        <div className="border-2 border-gray-300 h-[30%] w-[20%] rounded-[5px] p-2">
            {imagenes?.map((img, index) => (
                <img key={index} className="w-full h-full object-cover" src={img.imagen} alt={`producto-${index}`} />
            ))}
        </div>
    );
}