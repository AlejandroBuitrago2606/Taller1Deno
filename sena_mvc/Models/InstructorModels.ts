//deno-lint-ignore-file

import { conexion } from "./conexion.ts";
import{z} from "../Dependencies/dependencias.ts"

//Crear interfaz que es la estructura de la base de datos
interface InstructorData{

    idinstructor: number | null;
    nombre: string;
    apellido:string;
    email: string;
    telefono:string;


}

//Crear la clase Instructor
export class Instructor{
 public _objInstructor: InstructorData | null; 
 public _idInstructor:  number | null;

 constructor(objInstru:InstructorData|null = null,idInstructor:number | null = null){
        this._objInstructor = objInstru;
        this._idInstructor = idInstructor
 }

 public async SeleccionarInstructor(): Promise<InstructorData[]>{
    const {rows:instructores} = await conexion.execute("SELECT * FROM instructor");
    return instructores as InstructorData[];
 }


 public async insertarInstructor(): Promise<{success:boolean;message:string;instructor?: Record<string, unknown>}>{

    try {

        if(!this._objInstructor){
            throw new Error("No se ha proporcionado un objeto de instructor valido")
        }

        const{nombre,apellido,email,telefono} = this._objInstructor;
        if (!nombre || !apellido || !email || !telefono) {
            throw new Error("Faltan Campos requeridos para insertar el instructor");
            
        }

        await conexion.execute("START TRANSACTION");

        const result = await conexion.execute('INSERT INTO instructor(nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)', [

            nombre,
            apellido,
            email,
            telefono
        ]);

        if(result && typeof result.affectedRows === "number"  && result.affectedRows > 0){
            const [instructor] = await conexion.query('SELECT * FROM instructor WHERE idinstructor = LAST_INSERT_ID()');

            await conexion.execute("COMMIT");

            return{success:true, message: "Instructor registrado correctamente", instructor:instructor};
            
        }else{
            throw new Error("No fue posible registar al Instructor")
        }


    } catch (error){
        if (error instanceof z.ZodError){
            return{success: false, message: error.message};
        }else{
            return{success: false, message: "Error al servidor"}
        }

    }
     
        
    }

    public async actualizarInstructor(
        idinstructor:number,
        nuevosDatos:{nombre?: string; apellido?: string; email?: string; telefono?:string}): Promise<{success: boolean; message: string}>{

            try {
                
                if (!idinstructor) {
                    throw new Error("ID de instructor invalido");
                    
                }

                const campos =[];
                const valores=[];


                if(nuevosDatos.nombre){
                    campos.push("nombre = ?");
                    valores.push(nuevosDatos.nombre);
            
                }

                if(nuevosDatos.apellido){
                    campos.push("apellido = ?");
                    valores.push(nuevosDatos.apellido);
            
                }

                if(nuevosDatos.email){
                    campos.push("email = ?");
                    valores.push(nuevosDatos.email);
            
                }

                if(nuevosDatos.telefono){
                    campos.push("telefono = ?");
                    valores.push(nuevosDatos.telefono);
            
                }

                if(campos.length === 0){
                    return {success: false, message: "No hay campos para actualizar"};
                }

                valores.push(idinstructor);

                const consulta = `UPDATE instructor SET ${campos.join(", ")} WHERE idinstructor = ?`;

                await conexion.execute ("START TRANSACTION");
                const result = await conexion.execute(consulta, valores);

                await conexion.execute("COMMIT");

                if(result && typeof result.affectedRows === "number" && result.affectedRows > 0) {
                    return{ success: true, message: "Instructor actualizado correctamente"};
        
                }else{
                    return {success: false, message: "No se actulizo ningun Instructor"};
                }
                
        
                } catch (error) {
                    await conexion.execute("ROLLBACK");
                    return {success: false, message: "Error al actualizar el usuario"};
                    
                }
            }

       // models/Instructor.ts
         public async eliminarInstructor(): Promise<{ success: boolean; message: string }> {
  try {
    const idInstructor = this._idInstructor;
    if (!idInstructor) {
      throw new Error("No se envió ningún idInstructor");
    }

    await conexion.execute("START TRANSACTION");

    // ← Aquí quitamos la desestructuración
    const result: any = await conexion.execute(
      `DELETE FROM instructor WHERE idinstructor = ?`,
      [idInstructor]
    );

    if (result.affectedRows > 0) {
      console.log("La eliminación fue exitosa");
      await conexion.execute("COMMIT");
      return {
        success: true,
        message: `Instructor Eliminado Correctamente. IdInstructor=${idInstructor}`
      };
    } else {
      await conexion.execute("ROLLBACK");
      throw new Error("No fue posible eliminar el instructor.");
    }

  } catch (error: unknown) {
    // Siempre rollback si algo falla
    try { await conexion.execute("ROLLBACK"); } catch (_) {}

    if (error instanceof z.ZodError) {
      return { success: false, message: error.message };
    } else if (error instanceof Error) {
      return { success: false, message: `Error interno del servidor: ${error.message}` };
    } else {
      return { success: false, message: "Error interno desconocido" };
    }
  }
}

}




 

