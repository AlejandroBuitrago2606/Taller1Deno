import { Application, oakCors } from "./Dependencies/dependencias.ts";
import { routerInstructor } from "./Routes/instructorRouter.ts";
import { routerProfesion } from "./Routes/profesionRouter.ts";
import { routerInstructorProfesion } from "./Routes/InstructorProfesionRouter.ts";
import { routerFicha } from "./Routes/fichaRouter.ts";
import { routerAprendiz } from "./Routes/aprendizRouter.ts";
import { routerFichaAprendiz } from "./Routes/fichaAprendizRouter.ts";
import { routerPrograma } from "./Routes/programaRouter.ts";


const app = new Application();

app.use(oakCors());

const routers = [routerInstructor, routerProfesion, routerInstructorProfesion, routerFichaAprendiz, routerPrograma, routerFicha, routerAprendiz];


routers.forEach((router) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
});

// app.use(routerInstructor.routes());
// app.use(routerInstructor.allowedMethods());


// app.use(routerProfesion.routes());
// app.use(routerProfesion.allowedMethods());

console.log("Servidor corriendo en el puerto 8000");

app.listen({ port: 8000 });