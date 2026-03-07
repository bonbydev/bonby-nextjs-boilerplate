export function getApiDocs(): Record<string, unknown> {
  return {
    openapi: "3.1.0",
    info: {
      title: "Bonby Next.js Boilerplate API",
      description:
        "API documentation for the Bonby Next.js boilerplate. This project uses Server Actions for most mutations (auth), so only REST endpoints are documented here.",
      version: "0.1.0",
      contact: {
        name: "Bonby",
      },
      license: {
        name: "MIT",
      },
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        description: "Current environment",
      },
    ],
    tags: [
      { name: "Health", description: "Service health and readiness checks" },
      { name: "Auth", description: "Authentication endpoints (managed by Auth.js)" },
    ],
    paths: {
      "/api/health": {
        get: {
          tags: ["Health"],
          summary: "Health check",
          description:
            "Returns service health status including database connectivity and latency. Use this endpoint for load balancer health checks and monitoring.",
          operationId: "getHealth",
          responses: {
            "200": {
              description: "Service is healthy",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          status: { type: "string", example: "ok" },
                          timestamp: {
                            type: "string",
                            format: "date-time",
                            example: "2025-03-07T12:00:00.000Z",
                          },
                          uptime: {
                            type: "number",
                            description: "Server uptime in seconds",
                            example: 3600,
                          },
                          database: {
                            type: "object",
                            properties: {
                              status: {
                                type: "string",
                                enum: ["connected", "disconnected"],
                                example: "connected",
                              },
                              latencyMs: {
                                type: "number",
                                description: "Database ping latency in milliseconds",
                                example: 12,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "503": {
              description: "Service unavailable (database unreachable)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/auth/signin": {
        get: {
          tags: ["Auth"],
          summary: "Sign-in page (Auth.js)",
          description:
            "Renders the Auth.js built-in sign-in page or redirects to the custom sign-in page configured in `auth.config.ts`.",
          operationId: "getSignIn",
          responses: {
            "302": { description: "Redirects to custom sign-in page" },
          },
        },
      },
      "/api/auth/signout": {
        get: {
          tags: ["Auth"],
          summary: "Sign-out (Auth.js)",
          description: "Destroys the user session and redirects.",
          operationId: "getSignOut",
          responses: {
            "302": { description: "Redirects after sign-out" },
          },
        },
      },
      "/api/auth/session": {
        get: {
          tags: ["Auth"],
          summary: "Get current session",
          description:
            "Returns the current user session from the JWT cookie. Returns an empty object if not authenticated.",
          operationId: "getSession",
          responses: {
            "200": {
              description: "Session data",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      user: {
                        oneOf: [
                          {
                            type: "object",
                            properties: {
                              id: { type: "string", example: "507f1f77bcf86cd799439011" },
                              name: { type: "string", example: "John Doe" },
                              email: {
                                type: "string",
                                format: "email",
                                example: "john@example.com",
                              },
                              image: { type: ["string", "null"] },
                              role: { type: "string", enum: ["USER", "ADMIN"], example: "USER" },
                            },
                          },
                          { type: "null" },
                        ],
                      },
                      expires: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/auth/providers": {
        get: {
          tags: ["Auth"],
          summary: "List OAuth providers",
          description: "Returns a list of configured OAuth providers and their sign-in URLs.",
          operationId: "getProviders",
          responses: {
            "200": {
              description: "Available providers",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    additionalProperties: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        type: { type: "string" },
                        signinUrl: { type: "string" },
                        callbackUrl: { type: "string" },
                      },
                    },
                    example: {
                      google: {
                        id: "google",
                        name: "Google",
                        type: "oidc",
                        signinUrl: "/api/auth/signin/google",
                        callbackUrl: "/api/auth/callback/google",
                      },
                      github: {
                        id: "github",
                        name: "GitHub",
                        type: "oauth",
                        signinUrl: "/api/auth/signin/github",
                        callbackUrl: "/api/auth/callback/github",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/auth/csrf": {
        get: {
          tags: ["Auth"],
          summary: "Get CSRF token",
          description: "Returns the CSRF token required for POST requests to Auth.js endpoints.",
          operationId: "getCsrf",
          responses: {
            "200": {
              description: "CSRF token",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      csrfToken: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "object" },
          },
          required: ["success", "data"],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                message: { type: "string", example: "Something went wrong" },
                code: { type: "string", example: "INTERNAL_ERROR" },
              },
              required: ["message"],
            },
          },
          required: ["success", "error"],
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "507f1f77bcf86cd799439011" },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "john@example.com" },
            image: { type: ["string", "null"] },
            role: { type: "string", enum: ["USER", "ADMIN"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  };
}
