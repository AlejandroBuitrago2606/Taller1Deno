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

}




