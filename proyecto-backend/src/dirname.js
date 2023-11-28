import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = (password) =>{
   return bcrypt.hashSync(password, bcrypt.genSaltSync())
};

export const isValidPassword = (password, userInfo)=> {
    return bcrypt.compareSync(password, userInfo.password)
}
