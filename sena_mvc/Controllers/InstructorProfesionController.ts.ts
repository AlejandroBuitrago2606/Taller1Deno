//deno-lint-ignore-file
import { InstructorProfesion } from '../Models/InstructorProfesionModels.ts';





export const getInstructorProfesion = async(ctx: any) => {
    const {response} = ctx;

    try {
        const objInstructorProfesion = new InstructorProfesion();
        const listaInstructorProfesion = await objInstructorProfesion.SeleccionarInstructorProfesion();

        response.status = 200;
        response.body = {
            success:true,
            data: listaInstructorProfesion,
        }
    } catch (error) {
        response.status = 500;
        response.body = {
            success:false,
            message: "Error al obtener la lista de instructor y profesion",
            errors: error,
        }
        
    }
}

export const postInstructorProfesion = async(ctx: any) => {
const {response, request} = ctx;

try {
    const contentLength = request.headers.get("content-length");

    if(contentLength === "0"){
        response.status = 400;
        response.body = {
            success: false,
            message: "No se ha proporcionado el cuerpo de la solicitud"
        };
        
        return;
    }
const body = await request.body.json();

const InstructorProfesionData = {
    instructor_idinstructor: body.instructor_idinstructor,
    profesion_idprofesion: body.profesion_idprofesion,
};

const objInstructorProfesion = new InstructorProfesion(InstructorProfesionData)
const result = await objInstructorProfesion.insertarInstructorProfesion();

response.status = 201;
response.body = {
    success: true,
    data: result,
};

} catch (error) {
    
    response.status = 400;
    response.body = {
        success: false,
        msg: "Error al insertar el instructor y profesion",
        
    }
}
}


export const putInstructorProfesion = async(ctx: any) => {
    const {response, request} = ctx;
    try {
        const contentLength = request.headers.get("content-length");
        if(contentLength === "0"){
            response.status = 400;
            response.body = {
                success: false,
                message: "No se ha proporcionado el cuerpo de la solicitud"
            };
            
            return;
        }
        const body = await request.body.json();
       
        const InstructorProfesionData = {
            instructor_idinstructor: body.instructor_idinstructor,
            profesion_idprofesion: body.profesion_idprofesion

        };
        const objInstructorProfesion = new InstructorProfesion(InstructorProfesionData);
        const result = await objInstructorProfesion.actualizarInstructorProfesion();
        response.status = 200;
        response.body = {
            success: true,
            data: result
        };
        }catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            msg: "Error al actualizar el instructor y profesion",
            
        }
        console.log(error);
        
    }
    
}
//Metodo para eliminar el instructor y profesion
export const deleteInstructorProfesion = async(ctx: any) => {
    const {response, request} = ctx;
    
    try {
        if(!request.hasBody){
            response.status = 400;
            response.body = {
                success: false,
                message: "No se ha proporcionado el cuerpo de la solicitud"
            };
            
            return;
        }       
    } catch (error) {
        response.status = 500;          
        response.body = {
            success: false,
            msg: "Error al eliminar el instructor y profesion",
            
        }
    }
    const body = await request.body.json();
    const {instructor_idinstructor, profesion_idprofesion} = body;
    if(!instructor_idinstructor || !profesion_idprofesion){
        response.status = 400;
        response.body = {
            success: false,
            message: "Id del instructor o profesion no proporcionado"
        };

        
        return;
    }

    const objInstructorProfesion = new InstructorProfesion({ instructor_idinstructor, profesion_idprofesion });
    const result = await objInstructorProfesion.eliminarInstructorProfesion();
    
    response.status = 200;
    response.body = {
        success: true,
        data: result
    };
}