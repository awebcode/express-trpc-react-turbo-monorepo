import { z } from "zod";

/**
 * Type for providing custom validation overrides.
 * - You can override existing fields from the schema.
 * - You can also add brand-new fields not present in the original schema.
 */
type ValidationOverride<T extends z.ZodObject<any>> = Record<string, z.ZodTypeAny> &
  Partial<Record<keyof T["shape"], z.ZodTypeAny>>;

/**
 * Pick specific fields from a Zod schema and optionally override/add custom validation rules.
 *
 * @template T - The base ZodObject schema
 * @param schema - The original ZodObject schema
 * @param fields - An array of field keys to pick from the schema
 * @param customValidations - Optional overrides or additional field schemas
 * @returns A new ZodObject with only the picked fields (with overrides or extensions)
 *
 * @example
 * const NewSchema = zodPickData(UserSchema, ['email'], { email: z.string().email() });
 */
export function zodPickData<T extends z.ZodObject<any>>(
  schema: T,
  fields: (keyof T["shape"])[],
  customValidations: ValidationOverride<T> = {}
): z.ZodObject<Pick<T["shape"], (typeof fields)[number]> & Record<string, any>> {
  if (!(schema instanceof z.ZodObject)) {
    throw new Error("Input schema must be a Zod object schema");
  }

  const extendedShape = { ...schema.shape, ...customValidations };

  const newShape = fields.reduce(
    (acc, field) => {
      if (!(field in schema.shape)) {
        throw new Error(`Field "${String(field)}" not found in schema`);
      }
      acc[field as string] =
        extendedShape[field as string] ?? schema.shape[field as string];
      return acc;
    },
    {} as Record<string, z.ZodTypeAny>
  );

  return z.object(newShape) as z.ZodObject<
    Pick<T["shape"], (typeof fields)[number]> & Record<string, any>
  >;
}

/**
 * Omit specific fields from a Zod schema and optionally override/add custom validation rules to the remaining fields.
 *
 * @template T - The base ZodObject schema
 * @param schema - The original ZodObject schema
 * @param fields - An array of field keys to omit from the schema
 * @param customValidations - Optional overrides or additional field schemas
 * @returns A new ZodObject without the omitted fields (with overrides or extensions)
 *
 * @example
 * const NewSchema = zodOmitData(UserSchema, ['password'], { email: z.string().email() });
 */
export function zodOmitData<T extends z.ZodObject<any>>(
  schema: T,
  fields: (keyof T["shape"])[],
  customValidations: ValidationOverride<T> = {}
): z.ZodObject<Omit<T["shape"], (typeof fields)[number]> & Record<string, any>> {
  if (!(schema instanceof z.ZodObject)) {
    throw new Error("Input schema must be a Zod object schema");
  }

  const extendedShape = { ...schema.shape, ...customValidations };

  const newShape = Object.keys(extendedShape).reduce(
    (acc, key) => {
      if (!fields.includes(key as keyof T["shape"])) {
        acc[key] = extendedShape[key];
      }
      return acc;
    },
    {} as Record<string, z.ZodTypeAny>
  );

  return z.object(newShape) as z.ZodObject<
    Omit<T["shape"], (typeof fields)[number]> & Record<string, any>
  >;
}

/**
 * Extend a ZodObject schema with additional fields.
 *
 * @template T - The base ZodObject schema
 * @param schema - The original ZodObject schema
 * @param extension - A record of additional fields to add
 * @returns A new ZodObject with the extended shape
 *
 * @example
 * const ExtendedSchema = zodExtendData(UserSchema, { isAdmin: z.boolean() });
 */
export function zodExtendData<T extends z.ZodObject<any>>(
  schema: T,
  extension: Record<string, z.ZodTypeAny>
): z.ZodObject<any> {
  if (!(schema instanceof z.ZodObject)) {
    throw new Error("Input schema must be a Zod object schema");
  }

  const shape = schema.shape;
  const newShape: Record<string, z.ZodTypeAny> = { ...shape, ...extension };

  return z.object(newShape);
}

/**
 * Merge two ZodObject schemas into one.
 * - If both schemas contain the same key, the second schema’s field will overwrite the first.
 *
 * @template T - First ZodObject
 * @template U - Second ZodObject
 * @param schema1 - The first schema
 * @param schema2 - The second schema
 * @returns A new ZodObject with merged shape
 *
 * @example
 * const Merged = zodMergeData(UserSchema, ExtraSchema);
 */
export function zodMergeData<T extends z.ZodObject<any>, U extends z.ZodObject<any>>(
  schema1: T,
  schema2: U
): z.ZodObject<any> {
  if (!(schema1 instanceof z.ZodObject) || !(schema2 instanceof z.ZodObject)) {
    throw new Error("Both inputs must be Zod object schemas");
  }

  return z.object({ ...schema1.shape, ...schema2.shape });
}
