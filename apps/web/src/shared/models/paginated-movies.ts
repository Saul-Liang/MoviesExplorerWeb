import { type z } from "zod";
import { MovieSchema } from "./movie";
import { PaginatedDataSchema } from "./paginated-data";

export const PaginatedMoviesSchema = PaginatedDataSchema(MovieSchema);
export type PaginatedMovies = z.infer<typeof PaginatedMoviesSchema>;
