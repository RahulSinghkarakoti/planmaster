"use client";
/* eslint-disable */

import React, { useEffect, useState } from "react";
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import axios from "axios";
import { PlanResponse } from "@/types/ApiResponse";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { CircleCheckBig, Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface PlanProps {
  planId: string;
}
 

const Plan = ({ planId }:{planId:string}) => {

  // const { planId } = useParams();
  // //console.log(planId);
  const [plan, setPlan] = useState<PlanResponse | null>(null);
  const [modules, setModules] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [doneArray, setDoneArray] = useState<string[]>([]);
  const route=useRouter()

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/getPlanById?PlanId=${planId}`);

        setModules(response.data.plan[0].modules);
        setDoneArray(
          response.data.plan[0].modules.map((obj: any) => {
            if (obj.isCompleted) return obj._id;
          })
        );
        setPlan(response.data.plan[0]);
      } catch (error) {
        //console.log("error fetching plan", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, []);

  const { activeStep } = useSteps({
    index: 2,
    count: modules.length,
  });

  async function toggleModule(id: string): Promise<any> {
    //console.log(modules);
    try {
      const response = await axios.post(
        `/api/toggleModuleCompletionById?planId=${planId}&moduleId=${id}`
      );
      if (response) {
        toast({
          title: "Toggle successfull",
          description: "module is toggled successfully",
          variant: "default",
        });

        if (!doneArray.includes(id)) setDoneArray([...doneArray, id]);
        else {
          setDoneArray(doneArray.filter((item: any) => item !== id));
        }
      }
    } catch (error) {
      //console.log("error toggling module", error);
      toast({
        title: "Toggle Failed",
        description: "An error occur during toggling",
        variant: "destructive",
      });
    }
  }

  async function deletePlan(): Promise<any> {
    try {
      //console.log("in deltion")
      const response = await axios.delete(`/api/deletePlanById?planId=${planId}`);
      toast({
        title: response.data.message, 
        variant: "destructive",
      });
       route.back()
    } catch (error) {
      //console.log("error deleting plan", error);
      toast({
        title: "Delete Failed",
        description: "An error occur during deleting",
        variant: "destructive",
      });
    }
  }

  return (
    <section className="w-full pt-16 md:pt-12 lg:pt-16 xl:pt-24  flex flex-col items-center  bg-black dark:bg-white relative top-0 z-2 ">
      <div className="container px-4 md:px-6 sm:px-3    ">
        <div className="flex flex-col items-center space-y-4 text-center ">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white dark:text-black">
              {plan && <div>{plan.planTitle}</div>}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 dark:text-gray-800 md:text-xl">
              Here’s the blueprint to success. Just follow the steps, no
              assembly required.
            </p>
          </div>
        </div>
        <div className="w-full px-4 py-4 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-200 w-full sm:w-2/3 md:w-3/4 p-4 rounded-xl">
          {
            loading ? "loading...."
          :
            <Stepper index={activeStep} orientation="vertical">
              {modules.map((module: any, index: any) => (
                <Step key={index}>
                  <StepIndicator className="border-2 dark:border-zinc-700">
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                      
                    />
                  </StepIndicator>

                  <Box flexShrink="1">
                    <StepTitle className="text-2xl  ">
                      <div className=" flex items-center space-x-2 ">
                        <span className="">{module.name}</span>
                        <Popover>
                          <PopoverTrigger>
                            <Info className="min-w-4 min-h-4 " />
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Additional Info.</PopoverHeader>
                            <PopoverBody className="text-sm font-normal">
                              {module.add_info}
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </StepTitle>
                    <StepDescription className="text-lg">
                      {module.desc}
                    </StepDescription>

                    <div
                      onClick={() => toggleModule(module._id)}
                      className="m-2"
                    >
                      {doneArray.includes(module._id) ? (
                        <Button className="flex justify-between items-center bg-zinc-600 dark:bg-zinc-700 dark:text-white">
                          <p>Done</p>
                          <CircleCheckBig size={20} />
                        </Button>
                      ) : (
                        <Button className="">Mark as done</Button>
                      )}
                    </div>
                  </Box>

                  <StepSeparator  className=" dark:bg-zinc-700"/>
                </Step>
              ))}
            </Stepper>
          }
          </div>
        </div>

        <div className="flex items-center justify-center my-2">
          <AlertDialog >
            <AlertDialogTrigger asChild>
          <Button variant={"destructive"}>Delete Plan</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Plan Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your plan .
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="dark:bg-white dark:text-black">Cancel</AlertDialogCancel>
                <AlertDialogAction className="dark:bg-red-600 dark:text-white" onClick={()=>deletePlan()}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
}

export default Plan;