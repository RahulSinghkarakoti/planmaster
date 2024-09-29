"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Lightbulb, Cpu, FileText, Rocket } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: <Lightbulb className="h-12 w-12 text-purple-600" />,
      title: "1. Share Your Idea",
      description: "Start by telling us about your project or goal. The more details you provide, the better we can assist you."
    },
    {
      icon: <Cpu className="h-12 w-12 text-purple-600" />,
      title: "2. AI Analysis",
      description: "Our advanced AI algorithms analyze your input, drawing from a vast database of successful strategies and best practices."
    },
    {
      icon: <FileText className="h-12 w-12 text-purple-600" />,
      title: "3. Generate Your Plan",
      description: "Within seconds, we create a detailed, step-by-step plan tailored to your specific needs and goals."
    },
    {
      icon: <Rocket className="h-12 w-12 text-purple-600" />,
      title: "4. Take Action",
      description: "Review your plan, make any necessary adjustments, and start working towards your goals with confidence."
    }
  ]

  return (
    <div className="min-h-screen bg-black dark:bg-white">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-white dark:text-black mt-4 mb-8">How It Works</h1>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <p className="text-gray-600 mb-8 text-center">
              Turning your ideas into actionable plans has never been easier. Here&apos;s how our AI-powered platform works:
            </p>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">{step.icon}</div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h2>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Why Choose AI Plan Generator?</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Saves time and effort in planning</li>
              <li>Provides expert-level strategies tailored to your needs</li>
              <li>Constantly updated with the latest industry insights</li>
              <li>Helps break down complex projects into manageable steps</li>
              <li>Increases your chances of success by providing a clear roadmap</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}