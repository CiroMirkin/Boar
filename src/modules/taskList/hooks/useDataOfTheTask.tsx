import { TaskContext } from "@/sharedByModules/components/BlankTask";
import { useContext } from "react";

/** Devuelve toda la información de una tarea. */
export const useDataOfTheTask = () => useContext(TaskContext)