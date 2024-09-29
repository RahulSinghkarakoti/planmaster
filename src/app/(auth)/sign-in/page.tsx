"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { SignInSchema } from "@/schemas/SignInSchema";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const route = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    // <z.infer<typeof signUpSchema>> is optional to have
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    //console.log(data);
    try {
      setIsSubmitting(true);
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });
      //console.log(result);
      if (result?.error) {
        toast({
          title: "Login Failed",
          description: result?.error,
          variant: "destructive",
        });
      }
      if (result?.url) {
        //console.log("loged in ");
        toast({
          title: "Login Successfull",
          // description: ,
          // variant: "destructive",
        });
        route.replace("/");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: "email or password is incorrect",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex  justify-center items-center  ">
      <div className="w-full max-w-md p-4   space-y-2  rounded-xl shadow-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Welcome Back, Planner!
            </CardTitle>
            <CardDescription>
              Log in to pick up where you left off.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-2 text-lg outline-none"
              >
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="abc@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CardDescription>
                  create account?{" "}
                  <Link href="/sign-up" className="text-blue-800 font-semibold">
                    Sign-Up
                  </Link>
                </CardDescription>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      Please wait...
                      <LoaderCircle className="animate-spin " />
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
                <div className="flex justify-center items-center gap-3 px-4">
                  <Separator className="bg-zinc-500 h-1 rounded-full w-1/2" />
                  <p>or</p>
                  <Separator className="bg-zinc-500 h-1 rounded-full w-1/2" />
                </div>
              </form>
            </Form>
                <Button
                  onClick={() => signIn("google")}
                  className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                  variant="outline"
                >
                  <svg
                    className="mr-2 -ml-1 w-4 h-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Sign in with Google<div></div>
                </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
