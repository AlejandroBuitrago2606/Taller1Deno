import { conexion } from "./conexion.ts";
import { z } from "../Dependencies/dependencias.ts";

interface AprendizData {
    idaprendiz: number | null;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
}


export class Aprendiz {
    public _objAprendiz: AprendizData | null;
    public _idAprendiz: number | null;

    constructor(objAprendiz: AprendizData | null = null, idAprendiz: number | null = null) {
        this._objAprendiz = objAprendiz;
        this._idAprendiz = idAprendiz;
    }

    //GET de aprendiz
    public async GETAprendices(): Promise<AprendizData[]> {
        const { rows: aprendices } = await conexion.execute("SELECT * FROM aprendiz");
        return aprendices as AprendizData[];
    }

    //POST de aprendiz
    public async POSTAprendiz(): Promise<{ success: boolean; message: string; aprendiz?: Record<string, unknown> }> {
        try {
            if (!this._objAprendiz) {
                throw new Error("No se ha proporcionado un objeto aprendiz válido.");
            }

            const { nombre, apellido, email, telefono } = this._objAprendiz;
            if (!nombre || !apellido || !email || !telefono) {
                throw new Error("Faltan campos requeridos para insertar el aprendiz.");
            }

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(`INSERT INTO aprendiz(nombre, apellido, email, telefono) VALUES(?, ?, ?, ?)`, [
                nombre,
                apellido,
                email,
                telefono
            ]);

            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {
                const [aprendiz] = await conexion.query(`SELECT * FROM aprendiz WHERE idaprendiz = LAST_INSERT_ID()`);
                await conexion.execute("COMMIT");

                return { success: true, message: "Aprendiz Registrado Correctamente.", aprendiz: aprendiz };
            } else {
                throw new Error("Error al registrar el aprendiz.");
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

    //PUT de aprendiz
    public async ActualizarAprendiz(): Promise<{ success: boolean; message: string; aprendiz?: Record<string, unknown> }> {

        try {

            //Validar que el obj de aprendiz no sea null y los campos requeridos esten definidos.
            if (!this._objAprendiz) {

                throw new Error("No se ha proporcionado un objeto de aprendiz válido.");
            }

            const { nombre, apellido, email } = this._objAprendiz;

            if (!nombre || !apellido || !email) {

                throw new Error("Faltan campos requeridos para actualizar el aprendiz.");
            }


            if (!this._idAprendiz) {

                throw new Error("No se envio ningun idAprendiz");
            }
            const idAprendiz = this._idAprendiz;

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(`UPDATE aprendiz SET nombre=?,apellido=?,email=? WHERE idaprendiz=?`, [

                nombre,
                apellido,
                email,
                idAprendiz
            ]);

            console.log("Se ejecuto la consulta");


            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {

                console.log("La actualizacion fue exitosa");

                const [aprendiz] = await conexion.query(`SELECT * FROM aprendiz WHERE idaprendiz = ?`, [idAprendiz]);
                await conexion.execute("COMMIT");
                console.log("Obteniendo el aprendiz actualizado" + aprendiz);

                return { success: true, message: "Aprendiz Actualizado Correctamente.", aprendiz: aprendiz };

            }
            else {
                throw new Error("No fue posible actualizar el aprendiz.");
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

    //DELETE de aprendiz
    public async DELETEAprendiz(): Promise<{ success: boolean; message: string; }> {

        try {

            const idAprendiz = this._idAprendiz;
            if (!this._idAprendiz) {

                throw new Error("No se envio ningun idAprendiz");
            }

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(`DELETE FROM aprendiz WHERE idaprendiz=?`, [idAprendiz]);

            if (result && typeof result.affectedRows === "number" && result.affectedRows > 0) {

                console.log("La eliminacion fue exitosa");

                return { success: true, message: `Aprendiz Eliminado Correctamente. IdAprendiz= ${idAprendiz}` };

            } else {
                throw new Error("No fue posible eliminar el aprendiz.");
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

    //GET de un aprendiz por id
    public async GETAprendizID(): Promise<AprendizData | null> {

        try {

            if (!this._idAprendiz) {

                throw new Error("No se envio ningun idAprendiz");
            }

            const idAprendiz = this._idAprendiz;
            const [aprendiz] = await conexion.query(`SELECT * FROM aprendiz WHERE idaprendiz = ?`, [idAprendiz]);

            if (aprendiz.length > 0) {
                return aprendiz[0] as AprendizData;
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




