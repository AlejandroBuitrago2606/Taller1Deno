import { Router } from "../Dependencies/dependencias.ts";
import { getInstructor,postInstructor, putInstructor,deleteInstructor} from "../Controllers/InstructorController.ts";


const routerInstructor = new Router();


routerInstructor.get("/instructores",getInstructor);
routerInstructor.post("/instructores",postInstructor);
routerInstructor.put("/instructores",putInstructor);
routerInstructor.put("/instructores",deleteInstructor);









export{routerInstructor};