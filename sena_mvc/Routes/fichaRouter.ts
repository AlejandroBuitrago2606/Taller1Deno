import { Router } from "../Dependencies/dependencias.ts";
import { getFichas, postFicha, putFicha, deleteFicha, getFichaById, getFichasByPrograma } from '../Controllers/fichaController.ts';

const routerFicha = new Router();

routerFicha.get("/ficha", getFichas);
routerFicha.post("/ficha", postFicha);
routerFicha.put("/ficha", putFicha);
routerFicha.delete("/ficha", deleteFicha);
routerFicha.get("/ficha/id", getFichaById);
routerFicha.get("/ficha/programa", getFichasByPrograma);

export { routerFicha };