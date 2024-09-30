"use client";
/* eslint-disable */

import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
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

 

const Plan = ({ planId }: { planId: string }) => {
  // const { planId } = useParams();
  // //console.log(planId);
  const [plan, setPlan] = useState<PlanResponse | null>(null);
  const [modules, setModules] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [doneArray, setDoneArray] = useState<string[]>([]);
  const route = useRouter();

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
      const response = await axios.delete(
        `/api/deletePlanById?planId=${planId}`
      );
      toast({
        title: response.data.message,
        variant: "destructive",
      });
      route.back();
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
            {loading ? (
              <div className="text-center font-semibold text-2xl">
                Loading....
              </div>
            ) : (
              <ol className=" relative text-gray-500 border-s-4 border-gray-400  dark:border-gray-700 dark:text-gray-400">
                {modules.map((module: any, index: any) => (
                  <li key={module._id} className="mb-10 ms-6">
                    <span
                      className={`absolute  flex items-center justify-center w-8 h-8 ${
                        doneArray.includes(module._id)
                          ? "bg-green-200"
                          : "bg-gray-100"
                      } rounded-full -start-4 ring-4 ring-white dark:ring-gray-200`}
                    >
                      {doneArray.includes(module._id) ? (
                        <svg
                          className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </span>
                    <Box flexShrink="1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium leading-tight text-lg text-black">
                          {module.name}
                        </span>
                        <Popover>
                          <PopoverTrigger>
                            <Info className="min-w-4 min-h-4 text-black" />
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
                      <p className="text-sm">{module.desc}</p>

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
                          <Button>Mark as done</Button>
                        )}
                      </div>
                    </Box>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center my-2">
          <AlertDialog>
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
                <AlertDialogCancel className="dark:bg-white dark:text-black">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="dark:bg-red-600 dark:text-white"
                  onClick={() => deletePlan()}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
};

export default Plan;
