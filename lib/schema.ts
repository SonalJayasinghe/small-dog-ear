import { z } from 'zod';

export const ArchitectureSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().optional(),
    sections: z.array(
        z.object({
            section_name: z.string().min(1).max(50),
            section_description: z.string().min(1).max(200).optional(),
        })
    ),
    type: z.enum(['default', 'custom']),
    userId: z.string().optional(),
})

export type Architecture = z.infer<typeof ArchitectureSchema>;


export const PromptSchema = z.object({
    promptName: z.string().min(1).max(50),
    promptDescription: z.string().min(1).max(200).optional(),
    prompt: z.array(
        z.object({
            sectionName: z.string().min(1).max(50),
            sectionPrompt: z.string(),
            subsections: z.array(z.object({
                subsectionName: z.string().min(1).max(50),
                subsectionPrompt: z.string(),
            })).optional(),
        })
    ),
    userId: z.string().optional(),
    rating: z.object({
        usefulness: z.number().min(1).max(5),
        conciseness: z.number().min(1).max(5),
        overall: z.number().min(1).max(5),
        comment: z.string().max(300).optional(),
    }).optional()
})

export type Prompt = z.infer<typeof PromptSchema>; 