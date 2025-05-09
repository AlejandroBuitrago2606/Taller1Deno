import { Router } from "../Dependencies/dependencias.ts";
import { getFichasAprendices, postFichaAprendiz, putFichaAprendiz, deleteFichaAprendiz, postFichaAprendizID } from "../Controllers/fichaAprendizController.ts";

const routerFichaAprendiz = new Router();

routerFichaAprendiz.get("/fichaAprendiz", getFichasAprendices);
routerFichaAprendiz.post("/fichaAprendiz", postFichaAprendiz);
routerFichaAprendiz.put("/fichaAprendiz", putFichaAprendiz);
routerFichaAprendiz.delete("/fichaAprendiz", deleteFichaAprendiz);
routerFichaAprendiz.post("/fichaAprendiz/id", postFichaAprendizID);

export { routerFichaAprendiz };
