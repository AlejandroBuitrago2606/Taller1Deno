// deno-lint-ignore-file
import { Aprendiz } from "../Models/AprendizModels.ts";


export const getAprendices = async (ctx: any) => {

    const { response } = ctx;
    try {

        const objAprendiz = new Aprendiz();
        const listaAprendices = await objAprendiz.GETAprendices();
        response.status = 200;
        response.body = {

            success: true,
            data: listaAprendices
        };
        console.log("Aprendices obtenidos correctamente." + listaAprendices);
        



    } catch (error) {

        response.status = 400;
        response.body = {

            success: false,
            msg: "Error al procesar su solicitud",
            errors: error
        }

    }
}

export const postAprendiz = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const AprendizData = {

            idaprendiz: null,
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            telefono: body.telefono
        };

        const objAprendiz = new Aprendiz(AprendizData);
        const result = await objAprendiz.POSTAprendiz();
        response.status = 200;
        response.body = {

            success: true,
            body: result

        };

        console.log("Aprendiz creado correctamente." + result);

    } catch (error) {
        response.status = 400;
        response.body = {

            success: false,
            msg: `Error al procesar la solicitud. \n ${error}`

        }
        console.log(error);


    }

}

export const actualizarAprendiz = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const AprendizData = {

            idaprendiz: body.idaprendiz,
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            telefono: body.telefono
        };

        const idAprendiz = Number(body.idaprendiz);

        const objAprendiz = new Aprendiz(AprendizData, idAprendiz);
        const result = await objAprendiz.ActualizarAprendiz();
        response.status = 200;
        response.body = {

            success: true,
            body: result

        };


    } catch (error) {
        response.status = 400;
        response.body = {

            success: false,
            msg: `Error al procesar la solicitud. \n ${error}`

        }
        console.log(error);


    }

}

export const deleteAprendiz = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const idAprendiz = Number(body.idaprendiz);

        const objAprendiz = new Aprendiz(null, idAprendiz);
        const result = await objAprendiz.DELETEAprendiz();
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

export const postAprendizById = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }
        console.log("Todo va bien 1");

        const body = await request.body.json();

        console.log("Todo va bien 2");
        const idAprendiz = Number(body.idaprendiz);

        console.log("Todo va bien: " + idAprendiz);
        
        const objAprendiz = new Aprendiz(null, idAprendiz);
        const result = await objAprendiz.POSTAprendizID();
        console.log("Todo va bien, el resultado es: " + result);
        response.status = 200;
        response.body = {

            success: result == null ? false : true,
            body: result == null ? "No se encontro el aprendiz" : result

        };


    } catch (error) {
        response.status = 400;
        response.body = {

            success: false,
            msg: `Error al procesar la solicitud. \n ${error}`

        }
        console.log(error);


    }

}
