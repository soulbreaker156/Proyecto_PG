export interface Producto {
    id_producto: number;
    producto: string;
    descripcion: string;
    estado: 'mostrado' | 'oculto';
    precio: number;
    cantidad: number;
    fk_id_imagen: number;
}
export interface ImagenProducto {
    id_imagen: number;
    imagen: string;
}