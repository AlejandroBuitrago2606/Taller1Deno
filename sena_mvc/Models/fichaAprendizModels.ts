import { conexion } from "./conexion.ts";
import { z } from "../Dependencies/dependencias.ts";

interface FichaAprendizData {
    ficha_idficha: number;
    aprendiz_idaprendiz: number;
    instructor_idinstructor: number;
}


export class FichaAprendiz {

    public _objFichaAprendiz: FichaAprendizData | null;


    constructor(objFichaAprendiz: FichaAprendizData | null = null) {
        this._objFichaAprendiz = objFichaAprendiz;
    }

    //GET de fichaAprendiz
    public async GETFichasAprendices(): Promise<FichaAprendizData[]> {
        const { rows: fichasAprendices } = await conexion.execute("SELECT * FROM ficha_has_aprendiz");
        return fichasAprendices as FichaAprendizData[];
    }

    //POST de fichaAprendiz
    public async POSTFichaAprendiz(): Promise<{ success: boolean; message: string; fichaAprendiz?: Record<string, unknown> }> {
        try {
            if (!this._objFichaAprendiz) {
                throw new Error("No se ha proporcionado un objeto fichaAprendiz válido.");
            }

            const { ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor } = this._objFichaAprendiz;
            if (!ficha_idficha || !aprendiz_idaprendiz || !instructor_idinstructor) {
                throw new Error("Faltan campos requeridos para insertar la fichaAprendiz.");
            }

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(`INSERT INTO ficha_has_aprendiz( ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor ) VALUES(?, ?, ?)`, [

                ficha_idficha,
                aprendiz_idaprendiz,
                instructor_idinstructor

            ]);

            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {
                const [fichaAprendiz] = await conexion.query(`SELECT * FROM ficha_has_aprendiz WHERE ficha_idficha=? AND aprendiz_idaprendiz=? AND instructor_idinstructor = ?;`, [ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor]);
                await conexion.execute("COMMIT");

                return { success: true, message: "FichaAprendiz Registrada Correctamente.", fichaAprendiz: fichaAprendiz };
            } else {
                throw new Error("Error al registrar la fichaAprendiz.");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return { success: false, message: `Error: ${error.message}` }
            }
            else {
                return { success: false, message: "Error interno del servidor" };
            }
        }
    }

    //PUT de fichaAprendiz
    public async PUTFichaAprendiz(): Promise<{ success: boolean; message: string; fichaAprendiz?: Record<string, unknown> }> {

        try {

            //Validar que el obj de aprendiz no sea null y los campos requeridos esten definidos.
            if (!this._objFichaAprendiz) {

                throw new Error("No se ha proporcionado un objeto fichaAprendiz válido.");
            }

            const { ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor } = this._objFichaAprendiz;
            if (!ficha_idficha || !aprendiz_idaprendiz || !instructor_idinstructor) {
                throw new Error("Faltan campos requeridos para actualizar la fichaAprendiz.");
            }


            await conexion.execute("START TRANSACTION");


            const result = await conexion.execute(`UPDATE ficha_has_aprendiz SET ficha_idficha = ?, aprendiz_idaprendiz = ?, instructor_idinstructor = ? WHERE ficha_idficha = ?`, [
                ficha_idficha,
                aprendiz_idaprendiz,
                instructor_idinstructor,
                ficha_idficha
            ]);

            console.log("Se ejecuto la consulta");


            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {

                console.log("La actualizacion fue exitosa");

                const [fichaAprendiz] = await conexion.query(`SELECT * FROM ficha_has_aprendiz WHERE ficha_idficha = ? AND aprendiz_idaprendiz = ? AND instructor_idinstructor = ?`, [ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor]);
                await conexion.execute("COMMIT");
                console.log("Obteniendo la fichaAprendiz actualizada" + fichaAprendiz);

                return { success: true, message: "FichaAprendiz Actualizada Correctamente.", fichaAprendiz: fichaAprendiz };

            }
            else {
                throw new Error("No fue posible actualizar la fichaAprendiz.");
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

    //DELETE de fichaAprendiz
    public async DELETEFichaAprendiz(): Promise<{ success: boolean; message: string; }> {

        try {


            if (!this._objFichaAprendiz) {

                throw new Error("No se envio ningun FichaAprendiz");
            }
            const { ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor } = this._objFichaAprendiz;

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(`DELETE FROM ficha_has_aprendiz WHERE ficha_idficha = ? AND aprendiz_idaprendiz = ? AND instructor_idinstructor = ?`, [ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor]);

            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {

                console.log("La eliminacion fue exitosa");

                return { success: true, message: `FichaAprendiz Eliminada Correctamente.` };

            } else {
                throw new Error("No fue posible eliminar la FichaAprendiz.");
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

    public async GETFichaAprendizById(): Promise<FichaAprendizData | null> {
        try {
            if (!this._objFichaAprendiz) {
                throw new Error("No se ha proporcionado un objeto fichaAprendiz válido.");
            }

            const { ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor } = this._objFichaAprendiz;
            if (!ficha_idficha || !aprendiz_idaprendiz || !instructor_idinstructor) {
                throw new Error("Faltan campos requeridos para obtener la fichaAprendiz.");
            }

            const [fichaAprendiz] = await conexion.query(`SELECT * FROM ficha_has_aprendiz WHERE ficha_idficha = ? AND aprendiz_idaprendiz = ? AND instructor_idinstructor = ?`, [ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor]);

            return fichaAprendiz as FichaAprendizData | null;
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(`Error: ${error.message}`);
                return null;
            } else {
                console.error(`Error interno del servidor: ${error}`);
                return null;
            }
        }
    }

}