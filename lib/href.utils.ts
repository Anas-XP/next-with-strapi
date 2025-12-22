import { type UrlObject } from "url";

export function resolveHref(href: string | UrlObject): string {
  if (typeof href === "string") return href;

  const { pathname = "", query, hash } = href;

  const queryString = formatQueryString(query);

  const hashString = hash ? (hash.startsWith("#") ? hash : `#${hash}`) : "";

  return `${pathname}${queryString}${hashString}`;
}

export function formatQueryString(query: UrlObject["query"]): string {
  if (!query) return "";

  if (typeof query === "string") {
    return query.startsWith("?") ? query : `?${query}`;
  }

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined) {
          params.append(key, String(item));
        }
      });
    } else {
      params.append(key, String(value));
    }
  });

  const str = params.toString();
  return str ? `?${str}` : "";
}
