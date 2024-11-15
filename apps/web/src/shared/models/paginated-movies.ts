import { type z } from "zod";
import { movieSchema } from "./movie";
import { paginatedDataSchema } from "./paginated-data";

export const paginatedMoviesSchema = paginatedDataSchema(movieSchema);
export type PaginatedMovies = z.infer<typeof paginatedMoviesSchema>;
