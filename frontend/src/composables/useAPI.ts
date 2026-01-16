export const apiFetch = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {

  const api = import.meta.env.VITE_API_URL;
  
  const response = await fetch(`${api}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<T>;
};
