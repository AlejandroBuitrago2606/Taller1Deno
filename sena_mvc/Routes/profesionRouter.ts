import { Router } from "../Dependencies/dependencias.ts";
import { getProfesion,postProfesion,putProfesion,deleteProfesion } from "../Controllers/ProfesionController.ts";

const routerProfesion = new Router();


routerProfesion.get("/profesiones",getProfesion);
routerProfesion.post("/profesiones",postProfesion);
routerProfesion.put("/profesiones",putProfesion);
routerProfesion.delete("/profesiones",deleteProfesion);

export{routerProfesion};