import { z } from "zod";

export const formSchema = z.object({
    name: z.string().regex(/^[A-Za-z\s]+$/, { message: "Please fill in the registered name in alphabetical characters" }),
    yearOfAdmission: z.string().regex(/^\d{4}$/, { message: "Year must be a 4-digit number." }),
    studentId: z.string().regex(/^\d{10}$/, { message: "Student ID must be a 10-digit number." }),
    department: z.string().min(2, { message: "Department is required." }),
    faculty: z.string().min(2, { message: "Faculty is required." }),
    photo: z.instanceof(File).refine((file) => file.size <= 5000000, `Max file size is 5MB.`)
      .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), "Only .jpg, .png, and .webp formats are supported.")
  })

export type form = z.infer<typeof formSchema>