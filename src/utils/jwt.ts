// En las dependencias se deben instalar los siguientes módulos:
//npm install jsonwebtoken
//Además instalar los tipos
//npm install @types/jsonwebtoken --save-dev

import jwt, { JwtPayload } from 'jsonwebtoken';

//Recomiendo almacenar el valor de la secret key en un fichero de constantes y hacer la importación
const JWT_SECRET_KEY = 'ukIzB3S8UeXDNeVBMYh9YOlyRNqq';

interface User {
  _id: string;
}

interface Payload extends JwtPayload {
  token_type: string;
  user_id: string;
  iat: number;
  exp: number;
}

function createAccessToken(user: User): string {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);

  const payload: Payload = {
    token_type: 'access',
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
}

function createRefreshToken(user: User): string {
  const expToken = new Date();
  expToken.setMonth(expToken.getMonth() + 1);

  const payload: Payload = {
    token_type: 'refresh',
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
}

function decoded(token: string): string | JwtPayload | null {
  return jwt.decode(token, { complete: false }) as JwtPayload | null;
}

export {
  createAccessToken,
  createRefreshToken,
  decoded
};

