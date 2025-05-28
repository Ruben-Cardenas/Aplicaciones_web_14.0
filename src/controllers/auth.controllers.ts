import { Request, Response } from 'express';
import { generateAccessToken } from '../utils/generateToken';
import { cache } from '../utils/cache';
import dayjs from 'dayjs';
import { User } from '../models/user';
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

    const userId = "123456789"
    const accessToken = generateAccessToken(userId);

    cache.set (userId,accessToken,60 * 15)
    return res.json ({
        message: "Login exitoso",
        accessToken

    })

}   

export const getTimeToken = (req: Request, res: Response) => {
    //const userId = "123456789";
    const {userId} = req.params;
    const ttl = cache.getTtl(userId);
    
    if (!ttl){
        return res.status(404).json({
            message: "Token no encontrado"});

    }

    const now = Date.now();
    const timeTolifeSeconds = Math.floor((ttl - now) / 1000);

    const expTime = dayjs(ttl).format('HH:mm:ss');
    return res.json({
        message: "Tiempo de vida del token",
        timeTolifeSeconds,
        expTime
    });
}


// La función dayjs ya no es necesaria porque se importa la librería dayjs


export const UpdateToken = (req: Request, res: Response) => {
    const {userId} = req.params;
    const ttl = cache.getTtl(userId);
    
    if (!ttl){
        return res.status(404).json({
            message: "Token no encontrado"});

    }
    const newTime : number = 60 * 15;
    cache.ttl(userId, newTime);//actualiza tiempo de vida del token;

    return res.json({message: "Actualizacion exitosa"});

}


export const getAllUsers =async (req:Request, res:Response)=>{
    const userList=await User.find(); //Para encontrar todos los registros
    return res.json({userList})
}


export const getUserByusername = async (req: Request , res:Response) => {
    const { userName } = req.params;
    console.log(userName)
    const UserByusername = await User.find ({username: userName});
    
    if (!UserByusername) {
        return res.status(404).json ({massege: "Usuario no encontrado"})
    }
    return res.json({UserByusername})
}



export const saveUser = async (req: Request, res: Response) => {
    try {
        const {fullname, userName, email, phone, password, role} = req.body;

        const newUser = new User ({
            name: fullname,
            username: userName,
            email,
            phone,
            password,
            role,
            status : true
        });

        const savedUser = await newUser.save();
        return res.json(savedUser);
    } catch (error) {
        return res.status(500).json({ message: "Error al guardar el usuario", error });
    }
}


export const updateUser = async (req:Request , res:Response ) =>{
    try {
        const{userId}=req.params;
        const{emailUser, phone , password , role, name} = req.body

        const user = await User.findById(userId);

        if (!user){
            return res.status (404).json({
                massage: "usuario no encontado"
            });
        }

        const userEmail=await User.find({email: emailUser})
        if (userEmail && userEmail.length > 0){
            return res.status(426).json({
                massage: "el correo ya esta ocupado"
            })
        }

        user.email= emailUser;
        user.password = password != null ? password : user.password; //if ternario
        user.role = role;
        user.phone = phone;
        user.name = name;

        const updateUser=await user.save();

        return res.json({ updateUser});
    }catch(error){
        console.log ("Error en UpdateUser: ", error);
        return res.status(426).json({ error })
    }
}