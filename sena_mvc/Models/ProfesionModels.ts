//deno-lint-ignore-file


import { conexion } from "./conexion.ts";
import { z } from "../Dependencies/dependencias.ts";

interface ProfesionData {

    idprofesion: number | null;
    nombre_profesion: string;
}

export class Profesion {

    public _objProfesion: ProfesionData | null;
    public _idProfesion: number | null;

    constructor(objProfesion: ProfesionData | null = null, idProfesion: number | null = null) {

        this._objProfesion = objProfesion;
        this._idProfesion = idProfesion;

    }
    public async SeleccionarProfesion(): Promise<ProfesionData[]>{
       
        const {rows:profesion} = await conexion.execute('select * from profesion');
        return profesion as ProfesionData[];

    }
    public async insertarProfesion(): Promise<{success:boolean;menssage:string;profesion?: Record<string, unknown>}>{

        try {
              //Validar que el objeto de usurio(_objusurio)no sea nulo y que los campos requeridos esten definidos
              if(!this._objProfesion){
               throw new Error("No se ha proporcionado un objeto de programa valido")
   
           }
   
        
           const {nombre_profesion} = this._objProfesion;
           if(!nombre_profesion){
               throw new Error("Faltan campos requeridos para insertar el profesion.");
   
           }
   
           //Hacer la insersion a la basee de datos con la seguridad de cuidar la informacion
   
           await conexion.execute("START TRANSACTION");

           const result = await conexion.execute(`INSERT INTO profesion(nombre_profesion) VALUES (?)`, [
               nombre_profesion,
           ]);
           //Validar que la consulta se haya hecho exitosamente
   
           if(result && typeof result.affectedRows === "number" && result.affectedRows > 0){
   
               const [profesion] = await conexion.query(`SELECT * FROM profesion WHERE idprofesion = LAST_INSERT_ID()`,);
   
               await conexion.execute("COMMIT");

               return {success:true, menssage:"Profesion registrada correctamente", profesion:profesion};
           }else{
               throw new Error("No fue posible registar la profesion")
           }
        
           
        } catch (error) {
   
           if(error instanceof z.ZodError){
               return{success: false, menssage: error.message};
   
               }else{
                   return{success: false, menssage: "Error al servidor"}
   
               }
           }
         
           
        }

        public async actualizarProfesion(): Promise<{ success: boolean; message: string; profesion?: Record<string, unknown> }> {
  try {
    if (!this._objProfesion) {
      throw new Error("No se ha proporcionado un objeto de profesion válido.");
    }

    const { nombre_profesion } = this._objProfesion;
    if (!nombre_profesion) {
      throw new Error("Faltan campos requeridos para actualizar la profesion.");
    }

    if (!this._idProfesion) {
      throw new Error("No se envió ningún idProfesion");
    }
    const idProfesion = this._idProfesion;

    await conexion.execute("START TRANSACTION");

    // —> Paréntesis invertidos aquí: primero nombre_profesion, luego idProfesion
    const result: any = await conexion.execute(
  `UPDATE profesion SET nombre_profesion = ? WHERE idprofesion = ?`,
  [ nombre_profesion, idProfesion ]
);

    console.log("Resultado del UPDATE:", result);

    if (result.affectedRows > 0) {
      console.log("La actualización fue exitosa");

    const profesionRows: any = await conexion.query(
  `SELECT * FROM profesion WHERE idprofesion = ?`,
  [ idProfesion ]
);
      await conexion.execute("COMMIT");

      console.log("Obteniendo la profesion actualizada:", profesionRows);
      return {
        success: true,
        message: "Profesión actualizada correctamente.",
        profesion: profesionRows
      };
    } else {
      await conexion.execute("ROLLBACK");
      throw new Error("No fue posible actualizar la profesión (ID no encontrado)");
    }

  } catch (error: unknown) {
    try { await conexion.execute("ROLLBACK"); } catch (_) {}

    if (error instanceof z.ZodError) {
      return { success: false, message: error.message };
    } else if (error instanceof Error) {
      return { success: false, message: `Error interno del servidor: ${error.message}` };
    } else {
      return { success: false, message: `Error interno desconocido: ${JSON.stringify(error)}` };
    }
  }
}

          
        
             public async eliminarProfesion(
                idprofesion: number ): Promise<{success: boolean; message: string}>{
                    try {
                       if(!idprofesion) {
                        throw new  Error("ID de profesion requerido");
                       }
        
                    await conexion.execute("START TRANSACTION");
        
                    const result = await conexion.execute(`DELETE FROM profesion WHERE idprofesion = ?`, [idprofesion]);
                    await conexion.execute("COMMIT");
        
                    if(result && typeof result.affectedRows === "number"  && result.affectedRows > 0) {
                        return {success: true, message: "Profesion eliminado Correctamente"};
        
                    }else{
                        return{success: false, message: "No se elimino ninguna profesion"}
                    } 
        
                    } catch (error) {
        
                        await conexion.execute("ROLLBACK");
                        return{success: false, message: "Error al eliminar el profesion"}
                        
                    }
                }
             
        
            
        
        
        
        
        
        
        
                
             
}