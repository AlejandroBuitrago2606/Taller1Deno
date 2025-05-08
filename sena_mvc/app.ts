import { Application, oakCors } from "./Dependencies/dependencias.ts";
import { routerInstructor } from "./Routes/instructorRouter.ts";
import { routerProfesion } from "./Routes/profesionRouter.ts";


const app = new Application();

app.use(oakCors());

const routers = [routerInstructor,routerProfesion]


routers.forEach((router)=>{
    app.use(router.routes());
    app.use(router.allowedMethods());
});

    app.use(routerInstructor.routes());
    app.use(routerInstructor.allowedMethods());


    app.use(routerProfesion.routes());
    app.use(routerProfesion.allowedMethods());

    console.log("serividor corriendo en el puerto 8000");

    app.listen({port:8000});