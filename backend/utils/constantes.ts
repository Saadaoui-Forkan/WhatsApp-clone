import { env } from "../config/env.js";

function sanitizeDomain(domain?: string) {
  if (!domain) return "";
  return domain.endsWith("/") ? domain.slice(0, -1) : domain;
}

const prodDomain = sanitizeDomain(env.CLIENT_PRODUCTION_DOMAIN);
const devDomain = sanitizeDomain(env.CLIENT_DEVELOPMENT_DOMAIN);

export const CLIENT_DOMAIN =
  env.NODE_ENV === "production" ? prodDomain : devDomain;
