import { store } from "@/store";
import { Archive } from "../models/archive";

export const getActalArchive = (): Archive => store.getState().archive.list 