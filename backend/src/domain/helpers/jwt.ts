import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  JwtPayload,
} from "jsonwebtoken";

import JWT from "../../config/jwt";

interface Payload {
  id: string;
  email: string;
  exp?: number;
}

export const CreateToken = async (
  payload: Payload
): Promise<{ accessToken: string }> => {
  try {
    const accessToken = jwt.sign(payload, JWT.secret, { expiresIn: "7d" });

    return {
      accessToken,
    };
  } catch (error) {
    console.error("Error creating tokens:", error);
    throw new Error("Token creation failed");
  }
};
export const VerifyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT.secret, (err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          return reject({ err, message: "Token has expired" });
        }
        const jwtPayload = jwt.decode(token, { complete: true }) as JwtPayload;
        return reject({ err, payload: jwtPayload?.payload });
      }
      resolve(decoded as JwtPayload);
    });
  });
};
