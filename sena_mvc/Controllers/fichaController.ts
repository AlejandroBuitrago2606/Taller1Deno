// deno-lint-ignore-file
import { Ficha } from "../Models/FichaModels.ts";

export const getFichas = async (ctx: any) => {

    const { response } = ctx;
    try {

        const objFicha = new Ficha();
        const listaFichas = await objFicha.GETFichas();
        response.status = 200;
        response.body = {

            success: true,
            data: listaFichas
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

export const postFicha = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

       
        const FichaData = {
            idficha: null,
            codigo: body.codigo,
            fecha_inicio_lectiva: body.fecha_inicio_lectiva,
            fecha_fin_lectiva: body.fecha_fin_lectiva,
            fecha_fin_practica: body.fecha_fin_practica,
            programa_idprograma: body.programa_idprograma
        };



        const objFicha = new Ficha(FichaData);
        const result = await objFicha.POSTFicha();
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

export const putFicha = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

      
        
        const FichaData = {
            idficha: body.idficha,
            codigo: body.codigo,
            fecha_inicio_lectiva: body.fecha_inicio_lectiva,
            fecha_fin_lectiva: body.fecha_fin_lectiva,
            fecha_fin_practica: body.fecha_fin_practica,
            programa_idprograma: body.programa_idprograma
        };
        const idFicha = Number(body.idficha);

        const objFicha = new Ficha(FichaData, idFicha);
        const result = await objFicha.PUTFicha();
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

export const deleteFicha = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const idficha = Number(body.idficha);

        const objFicha = new Ficha(null, idficha);
        const result = await objFicha.DELETEFicha();
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

export const postFichaById = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const idficha = Number(body.idficha);

        const objFicha = new Ficha(null, idficha);
        const result = await objFicha.POSTFichaID();
        response.status = 200;
        response.body = {

            success: result == null ? false : true,
            body: result == null ? "No se encontro la ficha" : result

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

export const postFichasByPrograma = async (ctx: any) => {

    const { response, request } = ctx;

    try {

        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status = 400;
            response.body = { success: false, msg: "El cuerpo de la solicitud esta vacio." };
            return;
        }

        const body = await request.body.json();

        const idprograma = Number(body.idprograma);

        const objFicha = new Ficha(null, null, idprograma);
        const result = await objFicha.POSTFichasIdPrograma();

        response.status = 200;
        response.body = {

            success: result == null ? false : true,
            body: result == null ? "No se encontraron fichas asociadas a este programa." : result

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
