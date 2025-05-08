import { Router } from "../Dependencies/dependencias.ts";
import { getFichasAprendices, postFichaAprendiz, putFichaAprendiz, deleteFichaAprendiz, getFichaAprendizID } from "../Controllers/fichaAprendizController.ts";

const routerFichaAprendiz = new Router();

routerFichaAprendiz.get("/fichaAprendiz", getFichasAprendices);
routerFichaAprendiz.post("/fichaAprendiz", postFichaAprendiz);
routerFichaAprendiz.put("/fichaAprendiz", putFichaAprendiz);
routerFichaAprendiz.delete("/fichaAprendiz", deleteFichaAprendiz);
routerFichaAprendiz.get("/fichaAprendiz/id", getFichaAprendizID);

export { routerFichaAprendiz };
