import crypto from "crypto";
import path from "path";

export const uploadFile = (
  files: any,
  validExtensions = ["png", "jpg", "jpeg"],
  folder = ""
) => {
  return new Promise<string>((resolve, reject) => {
    const { img } = files;
    const shortName = img.name.split(".");
    const ext = shortName[shortName.length - 1];

    if (!validExtensions.includes(ext)) {
      return reject(`Invalid Extension, should be ${validExtensions}`);
    }

    const tempName = `${crypto.randomBytes(16).toString("hex")}.${ext}`;
    const uploadPath = path.join(__dirname, "../../uploads/", folder, tempName);

    img.mv(uploadPath, (err: Error) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(tempName);
    });
  });
};

export const uploadBlob = (files: any, ext = "", folder = "") => {
  return new Promise<string>((resolve, reject) => {
    const { blob } = files;
    const tempName = `${crypto.randomBytes(16).toString("hex")}.${ext}`;
    const uploadPath = path.join(__dirname, `../../uploads/`, folder, tempName);

    blob.mv(uploadPath, (err: Error) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(tempName);
    });
  });
};
