import { Router } from "../Dependencies/dependencias.ts";
import { getFichas, postFicha, putFicha, deleteFicha, postFichaById, postFichasByPrograma } from '../Controllers/fichaController.ts';

const routerFicha = new Router();

routerFicha.get("/ficha", getFichas);
routerFicha.post("/ficha", postFicha);
routerFicha.put("/ficha", putFicha);
routerFicha.delete("/ficha", deleteFicha);
routerFicha.post("/ficha/id", postFichaById);
routerFicha.post("/ficha/programa", postFichasByPrograma);

export { routerFicha };