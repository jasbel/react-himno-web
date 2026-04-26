import { ID } from "@/types/types";
import { v4 } from "uuid";

export const uuid: () => ID = () => v4()