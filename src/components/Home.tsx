"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { TypeAnimation } from "react-type-animation";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useSession } from "next-auth/react";
import { CustomErrorResponse } from "next-auth";

export default function Home() {
  const { data: session } = useSession();

  const [planIdea, setPlanIdea] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const route = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    //console.log(submitting);
    e.preventDefault();
    if (!session) {
      toast({
        title: "LogIn required",
        description: "Please login to start ",
        variant: "default",
      });
      return;
    }
    //console.log("Generating plan for:", planIdea);
    try {
      setSubmitting(true);
      const response = await axios.post("api/setPlan", { task: planIdea });
      console.log(response.data);

      toast({
        title: "planIdea",
        description: "Plan creation successfull",
        variant: "default",
      });
      route.replace(`/Plan/${response.data.newPlanId}`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<CustomErrorResponse>;
        if (axiosError.response && axiosError.response.data) {
          if (axiosError.response.data.message === "Invalid prompt") {
            toast({
              title: "Invalid Prompt",
              description: "Please enter proper prompt ",
              variant: "destructive",
            });
          }
        }
      } else {
        toast({
          title: "Error",
          description: "Error Creation Plan ",
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
    // Reset the input field
    setPlanIdea("");
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48   flex items-center justify-center h-screen  bg-black dark:bg-white   top-0 overflow-hidden">
      <div className="container px-4 md:px-6  sm:h-full relative z-10    ">
        <div className="flex flex-col items-center space-y-4 text-center ">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white dark:text-black">
              Turn Your Vision into{" "}
              <TypeAnimation
                sequence={["Reality", 1000, "Impact", 1000, "Result", 1000]}
                speed={10}
                repeat={Infinity}
              />
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 dark:text-gray-800 md:text-xl sm:text-2xl text-sm ">
              Let us turn your task list into a brilliant plan! Sit back, relax
              and let AI do the heavy lifting (because you know...it&apos;s
              smarter).{" "}
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                type="text"
                className="flex-1 bg-white/10 text-white placeholder-gray-300"
                placeholder="Enter your plan idea..."
                disabled={submitting}
                value={planIdea}
                onChange={(e) => {
                  setPlanIdea(e.target.value);
                }}
              />

              <Button
                disabled={submitting}
                type="submit"
                className="bg-white dark:bg-purple-600 text-purple-600 dark:text-white hover:bg-gray-100 "
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating
                  </>
                ) : (
                  <>
                    Generate
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-200 dark:text-gray-800">
            <Sparkles className="h-5 w-5" />
            <p className="text-sm">Powered by advanced AI technology</p>
          </div>
        </div>
      </div>

      <BackgroundBeams />
    </section>
  );
}
