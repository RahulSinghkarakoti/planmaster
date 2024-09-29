"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    //console.log("Form submitted:", { name, email, message });
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    });
    // Reset form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-black dark:bg-white">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h1  className="text-4xl font-bold text-center mt-4 mb-8 text-white  dark:text-black">
              Contact Us
            </h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <p className="text-gray-600 mb-6 text-center">
              Have questions or feedback? We&apos;d love to hear from you. Fill out
              the form below and we&apos;ll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-zinc-400 mb-4">
            Other Ways to Reach Us
          </h2>
          <p className="text-gray-400">
            Email: support@aiplangenerate.com
            <br />
            Phone: +1 (555) 123-4567
            <br />
            Address: 123 AI Street, Tech City, TC 12345
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
