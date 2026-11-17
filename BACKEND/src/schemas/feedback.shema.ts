import { z } from 'zod'


export type State = "RECIBIDO" | "RECHAZADO" | "EN_REVICION" | "PLANEADO" | "EN_PROGRESO" | "IMPLEMENTADO"


export const CreateFeedbackSchema = z.strictObject({
    title: z.string().trim().min(5, "Agrega un titulo mas largo").max(25, "El título debe tener un maximo de 25 caracteres"), 
    description: z.string().trim().min(1, "Agrega una descripcion mas largo").max(250, "La descripcion debe tener un maximo de 250 caracteres"),
    imageUrl: z.url({ protocol: /^https?$/ }).optional()
});

export type CreateFeedbackInput = z.infer<typeof CreateFeedbackSchema>

export const UpdateFeedbackSchema = CreateFeedbackSchema
    .pick({ title: true, description: true })
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "Debes enviar al menos un campo para actualizar"
        }
    )

export type UpdateFeedbackInput = z.infer<typeof UpdateFeedbackSchema>;

export const VoteSchema = z.strictObject({
    voterId: z.uuid(),
});

export const VoterIdSchema = z.uuid();
