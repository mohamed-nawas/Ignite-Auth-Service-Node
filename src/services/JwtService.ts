const fs = require('fs');
const jwt = require('jsonwebtoken');

var PRIVATE_KEY = fs.readFileSync('src/keys/private.key', 'utf8');
var PUBLIC_KEY = fs.readFileSync('src/keys/public.key', 'utf8');

module.exports = {
    sign: (payload: any, $Options: JwtSignVerifyOptions) => {

        // Token signing options
        var signOptions = {
            issuer:  $Options.issuer,
            subject:  $Options.subject,
            audience:  $Options.audience,
            expiresIn:  "1h",    // 1 hour validity
            algorithm:  "RS256"    
        };
        return jwt.sign(payload, PRIVATE_KEY, signOptions);
    },

    verify: (token: string, $Option: JwtSignVerifyOptions) => {
        
        var verifyOptions = {
            issuer:  $Option.issuer,
            subject:  $Option.subject,
            audience:  $Option.audience,
            expiresIn:  "1h",
            algorithm:  ["RS256"]
        };

        try {
            return jwt.verify(token, PUBLIC_KEY, verifyOptions);
        } catch (err){
            return false;
        }
    },

    decode: (token: string) => {
        return jwt.decode(token, {complete: true});
        //returns null if token is invalid
    }
}

interface JwtSignVerifyOptions {
    issuer: string;
    subject: string;
    audience: string;
}