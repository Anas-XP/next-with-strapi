import { defineConfig } from "orval";

export default defineConfig({
  strapiAPITokenClient: {
    output: {
      mode: "tags-split", // Optional: generates files per tag (e.g., per collection type)
      target: "strapi-endpoints/api-token-client", // Output directory for generated code
      client: "axios", // Instructs Orval to generate React Query hooks
      // Optional: You can add `mock: true` for automatic mocks during development
      override: {
        mutator: {
          // Point to the server-client file you just created
          path: "strapi-endpoints/lib/strapi-client.ts",
          // The name of the exported axios instance
          name: "strapiAPITokenClient",
        },
      },
    },
    input: {
      target: "strapi-endpoints/specification.json", // Your Strapi OpenAPI URL or file path
    },
    // Optional: Hook to add a "use server" banner to the generated file
    hooks: {
      afterAllFilesWrite: "pnpx prettier --write", // Clean up the file
    },
  },
  strapiAuthenticatedClient: {
    output: {
      mode: "tags-split", // Optional: generates files per tag (e.g., per collection type)
      target: "strapi-endpoints/authenticated-client", // Output directory for generated code
      client: "axios", // Instructs Orval to generate React Query hooks
      // Optional: You can add `mock: true` for automatic mocks during development
      override: {
        mutator: {
          // Point to the server-client file you just created
          path: "strapi-endpoints/lib/strapi-client.ts",
          // The name of the exported axios instance
          name: "strapiAuthenticatedClient",
        },
      },
    },
    input: {
      target: "strapi-endpoints/specification.json", // Your Strapi OpenAPI URL or file path
    },
    // Optional: Hook to add a "use server" banner to the generated file
    hooks: {
      afterAllFilesWrite: "pnpx prettier --write", // Clean up the file
    },
  },
});
