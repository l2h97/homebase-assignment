import { META_KEY } from "./controller.decorator";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete" | "options";

export interface IRoutes {
  path: string;
  httpMethod: HttpMethod;
  methodName: string | symbol;
}

const decoratorFactory = (
  path: string,
  httpMethod: HttpMethod,
): MethodDecorator => {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata(META_KEY.PATH, target.constructor)) {
      Reflect.defineMetadata(META_KEY.PATH, [], target.constructor);
    }

    const routes: IRoutes[] = Reflect.getMetadata(
      META_KEY.PATH,
      target.constructor,
    );
    routes.push({
      path,
      httpMethod,
      methodName: propertyKey,
    });
    Reflect.defineMetadata(META_KEY.PATH, routes, target.constructor);
  };
};

export const Get = (path: string) => decoratorFactory(path, "get");
export const Post = (path: string) => decoratorFactory(path, "post");
export const Put = (path: string) => decoratorFactory(path, "put");
export const Patch = (path: string) => decoratorFactory(path, "patch");
export const Delete = (path: string) => decoratorFactory(path, "delete");
export const Options = (path: string) => decoratorFactory(path, "options");
