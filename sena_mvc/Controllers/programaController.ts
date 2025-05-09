// deno-lint-ignore-file
import { Programa } from "../Models/ProgramaModels.ts";

export const getProgramas = async (ctx: any) => {

    const { response } = ctx;
    try {

        const objUsuario = new Programa();
        const listaProgramas = await objUsuario.GETProgramas();
        response.status = 200;
        response.body = {

            success: true,
            data: listaProgramas
        }



    } catch (error) {

        response.status = 400;
        response.body = {

            success: false,
            msg: "Error al procesar su solicitud",
            errors: error
        }

    }
}

export const postPrograma = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const ProgramaData = {

            idprograma: null,
            nombre_programa: body.nombre_programa
        };

        const objPrograma = new Programa(ProgramaData);
        const result = await objPrograma.POSTPrograma();
        response.status = 200;
        response.body = {

            success: true,
            body: result

        }


    } catch (error) {
        response.status = 400;
        response.body = {

            success: false,
            msg: `Error al procesar la solicitud. \n ${error}`

        }
        console.log(error);


    }

}

export const putPrograma = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const ProgramaData = {

            idprograma: null,
            nombre_programa: body.nombre_programa
        };
        const idPrograma = Number(body.idprograma);

        const objPrograma = new Programa(ProgramaData, idPrograma);
        const result = await objPrograma.PUTPrograma();
        response.status = 200;
        response.body = {

            success: true,
            body: result

        }


    } catch (error) {
        response.status = 400;
        response.body = {

            success: false,
            msg: `Error al procesar la solicitud. \n ${error}`

        }
        console.log(error);


    }

}

export const deletePrograma = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const idPrograma = Number(body.idprograma);

        const objPrograma = new Programa(null, idPrograma);
        const result = await objPrograma.DELETEPrograma();
        response.status = 200;
        response.body = {

            success: true,
            body: result

        }


    } catch (error) {
        response.status = 400;
        response.body = {

            success: false,
            msg: `Error al procesar la solicitud. \n ${error}`

        }
        console.log(error);


    }

}

export const postProgramaById = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const idPrograma = Number(body.idprograma);

        const objPrograma = new Programa(null, idPrograma);
        const result = await objPrograma.POSTProgramaID();
        response.status = 200;
        response.body = {

            success: result == null? false : true,
            body: result == null? "No se encontro el programa" : result

        }


    } catch (error) {
        response.status = 400;
        response.body = {

            success: false,
            msg: `Error al procesar la solicitud. \n ${error}`

        }
        console.log(error);


    }

}


