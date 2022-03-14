import Cookies from "js-cookie";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * An extension of the `fetch` function that automatically adds json headers & throws an error if status >= 400.
 * @param {string} url the url to request
 * @param {RequestOptions} options the options to pass to the fetch function
 * @returns {Response} A response object if status < 400
 */
export async function fetchApi(
  url: string,
  options?: RequestOptions
): Promise<Response> {
  const revisedOptions = options || {};

  // Only apply these headers if it is not a GET request. If no method is provided, it is by default a GET.
  if (revisedOptions.method && revisedOptions.method.toUpperCase() !== "GET") {
    if (!revisedOptions.headers) {
      revisedOptions.headers = {};
    }

    revisedOptions.headers["Content-Type"] =
      revisedOptions.headers["Content-Type"] || "application/json";

    // Since multipart is a bit unique, allow it to be created automatically
    if (revisedOptions.headers["Content-Type"] === "multipart/form-data") {
      delete revisedOptions.headers["Content-Type"];
    }
  }

  const res = await fetch(url, revisedOptions);
  return res;
}

export function fetchApiWithCsrf(url: string, options?: RequestOptions) {
  const revisedOptions = options || {};

  if (!revisedOptions.headers) {
    revisedOptions.headers = {};
  }

  const csrfToken = Cookies.get("xsrf-token");
  if (csrfToken) {
    revisedOptions.headers["xsrf-token"] = csrfToken;
  }

  return fetchApi(url, options);
}

/**
 * A route builder utility. Given a base path (such as `/api`), the returned function can be called to create new
 * route strings using that base path as the start of all returned strings.
 * @param basePath In the form of `/api/test`.
 * @returns {(path?: string) => string} a builder function to create the full path
 */
export function routeBuilder(basePath: string): (path?: string) => string {
  // Sanitize input, removing trailing `/` if it exists
  const sanitizedBasePath =
    basePath[basePath.length - 1] === "/"
      ? basePath.substring(0, basePath.length - 2)
      : basePath;

  /**
   * Creates a path by appending the `path` to the `basePath`.
   * @param path The path to append to the base path
   * @returns the constructed route based on the basePath and newly provided path
   */
  const buildRoute = (path?: string): string => {
    const sanitizedPath =
      path !== undefined && path[0] !== "/" ? `/${path}` : path;
    if (!sanitizedPath || sanitizedPath === "/") {
      return sanitizedBasePath;
    }
    return `${sanitizedBasePath}${sanitizedPath}`;
  };
  return buildRoute;
}
