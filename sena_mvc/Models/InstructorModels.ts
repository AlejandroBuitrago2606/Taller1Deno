//deno-lint-ignore-file

import { conexion } from "./conexion.ts";
import{z} from "../Dependencies/dependencias.ts"

//Crear interfaz que es la estructura de la base de datos
interface InstructorData{

    idinstructor: number | null;
    nombre: string;
    apellido:string;
    email: string;
    telefono:string;


}

//Crear la clase Instructor
export class Instructor{
 public _objInstructor: InstructorData | null; 
 public _idInstructor:  number | null;

 constructor(objInstru:InstructorData|null = null,idInstructor:number | null = null){
        this._objInstructor = objInstru;
        this._idInstructor = idInstructor
 }

 public async SeleccionarInstructor(): Promise<InstructorData[]>{
    const {rows:intrus}
 }

}