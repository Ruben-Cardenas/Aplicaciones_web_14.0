import { Request, Response } from 'express';
//Endpoint recibe un request, responde un response
export const login =(req:Request, res:Response)=> {
    //asignar tipo de dato despues  de:
    //inicializar la variable despues del =
    let number:number = 1;

    /*dentro del body del request buscar las variables
    de username y password*/
    const { username , password } = req.body;

    if (username !== 'admin' || password !== '12345') {
        return res.status(401).json({
            message: 'Credenciales Incorrectas'
        });
    }

    return res.json ({message: "Login exitoso"})

}   




