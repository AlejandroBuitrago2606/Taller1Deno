import { Router } from "../Dependencies/dependencias.ts";
import { getAprendices, postAprendiz, actualizarAprendiz, deleteAprendiz, getAprendizById } from "../Controllers/aprendizController.ts";

const routerAprendiz = new Router();

routerAprendiz.get("/aprendiz", getAprendices);
routerAprendiz.post("/aprendiz", postAprendiz);
routerAprendiz.put("/aprendiz", actualizarAprendiz);
routerAprendiz.delete("/aprendiz", deleteAprendiz);
routerAprendiz.get("/aprendiz/id", getAprendizById);

export { routerAprendiz };