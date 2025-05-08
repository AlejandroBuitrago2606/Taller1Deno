
import { conexion } from "./conexion.ts";
import { z } from "../Dependencies/dependencias.ts";

interface FichaData {
    idficha: number | null;
    codigo: string;
    fecha_inicio_lectiva: string;
    fecha_fin_lectiva: string;
    fecha_fin_practica: string;
    programa_idprograma: number;
  }

export class Ficha {
    public _objFicha: FichaData | null;
    public _idFicha: number | null;

    constructor(objFicha: FichaData | null = null, idFicha: number | null = null) {
        this._objFicha = objFicha;
        this._idFicha = idFicha;
    }

    //GET de ficha
    public async GETFichas(): Promise<FichaData[]> {
        const { rows: fichas } = await conexion.execute("SELECT * FROM ficha");
        return fichas as FichaData[];
    }

    //POST de ficha
    public async POSTFicha(): Promise<{ success: boolean; message: string; aprendiz?: Record<string, unknown> }> {
        try {
            if (!this._objFicha) {
                throw new Error("No se ha proporcionado un objeto ficha válido.");
            }

            const { codigo, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_fin_practica, programa_idprograma } = this._objFicha;
            if (!codigo || !fecha_inicio_lectiva || !fecha_fin_lectiva || !fecha_fin_practica || !programa_idprograma) {
                throw new Error("Faltan campos requeridos para insertar el aprendiz.");
            }

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(`INSERT INTO ficha(codigo, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_fin_practica, programa_idprograma) VALUES(?, ?, ?, ?, ?)`, [
                codigo,
                fecha_inicio_lectiva,
                fecha_fin_lectiva,
                fecha_fin_practica,
                programa_idprograma
            ]);

            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {
                const [aprendiz] = await conexion.query(`SELECT * FROM ficha WHERE idficha = LAST_INSERT_ID()`);
                await conexion.execute("COMMIT");

                return { success: true, message: "Ficha Registrada Correctamente.", aprendiz: aprendiz };
            } else {
                throw new Error("Error al registrar la ficha.");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return { success: false, message: error.message }


            }
            else {
                return { success: false, message: "Error interno del servidor" };
            }
        }
    }

    //PUT de ficha
    public async PUTFicha(): Promise<{ success: boolean; message: string; ficha?: Record<string, unknown> }> {

        try {

            //Validar que el obj de aprendiz no sea null y los campos requeridos esten definidos.
            if (!this._objFicha) {

                throw new Error("No se ha proporcionado un objeto de ficha válido.");
            }

            const { codigo, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_fin_practica, programa_idprograma } = this._objFicha;

            if (!codigo || !fecha_inicio_lectiva || !fecha_fin_lectiva || !fecha_fin_practica || !programa_idprograma) {

                throw new Error("Faltan campos requeridos para actualizar la ficha.");
            }

            if (!this._idFicha) {

                throw new Error("No se envio ningun idFicha");
            }
            const idFicha = this._idFicha;

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(`UPDATE ficha SET codigo=?, fecha_inicio_lectiva=?, fecha_fin_lectiva=?, fecha_fin_practica=?, programa_idprograma=? WHERE idficha=?`, [

                codigo,
                fecha_inicio_lectiva,
                fecha_fin_lectiva,
                fecha_fin_practica,
                programa_idprograma,
                idFicha
            ]);

            console.log("Se ejecuto la consulta");


            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {

                console.log("La actualizacion fue exitosa");

                const [ficha] = await conexion.query(`SELECT * FROM ficha WHERE idficha = ?`, [idFicha]);
                await conexion.execute("COMMIT");
                console.log("Obteniendo la ficha actualizada" + ficha);

                return { success: true, message: "Ficha Actualizada Correctamente.", ficha: ficha };

            }
            else {
                throw new Error("No fue posible actualizar la ficha.");
            }


        } catch (error) {

            if (error instanceof z.ZodError) {
                return { success: false, message: error.message }
            }
            else {
                return { success: false, message: `Error interno del servidor: ${error}` };
            }


        }




    }

    //DELETE de ficha
    public async DELETEFicha(): Promise<{ success: boolean; message: string; }> {

        try {

            
            if (!this._idFicha) {

                throw new Error("No se envio ningun idFicha");
            }
            const idFicha = this._idFicha;

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(`DELETE FROM ficha WHERE idficha=?`, [idFicha]);

            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {

                console.log("La eliminacion fue exitosa");

                return { success: true, message: `Ficha Eliminada Correctamente. IdFicha= ${idFicha}` };

            } else {
                throw new Error("No fue posible eliminar la ficha.");
            }


        } catch (error) {

            if (error instanceof z.ZodError) {
                return { success: false, message: error.message }
            }
            else {
                return { success: false, message: `Error interno del servidor: ${error}` };
            }


        }



    }

    //GET de ficha por id
    public async GETFichaID(): Promise<FichaData | null> {
    
            try {
    
                if (!this._idFicha) {
    
                    throw new Error("No se envio ningun idFicha");
                }
    
                const idFicha = this._idFicha;
                const [ficha] = await conexion.query(`SELECT * FROM ficha WHERE idficha = ?`, [idFicha]);
    
                if (ficha.length > 0) {
                    return ficha[0] as FichaData;
                } else {
                    return null;
                }
    
            } catch (error) {
    
                if (error instanceof z.ZodError) {
                    return null;
                }
                else {
                    return null;
                }
    
    
            }
    
        }
        

}