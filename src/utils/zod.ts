import { z } from "zod";

const ZodMessages = {
  Required: "Required",
};

export const requiredString = z.string().trim().min(1, ZodMessages.Required);
