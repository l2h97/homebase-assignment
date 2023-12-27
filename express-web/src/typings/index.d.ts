declare module "http" {
  interface IncomingHttpHeaders {
    correlationId?: string;
  }
}

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
    };
  }
}
