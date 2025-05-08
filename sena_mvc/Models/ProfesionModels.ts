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
           
           const result = await conexion.execute(`insert into profesion(nombre_profesion)values(?)`,[
               nombre_profesion,
           ]);
           //Validar que la consulta se haya hecho exitosamente
   
           if(result && typeof result.affectedRows === "number" && result.affectedRows > 0){
   
               const [profesion] = await conexion.query(`select * from profesion WHERE idprofesion = LAST_INSERT_ID()`,);
   
               await conexion.execute("COMMIT");
   
               return {success:true, menssage:"Prodesion registrada correctamente", profesion:profesion};
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

        public async actualizarProfesion(
            idprofesion: number,
            nuevosDatos: {nombre_profesion?: string; }): Promise<{success: boolean; message: string}>{
        
                try {
                
                    if (!this._idProfesion) {
                        throw new Error("ID de programa invalido");
                    }
        
                const campos =[];
                const valores =[];
        
                if(nuevosDatos.nombre_profesion){
                    campos.push("nombre_nombre_programa = ?");
                    valores.push(nuevosDatos.nombre_profesion);
                }
        
                
                valores.push(idprofesion);
        
                const consulta = `UPDATE profesion SET ${campos.join(", ")} WHERE idprofesion = ?`;
        
                await conexion.execute ("START TRANSACTION");
                const result = await conexion.execute(consulta, valores);
        
                await conexion.execute("COMMIT");
        
                if(result && typeof result.affectedRows === "number" && result.affectedRows > 0) {
                    return{ success: true, message: "Profesion actualizada correctamente"};
        
                }else{
                    return {success: false, message: "No se actulizo ninguna profesion"};
                }
                
        
                } catch (error) {
                    await conexion.execute("ROLLBACK");
                    return {success: false, message: "Error al actualizar el profesion"};
                    
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