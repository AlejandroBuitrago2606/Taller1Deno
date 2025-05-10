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

public async insertarInstructorProfesion(): Promise<{ success: boolean; menssage: string; instructorprofesion?: Record<string, unknown> }> {

  try {
    if (!this._objInstructorProfesion) {
      throw new Error("No se ha proporcionado un objeto de tipo Instructor Profesion");
    }

    const { instructor_idinstructor, profesion_idprofesion } = this._objInstructorProfesion;

    if (!instructor_idinstructor || !profesion_idprofesion) {
      throw new Error("Faltan campos requeridos para insertar el Instructor Profesion");
    }

    await conexion.execute("START TRANSACTION");

    const result = await conexion.execute(
      'INSERT INTO instructor_has_profesion (instructor_idinstructor, profesion_idprofesion) VALUES (?, ?)',
      [instructor_idinstructor, profesion_idprofesion]
    );

    if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {
      const [rows] = await conexion.query(
        'SELECT * FROM instructor_has_profesion WHERE instructor_idinstructor = ? AND profesion_idprofesion = ?',
        [instructor_idinstructor, profesion_idprofesion]
      );

      await conexion.execute("COMMIT");

      return { success: true, menssage: "Instructor y profesión registrada correctamente", instructorprofesion: rows };
    } else {
      throw new Error("No es posible registrar al instructor y profesión");
    }

  } catch (error) {
    await conexion.execute("ROLLBACK");

    if (error instanceof z.ZodError) {
      return { success: false, menssage: error.message };
    } else {
      return { success: false, menssage: `Error al servidor: ${error instanceof Error ? error.message : String(error)}` };
    }
  }
}

//Metodo para actualizar el instructor y profesion
public async actualizarInstructorProfesion(): Promise<{success:boolean;menssage:string; instructorprofesion?:Record<string,unknown>}>{
    try {
        if(!this._objInstructorProfesion){
            throw new Error("No se ha proporcionado un objeto de tipo Instructor Profesion")
        }

        const { instructor_idinstructor, profesion_idprofesion } = this._objInstructorProfesion;

        if(!instructor_idinstructor || !profesion_idprofesion){
            throw new Error ("Faltan campos requeridos para actualizar el Instructor Profesion")
        }
        await conexion.execute("START TRANSACTION");

        
const result = await conexion.execute(
  'UPDATE instructor_has_profesion SET profesion_idprofesion = ? WHERE instructor_idinstructor = ?',
  [
    profesion_idprofesion,
    instructor_idinstructor
  ]
);


          
    

        console.log("se ejecuto la consulta");

       if(result && typeof result.affectedRows === "number" && result.affectedRows > 0 ){

      console.log("se actualizo correctamente");

      const[InstructorProfesion] = await conexion.query('SELECT * FROM instructor_has_profesion WHERE instructor_idinstructor = ? AND profesion_idprofesion = ?', [instructor_idinstructor, profesion_idprofesion]);

            await conexion.execute("COMMIT");
            console.log("Instructor y profesion actualizada correctamente", InstructorProfesion);
            return {success:true, menssage:"Instructor y profesion actualizada correctamente", instructorprofesion: InstructorProfesion};

        }
        else{
            throw new Error("No fue posible actualizar el instructor y profesion");
        }
      }catch (error) {

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

    await conexion.execute("START TRANSACTION");
    const result = await conexion.execute('DELETE FROM instructor_has_profesion WHERE instructor_idinstructor = ? AND profesion_idprofesion = ?',[instructor_idinstructor, profesion_idprofesion]);

    if(result && typeof result.affectedRows === "number" && result.affectedRows > 0){
        console.log("se elimino correctamente");
        await conexion.execute("COMMIT");
        return {success:true, menssage:"Instructor y profesion eliminada correctamente"};
        
    }else{
        throw new Error("No fue posible eliminar el instructor y profesion");
    }


}catch (error) {
  
    if(error instanceof z.ZodError){
        return{success: false, menssage: error.message};
    }else{
        return{success: false, menssage: `Error al servidor: ${error}`};
    }
}

}
}
