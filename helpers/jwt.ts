import { sign } from "jsonwebtoken";

export const generateJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };
    sign(payload, process.env.JWT_KEY || "Generic Secret Key", (err, token) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};
