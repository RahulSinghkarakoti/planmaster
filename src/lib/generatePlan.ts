/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

/* eslint-disable */



import {
    GoogleGenerativeAI ,SchemaType
} from '@google/generative-ai';

const apiKey:string = process.env.GEMINI_API_KEY || '';
const genAI:GoogleGenerativeAI = new GoogleGenerativeAI(apiKey);

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
          },
          required: ["_id", "name", "desc", "isCompleted"],
        },
      },
    },
    required: ["_id", "isCompleted", "title", "modules"],
  };
  

// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//     generationConfig: {
//         responseMimeType: "application/json",
//         responseSchema: schema,
//       },
//     systemInstruction: "The user will provide a task or goal, and you have to generate a plan with a unique plan_id and a set of modules, each with a unique module_id. Each module should include a name, description, additional info (what to focus on while learning), and the completion status (isCompleted). The overall plan should also include a title and a isCompleted field indicating whether the plan has been fully completed. Both the plan_id and module_ids should be generated as random unique values.\n[\n  {\n    \"plan\": {\n      \"_id\": \"random_plan_id\",\n      \"title\": \"Title of the plan\",\n      \"isCompleted\": false, \n      \"modules\": [\n        {\n          \"_id\": \"random_module_id\",\n          \"name\": \"Name of the module\",\n          \"desc\": \"Description of the module content.\",\n          \"add_info\": \"Specific focus areas and learning tips.\",\n          \"isCompleted\":  false\n        },\n        {\n          \"_id\": \"random_module_id_2\",\n          \"name\": \"Name of the next module\",\n          \"desc\": \"Description of what this module covers.\",\n          \"add_info\": \"What to keep in mind during this part of the learning process.\",\n          \"isCompleted\": false  \n        }\n      ]\n    }\n  }\n]\nIf no valid task/goal is provided\n{\n  \"error\": \"Must provide a valid task.\"\n}\n",
// });

// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//     generationConfig: {
//       responseMimeType: "application/json",
//       responseSchema: schema,
//     },
//     systemInstruction: "The user will provide a task or goal, and you have to generate a plan with a unique plan_id and a set of modules, each with a unique module_id. Each module should include a name, description, additional info (what to focus on while learning), and the completion status (isCompleted). The overall plan should also include a title and a isCompleted field indicating whether the plan has been fully completed. Both the plan_id and module_ids should be generated as random unique values.\n[\n  {\n    \"plan\": {\n      \"_id\": \"random_plan_id\",\n      \"title\": \"Title of the plan\",\n      \"isCompleted\": false, \n      \"modules\": [\n        {\n          \"_id\": \"random_module_id\",\n          \"name\": \"Name of the module\",\n          \"desc\": \"Description of the module content.\",\n          \"add_info\": \"Specific focus areas and learning tips.\",\n          \"isCompleted\":  false\n        },\n        {\n          \"_id\": \"random_module_id_2\",\n          \"name\": \"Name of the next module\",\n          \"desc\": \"Description of what this module covers.\",\n          \"add_info\": \"What to keep in mind during this part of the learning process.\",\n          \"isCompleted\": false  \n        }\n      ]\n    }\n  }\n]\nIf no valid task/goal is provided\n{\n  \"error\": \"Must provide a valid task.\"\n}\n",

//   });
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
  systemInstruction: `**Prompt Validation and Plan Generation**

  **Valid Prompt Criteria:**
  - Clear and specific task or goal.
  - Well-defined instructions.
  - No ambiguous or contradictory elements.

  **Invalid Prompt Handling:**
  - If the prompt does not meet the above criteria, return an error message in JSON format that matches the specified schema. Ensure the error message is informative and provides guidance on how to correct the prompt.
  - **Set the title of the plan to 'Invalid'.**

  **Valid Prompt Processing:**
  - If the prompt is valid, generate a plan with the following structure:
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
            "isCompleted": false
          }
        ]
      }
    }
  - Ensure the plan_id and module_ids are unique random values.
  - Generate a relevant and comprehensive plan based on the provided prompt.
  `,
});



// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// };

export async function generatePlan(task: string) {
    try {
        // const chatSession = model.startChat({
        //     generationConfig,
        //     // safetySettings: Adjust safety settings
        //     // See https://ai.google.dev/gemini-api/docs/safety-settings
        //     history: [ 
        //     ],
        // });
        const prompt=task
    
        const result = await model.generateContent(prompt);
        // console.log(result)
        const jsonResponse = JSON.parse(result.response.text()); 
        // console.log(jsonResponse)
        return jsonResponse
    } catch (error) {
         console.error("Error genrating plan",error);
        
    }
}
