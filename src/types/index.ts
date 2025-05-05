import { z } from 'zod'

/* Auth and Users */
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>

// Usuarios
export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    idUser: z.number()
})

// Creamos el type apartir del projectSchema
export type Project = z.infer<typeof projectSchema>

// Type para el formulario
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

// Notas
const noteSchema = z.object({
    idNote: z.number(),
    content: z.string(),
    createdByUser: userSchema,
    idTask: z.number(),
    createdAt: z.string()
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>
/* Tasks */

// Type de status
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])

export type TaskStatus = z.infer<typeof taskStatusSchema>

// Type de tareas
export const taskSchema = z.object({
    idTask: z.number(),
    name: z.string(),
    description: z.string(),
    status: taskStatusSchema,
    idProject: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    completedByUser: userSchema.or(z.null()),
    notes: z.array(noteSchema.extend({
        createdByUser: userSchema
    })),
})

export const taskProjectSchema = taskSchema.pick({
    idTask: true,
    name: true,
    description: true,
    status: true
})

/* Projects */
export const projectSchema = z.object({
    idProject: z.number(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.number(),
    tasks: z.array(taskProjectSchema),
})

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        idProject: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)

export const editProjectSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
})

export type Task = z.infer<typeof taskSchema>

export type TaskFormData = Pick<Task, 'name' | 'description'>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>

export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>

export type RequestConfirmationCodeForm = Pick<Auth, 'email'>

export type ForgotPasswordForm = Pick<Auth, 'email'>

export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>

export type UpdateCurrentUserPasswordForm = Pick<Auth, 'password' | 'password_confirmation' | 'current_password'>

export type ConfirmToken = Pick<Auth, 'token'>

export type User = z.infer<typeof userSchema>

export type UserProfileForm = Pick<User, 'name' | 'email'>

export type checkPasswordForm = Pick<Auth, 'password'>

export type TaskProject = z.infer<typeof taskProjectSchema>

// Team
const teamMemberSchema = userSchema.pick({
    idUser: true,
    name: true,
    email: true
})

export type TeamMember = z.infer<typeof teamMemberSchema>

export type TeamMemberForm = Pick<TeamMember, 'email'>

export const teamMembersScema = z.array(teamMemberSchema)