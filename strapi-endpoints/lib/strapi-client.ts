"use server"; // Add this to ensure cookie access is possible

import { getEnv } from "@/lib/env.utils";
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { cookies } from "next/headers"; // Import the Next.js cookies function

const BASE_URL = getEnv("STRAPI_API_URL", { required: true });

// --- 1. Admin Client (for service-to-service calls) ---

const strapiAPITokenInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getEnv("STRAPI_API_TOKEN", { required: true })}`,
  },
});

strapiAPITokenInstance.interceptors.response.use((response) => response.data);

/**
 * Mutator for Orval (Admin Role)
 * Uses the static admin API token.
 */
export const strapiAPITokenClient = <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return strapiAPITokenInstance(config);
};

// --- 2. User Client (for user-specific calls) ---

const strapiAuthenticatedInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // NO Authorization header here by default
  },
});

strapiAuthenticatedInstance.interceptors.response.use(
  (response) => response.data
);

/**
 * Mutator for Orval (Authenticated User Role)
 * Dynamically gets the JWT from the user's cookie.
 */
export const strapiAuthenticatedClient = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  // Get the JWT from the cookie store
  const token = (await cookies()).get("jwt")?.value; // Or whatever you name your cookie

  if (token) {
    // Add the user's token to the request
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // If no token, the request will be sent unauthenticated
  // Strapi will correctly return a 401/403 error, which
  // our server action can catch.
  return strapiAuthenticatedInstance(config);
};
