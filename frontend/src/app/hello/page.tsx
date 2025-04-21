"use client"

import { ofetch } from "ofetch";
import useSWR from "swr";

interface NameResponse {
  name: string;
}

async function nameFetcher(url: string): Promise<string> {
  try {
    const res = await ofetch<NameResponse>(url);
    return res.name;
  } catch (error) {
    console.error("Error fetching name:", error);
    throw new Error("Failed to fetch name");
  }
}

export default function Page() {
  const { data: name, isLoading, error } = useSWR('/api/hello', nameFetcher);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {name && <h1>Hello, {name}!</h1>}
    </>
  );
}
