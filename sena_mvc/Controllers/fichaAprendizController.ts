// deno-lint-ignore-file
import { FichaAprendiz } from "../Models/fichaAprendizModels.ts";


export const getFichasAprendices = async (ctx: any) => {

    const { response } = ctx;
    try {

        const objFichaAprendiz = new FichaAprendiz();
        const listaFichasAprendiz = await objFichaAprendiz.GETFichasAprendices();
        response.status = 200;
        response.body = {

            success: true,
            data: listaFichasAprendiz
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

export const postFichaAprendiz = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        
        const FichaAprendizData = {

            ficha_idficha: Number(body.ficha_idficha),
            aprendiz_idaprendiz: Number(body.aprendiz_idaprendiz),
            instructor_idinstructor: Number(body.instructor_idinstructor)
        };
        

        const objFichaAprendiz = new FichaAprendiz(FichaAprendizData);
        const result = await objFichaAprendiz.POSTFichaAprendiz();
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

export const putFichaAprendiz = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const FichaAprendizData = {

            ficha_idficha: body.ficha_idficha,
            aprendiz_idaprendiz: body.aprendiz_idaprendiz,
            instructor_idinstructor: body.instructor_idinstructor
        };

        const objFichaAprendiz = new FichaAprendiz(FichaAprendizData);
        const result = await objFichaAprendiz.PUTFichaAprendiz();

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

export const deleteFichaAprendiz = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const FichaAprendizData = {

            ficha_idficha: body.ficha_idficha,
            aprendiz_idaprendiz: body.aprendiz_idaprendiz,
            instructor_idinstructor: body.instructor_idinstructor
        };


        const objFichaAprendiz = new FichaAprendiz(FichaAprendizData);
        const result = await objFichaAprendiz.DELETEFichaAprendiz();
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

export const postFichaAprendizID = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const FichaAprendizData = {

            ficha_idficha: body.ficha_idficha,
            aprendiz_idaprendiz: body.aprendiz_idaprendiz,
            instructor_idinstructor: body.instructor_idinstructor
        };


        const objFichaAprendiz = new FichaAprendiz(FichaAprendizData);
        const result = await objFichaAprendiz.POSTFichaAprendizById();

        response.status = 200;
        response.body = {

            success: result == null ? false : true,
            body: result == null ? "No se encontro ninguna fichaAprendiz" : result

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


