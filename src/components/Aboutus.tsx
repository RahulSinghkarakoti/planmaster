"use client";

import { Button } from "@/components/ui/button";

import Link from 'next/link'
import React from 'react'

function AboutUs() {
  return (
    <div className="min-h-screen bg-black dark:bg-white">
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mt-4 mb-8 text-white  dark:text-black">About AI Plan Generator</h1>
      
      <div className="bg-white shadow-lg shadow-gray-600 rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At AI Plan Generator, we&apos;re on a mission to empower individuals and businesses to turn their ideas into actionable plans. We believe that with the right guidance, anyone can achieve their goals and bring their visions to life.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2023, AI Plan Generator was born from the realization that many great ideas never come to fruition due to a lack of structured planning. Our team of AI experts and business strategists came together to create a tool that bridges the gap between inspiration and execution.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Technology</h2>
          <p className="text-gray-600 mb-6">
            We leverage cutting-edge artificial intelligence and machine learning algorithms to analyze your ideas and generate comprehensive, step-by-step plans. Our AI is constantly learning and improving, ensuring that you receive the most up-to-date and effective strategies for your projects.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
          <p className="text-gray-600 mb-6">
            Our diverse team brings together expertise in AI, business strategy, user experience design, and software development. We&apos;re united by our passion for innovation and our commitment to helping our users succeed.
          </p>

          <div className="mt-8 text-center">
            <Link href="/HowitWorks">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Learn How It Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AboutUs
