import { Router } from "../Dependencies/dependencias.ts";
import { getInstructorProfesion,postInstructorProfesion, putInstructorProfesion,deleteInstructorProfesion} from "../Controllers/InstructorProfesionController.ts.ts";


const routerInstructorProfesion = new Router();


routerInstructorProfesion.get("/instructoresprofesiones",getInstructorProfesion);
routerInstructorProfesion.post("/instructoresprofesiones",postInstructorProfesion);
routerInstructorProfesion.put("/instructoresprofesiones",putInstructorProfesion);
routerInstructorProfesion.delete("/instructoresprofesiones",deleteInstructorProfesion);









export{routerInstructorProfesion};