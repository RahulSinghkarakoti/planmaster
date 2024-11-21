/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

/* eslint-disable */



import {
  GoogleGenerativeAI, SchemaType
} from '@google/generative-ai';
import { nullable } from 'zod';

const apiKey: string = process.env.GEMINI_API_KEY || '';
const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(apiKey);

const schema: Record<string, any> = {
  description: "Learning plan with modules to achieve a goal",
  type: SchemaType.OBJECT, // The root is an object representing the plan
  properties: {
    _id: {
      type: SchemaType.STRING,
      description: "Unique identifier for the plan",
      nullable: false,
    },
    isCompleted: {
      type: SchemaType.BOOLEAN,
      description: "Indicates whether the plan is completed",
      nullable: false,
    },
    title: {
      type: SchemaType.STRING,
      description: "Title of the learning plan",
      nullable: false,
    },
    modules: {
      type: SchemaType.ARRAY,
      description: "Array of modules within the plan",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          _id: {
            type: SchemaType.STRING,
            description: "Unique identifier for the module",
            nullable: false,
          },
          name: {
            type: SchemaType.STRING,
            description: "Name of the module",
            nullable: false,
          },
          desc: {
            type: SchemaType.STRING,
            description: "Description of what the module covers",
            nullable: false,
          },
          add_info: {
            type: SchemaType.STRING,
            description: "Additional information to focus on during learning",
            nullable: true,
          },
          isCompleted: {
            type: SchemaType.BOOLEAN,
            description: "Indicates whether the module is completed",
            nullable: false,
          },
          links: {
            type: SchemaType.ARRAY,
            description: "plan specific resource links ",
            nullable: false,
            items: {
              type: SchemaType.STRING, // Specify that the array contains strings
              description: "A single link (URL) to a resource"
            }
          }
        },
        required: ["_id", "name", "desc", "isCompleted"],
      },
    },
  },
  required: ["_id", "isCompleted", "title", "modules"],
};



const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },

  systemInstruction: `
1. Prompt Validation:
  -Accept only prompts with a clear and specific objective, a well-defined task or goal, and a specified skill level (beginner, intermediate, advanced).
  -If a prompt lacks clarity, specificity,  a defined skill level or is empty, return an error in JSON format with an informative message guiding the user to refine the prompt.
  -For invalid prompts, set the title field to "Invalid".

2. Plan Structure for Valid Prompts:
  -Generate a detailed plan in JSON format. The plan must be:
    *Comprehensive: Covering all key aspects of the specified topic.
    *Practical and Sequential: Designed for step-by-step learning progression.
    *Skill-Level Adapted: Content tailored to the specified level (beginner, intermediate, advanced).
  -Include resource links for each module (maximum of 5 links per module). These resources must come from trusted and legitimate sources such as:
    *Documentation (e.g., MDN, official project docs).
    *GitHub repositories (relevant to the topic).
    *YouTube tutorials (from credible creators).
    *Trusted learning platforms (e.g., freeCodeCamp, Codecademy).
    *Forums or Q&A (e.g., Stack Overflow).

   -If the prompt is valid, generate a plan with the following structure:
    {
      "plan": {
        "_id": "random_plan_id",
        "title": "Title of the plan",
        "isCompleted": false,
        "modules": [
          {
            "_id": "random_module_id",
            "name": "Name of the module",
            "desc": "Description of the module content",
            "add_info": "Specific focus areas and learning tips",
            "isCompleted": false,
            "links": ["resource_link_1", "resource_link_2", "resource_link_3", "resource_link_4", "resource_link_5"]
    
          }
        ]
      }
    }

3. Content Requirements:
  -Maximum Modules: For each valid prompt, generate as many relevant modules as possible, ensuring comprehensive coverage of the topic.
  -Detailed Module Content:
    *Description: Include a thorough summary of each module’s objectives.
    *Additional Information: Provide specific focus areas, best practices, or resources that align with the skill level indicated in the prompt.

4.Identifiers:
  -Assign unique, random identifiers for plan_id and module_ids for each response to ensure uniqueness across plans.

5.Skill Level Customization:
  -Beginner: Provide foundational knowledge and step-by-step instructions.
  -Intermediate: Include more complex tasks, concepts, and moderate guidance.
  -Advanced: Focus on complex tasks, advanced strategies, and independent problem-solving tips.
  `
});




export async function generatePlan(task: string, selectedLevel: string) {
  try {

    const prompt = "prompt:" + task + " my level : " + selectedLevel

    const result = await model.generateContent(prompt);
    // console.log(result)
    const jsonResponse = JSON.parse(result.response.text());
    // console.log(jsonResponse)
    return jsonResponse
  } catch (error) {
    console.error("Error genrating plan", error);

  }
}
