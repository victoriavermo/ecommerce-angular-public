export interface Filter{
  precio?: Precio | null | undefined ;
  color?: string | null | undefined ;
  tipo?: string | null | undefined ;
  texto?: string | null | undefined ;
}

interface Precio{
  precioMax: number;
  precioMin: number;
}
