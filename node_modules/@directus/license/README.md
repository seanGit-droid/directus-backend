# @directus/license

Shared logic for Directus licensing — JWT verification, schema types, and the HTTP client used by the API to talk to the
licensing service.

## Pointing at a non-production licensing server

By default the package targets the production licensing service. To exercise the dev service from a local Directus
instance, set the env var on the process that runs the API. Only honored in development, otherwise the production URL is
used regardless.

```bash
LICENSE_API_URL="<dev-licensing-service-url>" pnpm dev
```
