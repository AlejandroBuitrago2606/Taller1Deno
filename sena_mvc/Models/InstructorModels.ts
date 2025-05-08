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
    const {rows:intrucs} = await conexion.execute(`select * from usuario`);
    return intrucs as InstructorData[];
 }


 public async insertarInstructor(): Promise<{success:boolean;menssage:string;instructor?: Record<string, unknown>}>{

    try {

        if(!this._objInstructor){
            throw new Error("No se ha proporcionado un objeto de instructor valido")
        }

        const{nombre,apellido,email,telefono} = this._objInstructor;
        if (!nombre || !apellido || !email || !telefono) {
            throw new Error("Faltan Campos requeridos para insertar el usurio");
            
        }

        await conexion.execute("START TRANSACTION");

        const result = await conexion.execute('insert into instructor(nombre,apellido,email,telefono)values(?,?,?,?)',[
            nombre,
            apellido,
            email,
            telefono
        ]);

        if(result && typeof result.affectedRows === "number"  && result.affectedRows > 0){
            const [instructor] = await conexion.query('select * from instructor WHERE idinstructor = LAST_INSERT_ID',);

            await conexion.execute("COMMIT");

            return{success:true, menssage: "Instructor registrado correctamente", instructor:instructor};
            
        }else{
            throw new Error("No fue posible registar al Instructor")
        }


    } catch (error){
        if (error instanceof z.ZodError){
            return{success: false, menssage: error.message};
        }else{
            return{success: false, menssage: "Error al seervidor"}
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
                    campos.push("aoellido = ?");
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

            public async eliminarInstructor(
                idinstructor: number ): Promise<{success: boolean; message: string}>{
                    try {
                       if(!idinstructor) {
                        throw new  Error("ID de instructor requerido");
                       }
        
                    await conexion.execute("START TRANSACTION");
        
                    const result = await conexion.execute(`DELETE FROM instructor WHERE idInstructor = ?`, [idinstructor]);
                    await conexion.execute("COMMIT");
        
                    if(result && typeof result.affectedRows === "number"  && result.affectedRows > 0) {
                        return {success: true, message: "Instructor eliminado Correctamente"};
        
                    }else{
                        return{success: false, message: "No se elimino ningun  instructor"}
                    } 
        
                    } catch (error) {
        
                        await conexion.execute("ROLLBACK");
                        return{success: false, message: "Error al eliminar el instructor"}
                        
                    }
                }
             
            





        }


 

