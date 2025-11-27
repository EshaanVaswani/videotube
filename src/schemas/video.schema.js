import { z } from "zod";

export const uploadSchema = z.object({
   videoFile: z
      .instanceof(File, { message: "Video file is required" })
      .refine((file) => file.size <= 500 * 1024 * 1024, {
         message: "Video must be less than 500MB",
      })
      .refine((file) => file.type.startsWith("video/"), {
         message: "File must be a video",
      }),
   thumbnail: z
      .instanceof(File, { message: "Thumbnail is required" })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
         message: "Thumbnail must be less than 5MB",
      })
      .refine((file) => file.type.startsWith("image/"), {
         message: "File must be an image",
      }),
});

export const detailsSchema = z.object({
   title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be less than 100 characters"),
   description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(5000, "Description must be less than 5000 characters"),
});

export const transcriptSchema = z.object({
   transcript: z.string().optional(),
});

export const tagsCategorySchema = z.object({
   category: z.string().min(1, "Please select a category"),
   tags: z
      .array(z.string())
      .max(10, "Maximum 10 tags allowed")
      .optional()
      .default([]),
});

export const publishVideoSchema = detailsSchema
   .merge(transcriptSchema)
   .merge(tagsCategorySchema)
   .extend({
      videoUrl: z.string().url("Invalid video URL"),
      thumbnailUrl: z.string().url("Invalid thumbnail URL"),
      duration: z.number().positive("Invalid duration"),
   });
