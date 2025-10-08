export interface Producto {
    id_producto?: number;
    producto?: string;
    descripcion?: string;
    estado?: 'mostrado' | 'oculto';
    estatus?: 'activo' | 'inactivo';
    precio?: number;
    cantidad?: number;
    fk_id_imagen?: number;
}
export interface ImagenProducto {
    id_imagen?: number;
    imagen?: string | null;
}
export interface ProductoForm {
    id?: number;
    producto?: string;
    descripcion?: string;
    precio?: string | number;
    cantidad?: string | number;
    imagen?: File | null;
}