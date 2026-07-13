export interface PropiedadImagen {
  id: number;
  imagen: string;
  orden: number;
}

export interface Propiedad {
  id: number;
  nombre: string;
  descripcion: string | null;
  tipo: string;
  operacion: 'Venta' | 'Renta';
  estado: string;
  municipio: string;
  colonia: string;
  calle: string | null;
  numero: string | null;
  precio: number;
  moneda: string;
  recamaras: number | null;
  banos: number | null;
  estacionamiento: number | null;
  m2_construccion: number | null;
  m2_terreno: number | null;
  antiguedad: number | null;
  niveles: number | null;
  precio_m2: number | null;
  estado_publicacion: 'Activa' | 'Pendiente' | 'Inactiva';
  id_user: number | null;
  imagenes: PropiedadImagen[];
}
