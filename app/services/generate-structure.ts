import { Architecture } from "@/lib/schema";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";




export async function generatePythonCodeFromArchitecture(architecture:Architecture){

    console.log(architecture)

const openai = new OpenAI();

const CalendarEvent = z.object({
  code: z.string(),
});

// const response = await openai.responses.parse({
//   model: "gpt-4o-2024-08-06",
//   input: [
//     { role: "system", content:`
//         convert the prompt architecture for python based on the user provided architecture. understand the architecture and their descriptions.
        
//         ` },
//     {
//       role: "user",
//       content: `${architecture}`,
//     },
//   ],
//   text: {
//     format: zodTextFormat(CalendarEvent, "event"),
//   },
// });

const response = await openai.responses.create({
  model: 'gpt-4.1-nano',
  instructions: `
    You are a prompt engineering assistant. your role is to create text structure for prompts.
    exaple
      - user given like this
      {
  name: "RISEN Architecture",
  description: "RISEN prompt engineering architecture will use for role based chatbots",
  sections: [
    { section_name: "Role", section_description: "define the role of the chatbot" },
    { section_name: "Instructions", "define the instructions" },
    { section_name: "Steps", section_description: "define the steps that including how to follow the instructions" },
    { section_name: "End Goal", section_description: "the ultimate goal of the chatbot" },
    { section_name: "Narrow", section_description: "define what the ai chatbot should not do." }
  ]
}
  
so your output should be in python string variable like this. 
"
#RISEN Architecture
#RISEN prompt engineering architecture will use for role based chatbots

prompt = """
  Role: Define the role of chatbot

  Instrcutions: Define the instructions

  Steps: Define the steps that including how to follow the instructions

  End Goal: The ultimate goal of the chatbot

  Narrow: Define what the ai chatbot should not do
 
"""


You are not allowed to provide any explanations, just the give the python string variable with given structure.

"

  `,
  input: `
  {
  name: "FOCUS Framework",
  description: "FOCUS Framework can be used for complex multi agent tasks",
  sections: [
    { section_name: "Function", section_description: "Clearly define the function or purpose of the prompt, outlining what you need the AI to do" },
    { section_name: "Objective", "Specify the objective or goal that the response should achieve, providing a clear target for the AI's output" },
    { section_name: "Context", section_description: "Offer context to enrich the AI's understanding of the prompt, including any relevant background information or specific conditions" },
    { section_name: "Utility", section_description: "Highlight the utility or usefulness of the expected response, explaining how the information or output will be used" },
    { section_name: "Specifications", section_description: "Detail any specifications or requirements for the response, such as format, length, or key points that need to be addressed" }
  ]
}
  
  `,
  
});

const event = response.output_text;
return event;

}