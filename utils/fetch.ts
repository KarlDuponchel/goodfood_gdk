import { getCookie } from "cookies-next";

export async function apiFetch<T>(
  url: string,
  { json, method }: { json?: Record<string, unknown>; method?: string } = {},
): Promise<T> {
  method ??= json ? "POST" : "GET";

  const body = json ? JSON.stringify(json) : undefined;
  const response = await fetch(process.env.api + url, {
    method,
    body,
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      accept: "application/json",
      "content-type": "application/json",
    },
  });

  if (response.ok) {
    return response.json() as Promise<T>;
  }

  throw new ApiError(response.status, await response.json());
}

class ApiError extends Error {
  constructor(
    public status: number,
    public data: Record<string, unknown>,
  ) {
    if (status === 401) {
      localStorage.removeItem("account");
    }

    super(`ApiError: ${status} ${JSON.stringify(data)}`);
  }
}
