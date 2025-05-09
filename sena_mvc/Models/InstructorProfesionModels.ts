//deno-lint-ignore-file

import { conexion } from "./conexion.ts";
import {z} from "../Dependencies/dependencias.ts";
import { number, unknown } from "https://deno.land/x/zod@v3.24.1/types.ts";



interface InstructorProfesionData{
instructor_idinstructor: number | null;
profesion_idprofesion: number | null;

}
export class InstructorProfesion{
public _objInstructorProfesion: InstructorProfesionData | null;



constructor(objInstruProfesion:InstructorProfesionData| null = null){


    this._objInstructorProfesion = objInstruProfesion;
   
}

public async SeleccionarInstructorProfesion(): Promise<InstructorProfesionData[]>{
    const {rows:intruprofesion} = await conexion.execute('select * from instructor_has_profesion');
    return  intruprofesion as InstructorProfesionData[];
}

public async insertarInstructorProfesion(): Promise<{success:boolean;menssage:string;instructorprofesion?: Record<string, unknown>}>{

    try {
       
        if(!this._objInstructorProfesion){
            throw new Error("No se ha proporcionado un objeto de tipo Instructor Profesion")
        }

        const { instructor_idinstructor, profesion_idprofesion } = this._objInstructorProfesion;

        if(!instructor_idinstructor || !profesion_idprofesion){
            throw new Error ("Faltan campos requeridos para insertar el Instructo Prfesion")
        }
        await conexion.execute("START TRANSACTION");

        

        const result = await conexion.execute('insert into instructor_has_profesion(instructor_idinstructor,profesion_idprofesion)values(?,?)',[
            instructor_idinstructor,
            profesion_idprofesion,
        ]);

if(result && typeof result.affectedRows === "number" && result.affectedRows > 0 ){
    const [instructorprofesion] = await conexion.query('select * from instructor_has_profesion WHERE instructor_idinstructor && profesion_idprofesion = LAST_INSERT_ID()',);

    await conexion.execute("COMMIT");

    return {success:true, menssage:"Instructor y profesion registrada correctamente", instructorprofesion:instructorprofesion};
}else{
    throw new Error("No es posible registar al indtructor y profesion")
}

    } catch (error) {
        if(error instanceof z.ZodError){
            return{success: false, menssage: error.message};

        }else{

            return{success: false, menssage: "Error al servidor"}
        }
        
    }
}

//Metodo para actualizar el instructor y profesion
public async actualizarInstructorProfesion(): Promise<{success:boolean;menssage:string}>{
    try {
        if(!this._objInstructorProfesion){
            throw new Error("No se ha proporcionado un objeto de tipo Instructor Profesion")
        }

        const { instructor_idinstructor, profesion_idprofesion } = this._objInstructorProfesion;

        if(!instructor_idinstructor || !profesion_idprofesion){
            throw new Error ("Faltan campos requeridos para actualizar el Instructo Prfesion")
        }
        await conexion.execute("START TRANSACTION");

        

        const result = await conexion.execute('update instructor_has_profesion set instructor_idinstructor = ?, profesion_idprofesion = ? where instructor_idinstructor = ? and profesion_idprofesion = ?',[
            instructor_idinstructor,
            profesion_idprofesion,
           
        ]);

        if(result && typeof result.affectedRows === "number" && result.affectedRows > 0 ){
            await conexion.execute("COMMIT");
            return {success:true, menssage:"Instructor y profesion actualizada correctamente"};
        }else{
            throw new Error("No es posible actualizar al indtructor y profesion");
        }

    } catch (error) {
        if(error instanceof z.ZodError){
            return{success: false, menssage: error.message};

        }else{

            return{success: false, menssage: "Error al servidor"};
        }
        
    }
}
    
//Metodo para eliminar el instructor y profesion
public async eliminarInstructorProfesion(): Promise<{success:boolean;menssage:string}>{

    try {
        if(!this._objInstructorProfesion){
            throw new Error("No se ha proporcionado un objeto de tipo Instructor Profesion")
        }

        const { instructor_idinstructor, profesion_idprofesion } = this._objInstructorProfesion;

        if(!instructor_idinstructor || !profesion_idprofesion){
            throw new Error ("Faltan campos requeridos para eliminar el Instructo Prfesion")
        }
        await conexion.execute("START TRANSACTION");

        

        const result = await conexion.execute('delete from instructor_has_profesion where instructor_idinstructor = ? and profesion_idprofesion = ?',[
            instructor_idinstructor,
            profesion_idprofesion,
           
        ]);

        if(result && typeof result.affectedRows === "number" && result.affectedRows > 0 ){
            await conexion.execute("COMMIT");
            return {success:true, menssage:"Instructor y profesion eliminada correctamente"};
        }else{
            throw new Error("No es posible eliminar al indtructor y profesion");
        }

    } catch (error) {
        if(error instanceof z.ZodError){
            return{success: false, menssage: error.message};

        }else{

            return{success: false, menssage: "Error al servidor"};
        }
        
    }


}
}



