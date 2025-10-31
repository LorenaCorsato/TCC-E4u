// utils/cryptoUtil.js
const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Criptografa um texto.
 * Retorna uma string no formato: iv_hex:authTag_hex:encrypted_hex
 */
function encrypt(text) {
    if (!text) return null; // Não criptografa valores nulos

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();

    // Retorna IV, AuthTag e o Texto Criptografado, separados por :
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

/**
 * Descriptografa um texto no formato iv_hex:authTag_hex:encrypted_hex
 */
function decrypt(hash) {
    if (!hash) return null; // Não descriptografa valores nulos

    try {
        const parts = hash.split(':');
        if (parts.length !== 3) {
            throw new Error('Formato de hash inválido.');
        }

        const iv = Buffer.from(parts[0], 'hex');
        const authTag = Buffer.from(parts[1], 'hex');
        const encryptedText = Buffer.from(parts[2], 'hex');

        const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
        decipher.setAuthTag(authTag);
        
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    } catch (error) {
        console.error("Erro ao descriptografar:", error.message);
        return null; // Retorna nulo em caso de falha (ex: chave errada, dados corrompidos)
    }
}

module.exports = { encrypt, decrypt };