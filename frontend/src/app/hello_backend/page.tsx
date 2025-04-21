"use client"

import { ofetch } from "ofetch";
import useSWR from "swr";

interface NameResponse {
  message: string;
}

async function fetcher(url: string): Promise<string> {
  try {
    const res = await ofetch<NameResponse>(url);
    console.log(res);
    return res.message;
  } catch (error) {
    console.error("Error fetching message:", error);
    throw new Error("Failed to fetch message");
  }
}

export default function Page() {
  const { data: message, isLoading, error } = useSWR('http://localhost:8000/api/hello/backend', fetcher);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {message && <h1>Hello, {message}!</h1>}
    </>
  );
}
