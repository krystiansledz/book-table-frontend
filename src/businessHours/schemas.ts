import { z } from "zod";
import { daysOfWeek } from "../restaurant/businessHours/const.ts";

export const BusinessHourSchema = z.object({
  closingTime: z.string(),
  dayOfWeek: z.enum(daysOfWeek),
  id: z.number(),
  openingTime: z.string(),
});

export type BusinessHour = z.infer<typeof BusinessHourSchema>;
