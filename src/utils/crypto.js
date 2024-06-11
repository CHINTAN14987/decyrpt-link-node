import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = process.env.CRYPTO_SECRET; // 32 characters
const iv = crypto.randomBytes(16); // Initialization vector

// Encrypt function
export const encrypt = (text) => {

    
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};


