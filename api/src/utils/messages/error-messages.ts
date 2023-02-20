import { Response } from "express";

export const errorServerMessage = (res: Response) => {
  return res.status(500).json({
    status: false,
    msg: "Hubo un error el servidor, no se pudo obtener la información",
  });
};

export const errorNotFoundMessage = (res: Response) => {
  return res.status(404).json({
    status: false,
    msg: "404! Page not found",
  });
};

export const errorUnauthorizedMessage = (res: Response) => {
  return res.status(401).json({
    status: false,
    msg: "No se encuentra autorizado",
  });
};

export const errorRequired = (field: string) => {
  return `${field} es requerido`;
};

export const errorNumeric = (field: string) => {
  return `${field} tiene que ser numérico`;
};
