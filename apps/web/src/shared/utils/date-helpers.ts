import { format, parseISO } from "date-fns";
import { isEmpty } from "remeda";

export function parseAndFormatDate(dateString: string): string {
  if (isEmpty(dateString)) {
    return "—";
  }
  const date = parseISO(dateString);
  return format(date, "dd MMM yyyy");
}
