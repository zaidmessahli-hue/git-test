import { idEstValide, texteEstValide } from '../public/js/validation.js'

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {import("express").NextFunction} next 
 */
export function texteValide(request, response, next) {
    if(texteEstValide(request.body.texte)) {
        return next();
    }

    response.status(400).end();
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {import("express").NextFunction} next 
 */
export function idValide(request, response, next) {
    if(idEstValide(request.body.id)) {
        return next();
    }

    response.status(400).end();
}