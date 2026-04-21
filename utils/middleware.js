const utf8 = require("utf8");
const crypto = require('crypto');
const btoa = require("btoa");
const { CRYPTO_ENCRYPT_DECRYPT_API_KEY, CRYPTO_ENCRYPT_DECRYPT_API_IV } = require("../config/config");


const decodeBase64Middleware = (req, res, next) => {
    try {

        if (req.body && req.body.req) {
            const res = JSON.parse(Buffer.from(req.body.req, 'base64').toString('utf-8'));
            console.log("data: " + JSON.stringify(res), typeof res);
            req.body = res.data
            next();
        } else {
            console.log("isHERE", req.body);
            next();
        }
    } catch (error) {
        console.log("Error decoding", error);

        res.status(400).json({ message: 'Invalid Base64 data format', status: false });
    }
};

function returnApiResult(req, res, response) {
    // Convert the response to JSON and encode as UTF-8
    let result = JSON.stringify(response.data);
    let myJSON = utf8.encode(result);
    console.log("myJSON", myJSON);


    const debugJsonView = req.body?.debugJsonView || 0;
    const apiType = req.body?.api_type || "";
    const isCrypto = req.body?.is_crypto || "";

    if (debugJsonView == 0) {
        if (apiType == "MOBILE_API_TYPE") {
            const convertBtoA = btoa(myJSON);
            const encrypted = encryptCryptoMobile(convertBtoA);
            return { response: isCrypto === "ACTIVE" ? encrypted : convertBtoA };
        } else {
            const convertBtoA = btoa(myJSON);
            console.log("convertBtoA", convertBtoA);

            const encrypted = encryptCrypto(convertBtoA);
            return { response: isCrypto === "ACTIVE" ? encrypted : convertBtoA };
        }
    } else {
        console.log("elseee")
        return { response: JSON.parse(myJSON) };
    }
}
const encryptCryptoMobile = (textString) => {
    try {
        const cipher = crypto.createCipheriv("aes-256-cbc", CRYPTO_ENCRYPT_DECRYPT_API_KEY, CRYPTO_ENCRYPT_DECRYPT_API_IV);
        let crypted = cipher.update(textString, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    } catch (error) {
        console.error("encryptUsingNodeCrypto: An error occurred: ", error);
        throw error;
    }
}
const encryptCrypto = (textString) => {
    try {
        const cipher = crypto.createCipheriv("aes-256-ctr", CRYPTO_ENCRYPT_DECRYPT_API_KEY, CRYPTO_ENCRYPT_DECRYPT_API_IV);
        let crypted = cipher.update(textString, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    } catch (error) {
        console.error("encryptUsingNodeCrypto: An error occurred: ", error);
        throw error;
    }
}
module.exports = { decodeBase64Middleware, returnApiResult };
