import bcrypt from 'bcryptjs'

export const encryptPass = async (password) => {
    return await bcrypt.hash(password, 10)
}

export const comparePass = async (password, encryptpass) => {
    return await bcrypt.compare(password, encryptpass)
}