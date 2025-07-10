function sanitizeDomain(domain?: string) {
  if (!domain) return "";
  return domain.endsWith("/") ? domain.slice(0, -1) : domain;
}

const prodDomain = sanitizeDomain(process.env.CLIENT_PRODUCTION_DOMAIN);
const devDomain = sanitizeDomain(process.env.CLIENT_DEVELOPMENT_DOMAIN);

export const CLIENT_DOMAIN = `${process.env.NODE_ENV === "production" ? prodDomain : devDomain}/api`;