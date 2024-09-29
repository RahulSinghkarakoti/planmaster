import { Module } from "@/models/User.model";
import { Plan } from "@/models/User.model";

export interface ApiResponse {
    success: boolean;
    message: string;
    modules?: Array<Module>
    plans?: Array<Plan>
}

export interface PlanResponse {
    totalModules: number;
    completedModules: number;
    percentageCompleted: number;
    plan: Plan;   
    planTitle?:string
  }