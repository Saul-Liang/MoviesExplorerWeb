export class RequestError<T extends Error = Error> extends Error {
  status: number;
  originalError?: T | undefined;

  constructor(props?: {
    message?: string | undefined;
    status?: number | undefined;
    originalError?: T | undefined;
  }) {
    const errorMessage = RequestError.getErrorMessage({
      message: props?.message,
      status: props?.status,
    });

    super(errorMessage);
    this.originalError = props?.originalError;
    this.status = props?.status || 500;

    Object.setPrototypeOf(this, RequestError.prototype);
  }

  private static defaultMessages: {
    [key: number]: string;
  } = {
    400: "Oops! Something went wrong with the request. Please check the information you've entered and try again.",
    401: "It looks like you’re not logged in! Please sign in to access this content.",
    403: "You don’t have permission to view this page. If you think this is a mistake, contact support.",
    404: "We couldn’t find what you were looking for. Double-check the URL, or go back to the home page.",
    408: "This request took too long to respond. Please check your connection and try again.",
    429: "Whoa! You’re doing that a bit too often. Please wait a moment before trying again.",
    500: "Our servers are currently experiencing an issue. We’re working on it! Please try again in a few minutes.",
    502: "It looks like there’s a connection problem between servers. Please refresh the page, or try again later.",
    503: "We’re temporarily offline for maintenance or because of heavy traffic. Please try again soon.",
    504: "The request took too long to respond. Please refresh the page, or come back later.",
    507: "There’s a temporary storage issue on our end. Please try again soon.",
  };

  private static getErrorMessage({
    message,
    status,
  }: {
    message: string | undefined;
    status: number | undefined;
  }): string {
    if (message) {
      return message;
    }
    if (status && RequestError.defaultMessages[status]) {
      return RequestError.defaultMessages[status];
    }

    return "Oops! Something went wrong with the request. Please try again later.";
  }
}
