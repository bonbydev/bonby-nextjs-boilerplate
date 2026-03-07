type RateLimitEntry = {
  count: number;
  resetTime: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

type RateLimitConfig = {
  maxAttempts: number;
  windowMs: number;
};

export function rateLimit(
  key: string,
  config: RateLimitConfig
): { success: boolean; remaining: number } {
  cleanup();

  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + config.windowMs });
    return { success: true, remaining: config.maxAttempts - 1 };
  }

  if (entry.count >= config.maxAttempts) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: config.maxAttempts - entry.count };
}
