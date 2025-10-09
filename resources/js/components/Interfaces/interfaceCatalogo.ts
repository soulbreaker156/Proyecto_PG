export interface Producto {
    id_producto: number;
    producto: string;
    descripcion: string;
    precio: number | string;
    cantidad: number;
    fk_id_imagen: number;
}
export interface ImagenProducto {
    id_imagen: number;
    imagen: string | null;
}