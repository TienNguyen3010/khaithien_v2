/** Cloudflare Worker entry point for the vinext-starter template. */

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const {
        handleImageOptimization,
        DEFAULT_DEVICE_SIZES,
        DEFAULT_IMAGE_SIZES,
      } = await import("vinext/server/image-optimization");
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    try {
      const { default: handler } = await import("vinext/server/app-router-entry");
      return await handler.fetch(request, env, ctx);
    } catch (error) {
      if (url.searchParams.get("__khai_debug") === "1") {
        const details = error instanceof Error ? error.stack ?? error.message : String(error);
        return new Response(details, {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
        });
      }
      throw error;
    }
  },
};

export default worker;
