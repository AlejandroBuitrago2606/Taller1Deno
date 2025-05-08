import { conexion } from "./conexion.ts";
import { z } from "../Dependencies/dependencias.ts";

interface ProgramaData {

    idprograma: number | null;
    nombre_programa: string;
}

export class Programa {

    public _objPrograma: ProgramaData | null;
    public _idPrograma: number | null;

    constructor(objProgram: ProgramaData | null = null, idPrograma: number | null = null) {

        this._objPrograma = objProgram;
        this._idPrograma = idPrograma;

    }

    //GET de programa
    public async GETProgramas(): Promise<ProgramaData[]> {

        const { rows: programs } = await conexion.execute("SELECT * FROM programa");
        return programs as ProgramaData[];


    }

    //POST de programa
    public async POSTPrograma(): Promise<{ success: boolean; message: string; programa?: Record<string, unknown> }> {

        try {
            
            if (!this._objPrograma) {

                throw new Error("No se ha proporcionado un objeto programa válido.");
            }

            const { nombre_programa } = this._objPrograma;
            if (!nombre_programa) {

                throw new Error("Faltan campos requeridos para insertar el programa.");
            }

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(`INSERT INTO programa(nombre_programa) VALUES(?)`, [
                nombre_programa
            ]);

            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {

                const [programa] = await conexion.query(`SELECT * FROM programa WHERE idprograma = LAST_INSERT_ID()`,);
                await conexion.execute("COMMIT");

                return { success: true, message: "Programa Registrado Correctamente.", programa: programa };

            }
            else {
                throw new Error("No fue posible registrar el programa.");
            }

        } catch (error) {
            
            if (error instanceof z.ZodError) {
                return {success: false, message: error.message}


            }
            else{
                return {success: false, message: "Error interno del servidor"};
            }
        }

    }

    //PUT de programa
    public async PUTPrograma(): Promise<{ success: boolean; message: string; programa?: Record<string, unknown> }> {

        try {

            //Validar que el obj de usuario no sea null y los campos requeridos esten definidos.
            if (!this._objPrograma) {

                throw new Error("No se ha proporcionado un objeto de programa válido.");
            }

            const { nombre_programa } = this._objPrograma;
            if (!nombre_programa) {

                throw new Error("Faltan campos requeridos para insertar el programa.");
            }


            if (!this._idPrograma) {
                
                throw new Error("No se envio ningun idPrograma");
            }
            const idPrograma = this._idPrograma;

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(`UPDATE programa SET nombre_programa=? WHERE idprograma=?`, [
                this._objPrograma.nombre_programa,
                idPrograma
            ]);

            console.log("Se ejecuto la consulta");
            

            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {

                console.log("La actualizacion fue exitosa");

                const [programa] = await conexion.query(`SELECT * FROM programa WHERE idprograma = ?`, [idPrograma]);
                await conexion.execute("COMMIT");
                console.log("Obteniendo el programa actualizado" + programa);

                return { success: true, message: "Programa Actualizado Correctamente.", programa: programa };

            }
            else {
                throw new Error("No fue posible actualizar el programa.");
            }


        } catch (error) {

            if (error instanceof z.ZodError) {
                return {success: false, message: error.message}
            }
            else{
                return {success: false, message: `Error interno del servidor: ${error}`};
            }


        }




    }

    //DELETE de programa
    public async DELETEPrograma(): Promise<{ success: boolean; message: string;}> {

        try {

            
            if (!this._idPrograma) {
                
                throw new Error("No se envio ningun idPrograma");
            }

            const idPrograma = this._idPrograma;

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(`DELETE FROM programa WHERE idprograma=?`, [idPrograma]);

            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {

                console.log("La eliminacion fue exitosa");

                return { success: true, message: `Programa Eliminado Correctamente. IdPrograma= ${idPrograma}` };

            }
            else {
                throw new Error("No fue posible eliminar el programa.");
            }


        } catch (error) {

            if (error instanceof z.ZodError) {
                return {success: false, message: error.message}
            }
            else{
                return {success: false, message: `Error interno del servidor: ${error}`};
            }


        }



    }

    //GET de un programa por id
    public async GETProgramaID(): Promise<ProgramaData | null> {

        try {

            if (!this._idPrograma) {
                
                throw new Error("No se envio ningun idPrograma");
            }

            const idPrograma = this._idPrograma;
            const [programa] = await conexion.query(`SELECT * FROM programa WHERE idprograma = ?`, [idPrograma]);

            if (programa.length > 0) {
                return programa[0] as ProgramaData;
            } else {
                return null;
            }

        } catch (error) {

            if (error instanceof z.ZodError) {
                return null;
            }
            else{
                return null;
            }


        }

    }

}



