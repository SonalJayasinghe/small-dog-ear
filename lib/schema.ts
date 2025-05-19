import { z } from 'zod';

export const ArchitectureSchema = z.object({
    name: z.string().min(1).max(50),
    sections: z.array(
        z.object({
            section_name: z.string().min(1).max(50),
            section_description: z.string().min(1).max(200).optional(),
        })
    ),
    type: z.enum(['default', 'custom']),
    userId: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})

export type Architecture = z.infer<typeof ArchitectureSchema>;