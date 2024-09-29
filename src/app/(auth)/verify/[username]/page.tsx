"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import { verifySchema } from "@/schemas/VerifySchema";
import { LoaderCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const route = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    //console.log(data);
    setIsSubmitting(true);
    // API call to verify OTP
    try {
      const response = await axios.post("/api/verifyCode", {
        username: params.username,
        code: data.code,
      });
      //console.log(response);
      toast({
        description: response?.data.message,
        title: "success",
      });
      route.replace("/sign-in");
    } catch (error) {
      //console.log("error occur in verifying ");
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Sign-Up failed",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-900  min-h-screen flex justify-center  items-center">
      <div className="w-full max-w-md p-4   space-y-2  rounded-xl shadow-md">
        
        <Card>
         <CardHeader>
           <CardTitle className="text-3xl font-bold">
           Verify your account
 
           </CardTitle>
           {/* <CardDescription>Sign up now! Your future self will thank you  . </CardDescription> */}
         </CardHeader>
         <CardContent>
         <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-black"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the code sent to your mail.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  Please wait...
                  <LoaderCircle className="animate-spin " />
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
         </CardContent> 
       </Card>
      
      </div>
    </div>
  );
};

export default Page;
