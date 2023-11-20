import bcrypt from "bcrypt";


export const hashedPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(13);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
};

export const comparePassword = (password: string, hashedPassword: string) => {
    const isMatch = bcrypt.compareSync(password, hashedPassword);
    return isMatch;
};