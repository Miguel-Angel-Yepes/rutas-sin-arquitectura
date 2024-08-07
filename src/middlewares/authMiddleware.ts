import { Request, Response, NextFunction } from 'express';
import { decoded } from '../utils/jwt';

interface UserPayload {
  token_type: string;
  user_id: string;
  iat: number;
  exp: number;
}

export function asureAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader: string | undefined = req.headers.authorization;

  //Recibe el token por la cabecera de la petición, si no se encuentra retorna que no la tiene, si la tiene hace el método, y si pasa la validación se agrega el payload al req de user y pasa a desarrollar el controlador
  if (!authHeader) {
    res.status(403).send({ msg: 'La petición no tiene la cabecera de autenticación' });
  }else{   
    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = decoded(token) as UserPayload;
      const { exp } = payload;
      const currentData = new Date().getTime();

      if (exp <= currentData) {
        res.status(400).send({ msg: 'El token ha expirado' });
      }

      (req as any).user = payload; 
      next();
    } catch (error) {
      res.status(400).send({ msg: 'Token inválido' });
    }    
  }

}