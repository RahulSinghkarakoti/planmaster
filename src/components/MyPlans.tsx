"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { PlanResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import NotFound from "@/components/NotFound"

export default function MyPlans() {
  const [plans, setPlans] = useState<PlanResponse[]>([]);
  const [ongoingPlans, setOngingPlans] = useState<PlanResponse[]>([]);
  const [completedPlans, setCompletedPlans] = useState<PlanResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
    //console.log("fetching plans");
    try {
      setLoading(true);
      const response = await axios.get("api/getPlans");
      // console.log(response.data.Plans.length);
      setPlans(response.data.Plans);
    } catch (error) {
      //console.log("error ocuur in fetchin plan", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    // console.log(plans)
    setCompletedPlans(plans.filter((p) => p.plan.isCompleted));
    setOngingPlans(plans.filter((p) => !p.plan.isCompleted));
    // console.log(typeof ongoingPlans[0]?.percentageCompleted)
  }, [plans]);

  

  return (
    <section className="w-full pt-16 md:pt-18 lg:pt-16 xl:pt-24 flex flex-col   gap-4  bg-black dark:bg-white   top-0 z-2 min-h-screen ">
      <div className="container px-4 md:px-6  ">
        <div className="flex flex-col items-center space-y-4 text-center  ">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white dark:text-black">
              Your Masterpieces!
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 dark:text-gray-800 md:text-xl text-clip">
              All your tasks, neatly organized. No judgment if the ‘To-Dos’
              become ‘To-Didn’ts.’ We believe in you!
            </p>
          </div>
        </div>
      </div>
      <div className=" px-6 sm:px-12 py-6  ">
        <div>
          {
           !loading && plans.length >0 ?

          <Tabs defaultValue="ongoing">
            <TabsList className="dark:text-black dark:bg-white dark:border-black border-2">
              <TabsTrigger value="ongoing">Onging</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="ongoing">
              {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4   ">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Card
                      className="w-full h-32 flex flex-col justify-between dark:bg-zinc-600  "

                      key={index}
                    >
                      <CardHeader>
                        <CardTitle className="text-3xl font-bold bg-zinc-400 w-2/3 h-5 rounded-full"></CardTitle>
                        <CardDescription className="text-3xl font-bold bg-zinc-400 w-1/3 h-3 rounded-full"></CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}

 

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
                {  ongoingPlans.map((p, index) => (
                  <Link href={`/Plan/${p.plan._id}`} key={index}>
                    <Card
                     className="w-full h-full flex flex-col justify-between dark:bg-white dark:shadow-xl "
                     >
                      <CardHeader>
                        <CardTitle className="text-3xl font-bold dark:text-black ">
                          {p.plan.title}
                        </CardTitle>
                        <CardDescription>
                        {"Id: "}

                          {p.plan._id}</CardDescription>
                        <CardDescription>
                          {p.percentageCompleted.toFixed(0)}
                          {"% completed"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="dark:text-black ">
                        <Progress value={p.percentageCompleted} />
                        {p.completedModules}
                        {"/"}
                        {p.totalModules}
                      </CardContent>
                    </Card>
                  </Link>
                ))
              }
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {completedPlans.map((p, index) => (
                  <Link href={`/Plan/${p.plan._id}`} key={index}>
                    <Card
                      className="w-full h-full flex flex-col justify-between dark:bg-white dark:shadow-xl relative"
                      key={index}
                    >
                      <CardHeader>
                        <Badge
                          variant="outline"
                          className="absolute top-2 right-2 bg-green-400 dark:text-black   "
                        >
                          Completed
                        </Badge>
                        <CardTitle className="text-3xl font-bold dark:text-black ">
                          { p.plan.title}
                        </CardTitle>
                        <CardDescription>
                        {"Id: "}

                          {p.plan._id}</CardDescription>
                        <CardDescription>
                          {p.percentageCompleted.toFixed(0)}
                          
                          {"% completed"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="dark:text-black">
                        <Progress   value={p.percentageCompleted} />
                        {p.completedModules}
                        {"/"}
                        {p.totalModules}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>{" "}
            </TabsContent>
          </Tabs>
            :
            <div>
              <NotFound/>
            </div>
          }
        </div>
      </div>
    </section>
  );
}

 
