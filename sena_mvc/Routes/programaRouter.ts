import { Router } from "../Dependencies/dependencias.ts";
import { getProgramas, postPrograma, putPrograma, deletePrograma, getProgramaById } from "../Controllers/programaController.ts";

const routerPrograma = new Router();

routerPrograma.get("/programa", getProgramas);
routerPrograma.post("/programa", postPrograma);
routerPrograma.put("/programa", putPrograma);
routerPrograma.delete("/programa", deletePrograma);
routerPrograma.get("/programa/id", getProgramaById);

export { routerPrograma };