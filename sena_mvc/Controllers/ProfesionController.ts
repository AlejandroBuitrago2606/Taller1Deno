
//deno-lint-ignore-file

import { Profesion } from "../Models/ProfesionModels.ts";


export const getProfesion= async (ctx:any)=>{
    const{response} = ctx;

    try {

        const objProfesion = new Profesion();

        const listaProfesion = await objProfesion.SeleccionarProfesion();


        response.status =200;
        response.body ={
            success:true,
            data:listaProfesion
        }
        
    } catch (error) {

        response.status = 400;
        response.body = {
            success:false,
            msg: "Error al procesar su solicitud",
            errors: error

        }
        
    }
}

// Exporta una función vacía llamada 'postUser', que se usará en el futuro para manejar peticiones POST (crear usuarios)
export const postProfesion =  async (ctx:any) => {

    const {response, request} = ctx;
  
    try {
      
    //Obtiene el valor del encabezado HTTP "Content-Length" de la solicitud request y lo guarda en la variable contentLength
      const contentLength = request.headers.get("Content-Length");
  
    //Verificar si la solicitud tiene un cuerpo
  
    if (contentLength === "0"){
      response.status = 400;
      response.body = {success:false, msg:"Cuerpo de la solicitus esta Vacio"};
      return;
    }
  
    //Convetir el archivo a JSON
    const body = await request.body.json();
  
  
    //Estructura que necesitamos para insertar datos
    const  ProfesionData = {
  
      idprofesion: null,
      nombre_profesion: body.nombre_profesion,

    }
  
    //Cumplimos la promesa y el resultl llega bien al constrolador
    const objProfesion = new Profesion(ProfesionData)
    const result = await objProfesion.insertarProfesion(); 
    response.status = 200;
    response.body ={
    success: true,
    body: result,
  };
  
  console.log("Profesion creada correctamente." + result);

  
  
    } catch (error) {
      response.status= 400;
      response.body ={
        success: false,
         msg: `Error al procesar la solicitud. \n ${error}`

      }
      console.log(error);
  
  
    }

  
  }

  // Exporta una función vacía llamada 'putUser', para manejar peticiones PUT (actualizar usuarios)
export const putProfesion = async(ctx:any) => {
  const {request, response} = ctx;

  try {

     const contentLength = request.headers.get("Content-Length");
    if(contentLength === "0"){
      response.status = 400;
      response.body = {success: false, msg:"La solicitud no tiene cuerpo"}
      return;

    }

    const body = await request.body.json();
    
    const ProfesionData = {
      idprofesion: body.idprofesion,
      nombre_profesion: body.nombre_profesion
    };

      const  idProfesion = Number(body.idprofesion);

      const objProfesion = new Profesion(ProfesionData, idProfesion);
      const result = await objProfesion.actualizarProfesion();
      response.status = 200;
      response.body = {

        success: true,
        body: result
        
      };
}catch(error){
  response.status = 400;
  response.body = {
    success: false,
    msg: `Error al procesar la solicitud. \n ${error}`
  }
  console.log(error);
}
}

// Exporta una función vacía llamada 'deleteUser', para manejar peticiones DELETE (eliminar usuarios)
export const deleteProfesion =  async(ctx:any) => {
  const{request, response} =ctx;
try{
  if(!request.hasBody){
    response.status = 400;
    response.body ={success: false, msg:"La solicitud no tiene cuerpo"};
    return;
  }
  const body = await request.body.json();
  const{ idprofesion } = body;

  if(!idprofesion){
    response.status = 400;
    response.body= {success: false, msg: "ID de programa requerido"};
    return;
  }

  const objProfesion = new Profesion();
  const result = await objProfesion.eliminarProfesion(idprofesion);

  response.status = 200;
  response.body= {success: true, msg: "Profesion eliminado correctamente", data: result};
} catch(error){
  response.status = 500;
  response.body ={success: false, msg: "Error al eliminar el profesion", error};
}
    
}



  