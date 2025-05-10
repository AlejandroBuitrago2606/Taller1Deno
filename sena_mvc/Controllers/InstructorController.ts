//deno-lint-ignore-file
import { Instructor } from "../Models/InstructorModels.ts";

export const getInstructor = async (ctx: any) => {
  const { response } = ctx;

  try {
    const objInstructor = new Instructor();
    const listaInstructores = await objInstructor.SeleccionarInstructor();

    // ← CORRECCIÓN: status en lugar de sattus
    response.status = 200;
    response.body = {
      success: true,
      data: listaInstructores
    };

    console.log("Instructores obtenidos correctamente:", listaInstructores);
  } catch (error) {
    response.status = 400;
    response.body = {
      msg: "Error al procesar su solicitud",
      // imprime el mensaje real de error para ayudar al debug
      errors: error instanceof Error ? error.message : String(error)
    };
    console.error("Error en getInstructor:", error);
  }
};

export const postInstructor = async (ctx:any) =>{
     
    const {response, request} = ctx;

    try {

        const contentLength = request.headers.get("Content-Length")
    
 //Verificar si la solicitud tiene un cuerpo

 if (contentLength === "0"){
    response.status = 400;
    response.body = {success:false, msg:"Cuerpo de la solicitus esta Vacio"};
    return;
  }

  //Convetir el archivo a JSON
  const body = await request.body.json();


  //Estructura que necesitamos para insertar datos
  const  InstructorData = {

    idinstructor: null,
    nombre: body.nombres,
    apellido: body.apellidos,
    email: body.email,
    telefono: body.telefono,
   
  }

  //Cumplimos la promesa y el resultl llega bien al constrolador
  const objInstrucs = new Instructor(InstructorData)
  const result = await objInstrucs.insertarInstructor(); 
  response.status = 200;
  response.body ={
  success: true,
  body: result,
};



  } catch (error) {
    response.status= 400;
    response.body ={
      success: false,
      msg: "Error al procesar la solicitud"
    }


  }

}
// Exporta una función vacía llamada 'putUser', para manejar peticiones PUT (actualizar usuarios)
export const putInstructor = async(ctx:any) => {
    const {request, response} = ctx;
  
    try {
      if(!request.hasBody){
        response.status = 400;
        response.body = {success: false, msg:"La solicitud ni tiene cuerpo"}
        return;
  
      }
  
      const body = await request.body.json();
      const {idinstructor, nombres, apellidos, email,telefono} = body;
  
      if(!idinstructor){
        response.status = 400;
        response.body ={success:false, msg:"ID instructor requerido"};
        return;
      }
      const objInstrucs = new Instructor();
      const result = await objInstrucs.actualizarInstructor(idinstructor,{
  
        nombre: nombres,
        apellido:apellidos,
        email:email,
        telefono:telefono,
  
      });
  
      response.status = 200;
      response.body = { success: true, data: result};
     
  
    } catch (error) {
  
      response.status = 500;
      response.body = {success: false, msg: "Error al actualizar Instructor", error};
  
      
    }
  
      
  }

  // Exporta una función vacía llamada 'deleteUser', para manejar peticiones DELETE (eliminar usuarios)
export const deleteInstructor = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const idInstructor = Number(body.idinstructor);

        const objInstructor = new Instructor(null, idInstructor);
        const result = await objInstructor.eliminarInstructor();
        response.status = 200;
        response.body = {

            success: true,
            body: result

        }


    } catch (error) {
        response.status = 400;
        response.body = {

            success: false,
            msg: `Error al procesar la solicitud. \n ${error}`

        }
        console.log(error);


    }

}