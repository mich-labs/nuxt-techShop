/* eslint-disable */
// Auto-generated Strapi API client
// Do not edit manually
export const SCHEMA_HASH = 'cc335f0f06c1c94113a6f48ce0c901af3371c58d09c253fa973d9ee65ef9b221';
export const GENERATOR_VERSION = '2.0.1';
/**
 * Error thrown for non-2xx responses from Strapi.
 *
 * Use `isStrapiErrorOf(err, "ValidationError")` (or any other
 * name) to narrow `details` to its typed shape.
 *
 * @example
 * ```ts
 * try { await strapi.articles.create({ title: '' }) }
 * catch (e) {
 *   if (isStrapiErrorOf(e, 'ValidationError')) {
 *     for (const issue of e.details?.errors ?? []) {
 *       console.log(issue.path.join('.'), issue.message)
 *     }
 *   }
 * }
 * ```
 */
export class StrapiError extends Error {
    /** Clean user-friendly message from Strapi backend */
    userMessage;
    /** HTTP status code */
    status;
    /** HTTP status text */
    statusText;
    /**
     * Strapi-side error name (e.g. "ValidationError", "PolicyError").
     * Use as discriminator with `isStrapiErrorOf`. `Error.name` itself
     * remains "StrapiError" so Sentry/sourcemap contracts are unchanged.
     */
    errorName;
    /**
     * Additional error details from Strapi. Typed as `unknown` —
     * narrow via `isStrapiErrorOf` for typed access.
     */
    details;
    constructor(message, userMessage, status, statusText, details, errorName = 'UnknownError') {
        super(message);
        this.name = 'StrapiError';
        this.userMessage = userMessage;
        this.status = status;
        this.statusText = statusText;
        this.errorName = errorName;
        this.details = details;
    }
}
/** Error thrown when the client cannot connect to Strapi (network failures, DNS, timeouts) */
export class StrapiConnectionError extends Error {
    /** The URL that was being requested */
    url;
    /** The original error that caused the connection failure */
    cause;
    constructor(message, url, cause) {
        super(message);
        this.name = 'StrapiConnectionError';
        this.url = url;
        this.cause = cause;
    }
}
/**
 * Type guard: is the value a StrapiError instance?
 */
export function isStrapiError(err) {
    return err instanceof StrapiError;
}
/**
 * Type guard that narrows both `errorName` and `details` for a specific
 * Strapi error type.
 *
 * @example
 * if (isStrapiErrorOf(err, 'ValidationError')) {
 *   err.details?.errors?.[0]?.path // string[] | undefined
 * }
 */
export function isStrapiErrorOf(err, name) {
    return isStrapiError(err) && err.errorName === name;
}
// Base API class with shared logic
class BaseAPI {
    config;
    constructor(config) {
        this.config = config;
    }
    getErrorHint(status) {
        switch (status) {
            case 401:
                return ' Hint: check that your API token is valid and passed to StrapiClient config.';
            case 403:
                return ' Hint: your token may lack permissions for this endpoint. Check Strapi roles & permissions.';
            case 404:
                return ' Hint: this endpoint may not exist. Verify the content type is created in Strapi and the API is enabled.';
            case 500:
                return ' Hint: internal Strapi error. Check Strapi server logs for details.';
            default:
                return '';
        }
    }
    async request(url, options = {}, nextOptions, errorPrefix = 'Strapi API') {
        const fetchFn = this.config.fetch || globalThis.fetch;
        const headers = {
            ...options.headers,
        };
        // Only add Content-Type for JSON, let browser set it for FormData
        if (!(options.body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }
        if (this.config.token) {
            headers['Authorization'] = `Bearer ${this.config.token}`;
        }
        // Merge custom headers from nextOptions
        if (nextOptions?.headers) {
            for (const [key, value] of Object.entries(nextOptions.headers)) {
                if (value !== undefined) {
                    headers[key] = value;
                }
            }
        }
        const fetchOptions = {
            ...options,
            headers,
            ...(this.config.credentials && { credentials: this.config.credentials }),
        };
        // Add Next.js cache options if provided
        if (nextOptions) {
            if (nextOptions.revalidate !== undefined || nextOptions.tags) {
                fetchOptions.next = {
                    ...(nextOptions.revalidate !== undefined && { revalidate: nextOptions.revalidate }),
                    ...(nextOptions.tags && { tags: nextOptions.tags }),
                };
            }
            if (nextOptions.cache) {
                fetchOptions.cache = nextOptions.cache;
            }
        }
        // Timeout support via AbortController
        let timeoutId;
        if (this.config.timeout) {
            const controller = new AbortController();
            fetchOptions.signal = controller.signal;
            timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        }
        // onRequest interceptor — mutate/replace the outgoing request before fetch
        if (this.config.onRequest) {
            const reqConfig = {
                url,
                method: fetchOptions.method ?? 'GET',
                headers: fetchOptions.headers,
                body: fetchOptions.body ?? undefined,
                signal: fetchOptions.signal,
            };
            const result = await this.config.onRequest(reqConfig);
            // Merge over the assembled config so a partial return can't drop method/body.
            const eff = result ? { ...reqConfig, ...result } : reqConfig;
            url = eff.url;
            fetchOptions.method = eff.method;
            fetchOptions.headers = eff.headers;
            fetchOptions.body = eff.body;
            // Keep the timeout signal unless the hook set its own.
            if (eff.signal)
                fetchOptions.signal = eff.signal;
        }
        if (this.config.debug) {
            console.log(`[${errorPrefix}] ${fetchOptions.method || 'GET'} ${url}`);
        }
        let response;
        try {
            response = await fetchFn(url, fetchOptions);
        }
        catch (error) {
            if (timeoutId)
                clearTimeout(timeoutId);
            const baseURL = this.config.baseURL;
            const msg = error?.message || String(error);
            let connErr;
            if (error?.name === 'AbortError') {
                // Timeout (AbortController abort)
                connErr = new StrapiConnectionError(`Request timed out after ${this.config.timeout}ms. URL: ${url}`, url, error);
            }
            else if (msg.includes('ECONNREFUSED')) {
                // Connection refused
                connErr = new StrapiConnectionError(`Could not connect to Strapi at ${baseURL}. Is the server running?`, url, error);
            }
            else if (msg.includes('ENOTFOUND') || msg.includes('getaddrinfo')) {
                // DNS resolution failure
                connErr = new StrapiConnectionError(`Could not resolve host. Check your baseURL: ${baseURL}`, url, error);
            }
            else {
                // Generic network error
                connErr = new StrapiConnectionError(`Network error: ${msg}. Check your baseURL: ${baseURL}`, url, error);
            }
            if (this.config.onError)
                await this.config.onError(connErr);
            throw connErr;
        }
        finally {
            if (timeoutId)
                clearTimeout(timeoutId);
        }
        if (!response.ok) {
            // Detect HTML response (wrong server / reverse proxy error page)
            const contentType = response.headers.get('content-type') || '';
            let httpErr;
            if (contentType.includes('text/html')) {
                httpErr = new StrapiError(`Strapi returned HTML instead of JSON. Your baseURL may point to the wrong server. URL: ${url}`, 'Unexpected HTML response from server', response.status, response.statusText, undefined, 'UnknownError');
            }
            else {
                const errorData = await response.json().catch(() => ({}));
                const userMessage = errorData.error?.message || response.statusText;
                const hint = this.getErrorHint(response.status);
                const technicalMessage = `${errorPrefix} error: ${response.status} ${response.statusText}${errorData.error?.message ? ' - ' + errorData.error.message : ''}${hint}`;
                httpErr = new StrapiError(technicalMessage, userMessage, response.status, response.statusText, errorData.error?.details, errorData.error?.name ?? 'UnknownError');
            }
            if (this.config.onError)
                await this.config.onError(httpErr);
            throw httpErr;
        }
        // onResponse interceptor — observe a successful response before parsing.
        // The body is single-use; a hook that reads it must use response.clone().
        if (this.config.onResponse) {
            await this.config.onResponse(response);
        }
        // Handle 204 No Content (e.g., from DELETE operations)
        if (response.status === 204) {
            return null;
        }
        return response.json();
    }
    buildQueryString(params) {
        if (!params)
            return '';
        const query = stringifyQuery(params);
        return query ? `?${query}` : '';
    }
}
function stringifyQuery(obj) {
    const pairs = [];
    for (const key of Object.keys(obj)) {
        appendEntry(obj[key], key, pairs);
    }
    return pairs.join('&');
}
function appendEntry(value, prefix, pairs) {
    if (value === null || value === undefined)
        return;
    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            appendEntry(value[i], `${prefix}[${i}]`, pairs);
        }
        return;
    }
    if (value instanceof Date) {
        pairs.push(`${prefix}=${encodeURIComponent(value.toISOString())}`);
        return;
    }
    if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
            appendEntry(value[key], `${prefix}[${key}]`, pairs);
        }
        return;
    }
    pairs.push(`${prefix}=${encodeURIComponent(String(value))}`);
}
// Collection API wrapper with type-safe populate support
class CollectionAPI extends BaseAPI {
    endpoint;
    constructor(endpoint, config) {
        super(config);
        this.endpoint = endpoint;
    }
    // Envelope hooks — standard content types use Strapi's { data } wrapper.
    // Subclasses (e.g. the users-permissions endpoint) override these to send
    // and receive a flat payload instead.
    wrapBody(data) {
        return { data };
    }
    unwrap(response) {
        return response?.data;
    }
    async find(params, nextOptions) {
        const query = this.buildQueryString(params);
        const url = `${this.config.baseURL}/api/${this.endpoint}${query}`;
        const response = await this.request(url, {}, nextOptions);
        return this.unwrap(response);
    }
    async findWithMeta(params, nextOptions) {
        const query = this.buildQueryString(params);
        const url = `${this.config.baseURL}/api/${this.endpoint}${query}`;
        return this.request(url, {}, nextOptions);
    }
    async findOne(documentId, params, nextOptions) {
        const query = this.buildQueryString(params);
        const url = `${this.config.baseURL}/api/${this.endpoint}/${documentId}${query}`;
        const response = await this.request(url, {}, nextOptions);
        return this.unwrap(response);
    }
    async create(data, nextOptions) {
        // FormData is sent as-is; everything else goes through the envelope hook
        const body = data instanceof FormData ? data : JSON.stringify(this.wrapBody(data));
        const url = `${this.config.baseURL}/api/${this.endpoint}`;
        const response = await this.request(url, {
            method: 'POST',
            body,
        }, nextOptions);
        return this.unwrap(response);
    }
    async update(documentId, data, nextOptions) {
        // FormData is sent as-is; everything else goes through the envelope hook
        const body = data instanceof FormData ? data : JSON.stringify(this.wrapBody(data));
        const url = `${this.config.baseURL}/api/${this.endpoint}/${documentId}`;
        const response = await this.request(url, {
            method: 'PUT',
            body,
        }, nextOptions);
        return this.unwrap(response);
    }
    async delete(documentId, nextOptions) {
        const url = `${this.config.baseURL}/api/${this.endpoint}/${documentId}`;
        const response = await this.request(url, {
            method: 'DELETE',
        }, nextOptions);
        return this.unwrap(response) ?? null;
    }
}
// Single Type API wrapper with type-safe populate support
class SingleTypeAPI extends BaseAPI {
    endpoint;
    constructor(endpoint, config) {
        super(config);
        this.endpoint = endpoint;
    }
    async find(params, nextOptions) {
        const query = this.buildQueryString(params);
        const url = `${this.config.baseURL}/api/${this.endpoint}${query}`;
        const response = await this.request(url, {}, nextOptions);
        return response.data;
    }
    async update(data, nextOptions) {
        // If data is FormData, use it directly; otherwise wrap in { data } and JSON stringify
        const body = data instanceof FormData ? data : JSON.stringify({ data });
        const url = `${this.config.baseURL}/api/${this.endpoint}`;
        const response = await this.request(url, {
            method: 'PUT',
            body,
        }, nextOptions);
        return response.data;
    }
}
// Users & Permissions endpoint (/api/users) — sends and receives a flat
// payload, unlike standard content types which use the { data } envelope
class UsersPermissionsUserAPI extends CollectionAPI {
    wrapBody(data) {
        return data;
    }
    unwrap(response) {
        return response;
    }
}
// Custom API class for Role (collection type) with custom routes
class RoleAPI extends CollectionAPI {
    /**
     * GET /roles/:id
     * Handler: plugin::users-permissions.role.findOne
     */
    async findOneRole(id) {
        const url = `${this.config.baseURL}/api/${this.endpoint}/${id}`;
        const response = await this.request(url);
        return response.data;
    }
    /**
     * GET /roles
     * Handler: plugin::users-permissions.role.find
     */
    async findRole() {
        const url = `${this.config.baseURL}/api/${this.endpoint}`;
        const response = await this.request(url);
        return response.data;
    }
    /**
     * POST /roles
     * Handler: plugin::users-permissions.role.createRole
     */
    async createRole(data) {
        const url = `${this.config.baseURL}/api/${this.endpoint}`;
        // If data is FormData, use it directly; otherwise JSON stringify
        const body = data instanceof FormData ? data : data ? JSON.stringify(data) : undefined;
        const response = await this.request(url, {
            method: 'POST',
            body,
        });
        return response.data;
    }
    /**
     * PUT /roles/:role
     * Handler: plugin::users-permissions.role.updateRole
     */
    async updateRole(role, data) {
        const url = `${this.config.baseURL}/api/${this.endpoint}/${role}`;
        // If data is FormData, use it directly; otherwise JSON stringify
        const body = data instanceof FormData ? data : data ? JSON.stringify(data) : undefined;
        const response = await this.request(url, {
            method: 'PUT',
            body,
        });
        return response.data;
    }
    /**
     * DELETE /roles/:role
     * Handler: plugin::users-permissions.role.deleteRole
     */
    async deleteRole(role) {
        const url = `${this.config.baseURL}/api/${this.endpoint}/${role}`;
        const response = await this.request(url, { method: 'DELETE' });
        return response.data;
    }
}
// Standalone API class for permissions controller
class UsersPermissionsPermissionsAPI extends BaseAPI {
    constructor(config) {
        super(config);
    }
    /**
     * GET /permissions
     * Handler: plugin::users-permissions.permissions.getPermissions
     */
    async getPermissions() {
        const url = `${this.config.baseURL}/api/users-permissions/permissions`;
        const response = await this.request(url);
        return response.data;
    }
}
// Auth API wrapper for users-permissions plugin (generated from actual routes)
class AuthAPI extends BaseAPI {
    constructor(config) {
        super(config);
    }
    /**
     * GET /connect/(.*)
     * Handler: plugin::users-permissions.auth.connect
     */
    async connect(nextOptions) {
        const url = `${this.config.baseURL}/api/connect/(.*)`;
        return this.request(url, {}, nextOptions, 'Strapi Auth');
    }
    /**
     * POST /auth/local
     * Handler: plugin::users-permissions.auth.callback
     */
    async login(data, nextOptions) {
        const url = `${this.config.baseURL}/api/auth/local`;
        return this.request(url, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }, nextOptions, 'Strapi Auth');
    }
    /**
     * POST /auth/local/register
     * Handler: plugin::users-permissions.auth.register
     */
    async register(data, nextOptions) {
        const url = `${this.config.baseURL}/api/auth/local/register`;
        return this.request(url, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }, nextOptions, 'Strapi Auth');
    }
    /**
     * GET /auth/:provider/callback
     * Handler: plugin::users-permissions.auth.callback
     * OAuth callback with query string support
     * @param provider - OAuth provider name (google, github, etc.)
     * @param search - Query string (e.g., "access_token=xxx&code=yyy" or "?access_token=xxx")
     */
    async callback(provider, search, nextOptions) {
        let path = `/api/auth/${provider}/callback`;
        if (search) {
            // Add search string, handling both "?key=val" and "key=val" formats
            path += search.startsWith('?') ? search : `?${search}`;
        }
        const url = `${this.config.baseURL}${path}`;
        return this.request(url, {}, nextOptions, 'Strapi Auth');
    }
    /**
     * POST /auth/forgot-password
     * Handler: plugin::users-permissions.auth.forgotPassword
     */
    async forgotPassword(data, nextOptions) {
        const url = `${this.config.baseURL}/api/auth/forgot-password`;
        return this.request(url, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }, nextOptions, 'Strapi Auth');
    }
    /**
     * POST /auth/reset-password
     * Handler: plugin::users-permissions.auth.resetPassword
     */
    async resetPassword(data, nextOptions) {
        const url = `${this.config.baseURL}/api/auth/reset-password`;
        return this.request(url, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }, nextOptions, 'Strapi Auth');
    }
    /**
     * GET /auth/email-confirmation
     * Handler: plugin::users-permissions.auth.emailConfirmation
     * Confirm a user's email address with the token from the confirmation email.
     */
    async confirmEmail(confirmationToken, nextOptions) {
        const url = `${this.config.baseURL}/api/auth/email-confirmation?confirmation=${confirmationToken}`;
        return this.request(url, {}, nextOptions, 'Strapi Auth');
    }
    /**
     * POST /auth/send-email-confirmation
     * Handler: plugin::users-permissions.auth.sendEmailConfirmation
     * Resend the confirmation email to a user who hasn't confirmed yet.
     */
    async sendEmailConfirmation(email) {
        const url = `${this.config.baseURL}/api/auth/send-email-confirmation`;
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify({ email }),
        }, undefined, 'Strapi Auth');
    }
    /**
     * POST /auth/change-password
     * Handler: plugin::users-permissions.auth.changePassword
     */
    async changePassword(data, nextOptions) {
        const url = `${this.config.baseURL}/api/auth/change-password`;
        return this.request(url, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }, nextOptions, 'Strapi Auth');
    }
    /**
     * POST /auth/refresh
     * Handler: plugin::users-permissions.auth.refresh
     */
    async refresh(data, nextOptions) {
        const url = `${this.config.baseURL}/api/auth/refresh`;
        return this.request(url, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }, nextOptions, 'Strapi Auth');
    }
    /**
     * POST /auth/logout
     * Handler: plugin::users-permissions.auth.logout
     */
    async logout(data, nextOptions) {
        const url = `${this.config.baseURL}/api/auth/logout`;
        return this.request(url, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }, nextOptions, 'Strapi Auth');
    }
    /**
     * GET /users/count
     * Handler: plugin::users-permissions.user.count
     */
    async count(nextOptions) {
        const url = `${this.config.baseURL}/api/users/count`;
        return this.request(url, {}, nextOptions, 'Strapi Auth');
    }
    async me(params, nextOptions) {
        const queryString = params ? this.buildQueryString(params) : '';
        const url = queryString
            ? `${this.config.baseURL}/api/users/me${queryString}`
            : `${this.config.baseURL}/api/users/me`;
        const response = await this.request(url, {}, nextOptions, 'Strapi Auth');
        return response;
    }
    /**
     * Clear the stored auth token. Client-side only — does not call the server.
     */
    async clearToken() {
        this.config.token = undefined;
    }
}
// API for "upload" plugin
class UploadAPI extends BaseAPI {
    constructor(config) {
        super(config);
    }
    /**
     * Upload one or more files. Pass FormData with field "files".
     *
     * POST /api/upload
     */
    async upload(body, nextOptions) {
        const url = `${this.config.baseURL}/api/upload`;
        return this.request(url, { method: 'POST', body }, nextOptions, 'Strapi Upload');
    }
    /**
     * List uploaded files. Supports filters/sort and flat start/limit pagination.
     *
     * GET /api/upload/files
     */
    async find(params, nextOptions) {
        const query = this.buildQueryString(params);
        const url = `${this.config.baseURL}/api/upload/files${query}`;
        return this.request(url, {}, nextOptions, 'Strapi Upload');
    }
    /**
     * Get a single uploaded file by numeric id.
     *
     * GET /api/upload/files/:id
     */
    async findOne(id, nextOptions) {
        const url = `${this.config.baseURL}/api/upload/files/${id}`;
        return this.request(url, {}, nextOptions, 'Strapi Upload');
    }
    /**
     * Delete an uploaded file by numeric id. Returns the deleted file.
     *
     * DELETE /api/upload/files/:id
     */
    async delete(id, nextOptions) {
        const url = `${this.config.baseURL}/api/upload/files/${id}`;
        return this.request(url, { method: 'DELETE' }, nextOptions, 'Strapi Upload');
    }
    /**
     * @deprecated Use `delete()` instead. Will be removed in a future major.
     */
    async destroy(id, nextOptions) {
        return this.delete(id, nextOptions);
    }
}
// Main Strapi client
export class StrapiClient {
    config;
    // Auth API for users-permissions plugin
    auth;
    /** @deprecated Use `auth` instead. Will be removed in a future major. */
    get authentication() {
        return this.auth;
    }
    // Plugin APIs (registry-driven)
    upload;
    glavnaya;
    kontakty;
    oNas;
    permissions;
    roles;
    users;
    usersPermissionsPermissions;
    constructor(config) {
        this.config = config;
        // Initialize Auth API
        this.auth = new AuthAPI(this.config);
        // Initialize plugin APIs
        this.upload = new UploadAPI(this.config);
        this.glavnaya = new SingleTypeAPI('glavnaya', this.config);
        this.kontakty = new SingleTypeAPI('kontakty', this.config);
        this.oNas = new SingleTypeAPI('o-nas', this.config);
        this.permissions = new CollectionAPI('users-permissions/permissions', this.config);
        this.roles = new RoleAPI('users-permissions/roles', this.config);
        this.users = new UsersPermissionsUserAPI('users', this.config);
        this.usersPermissionsPermissions = new UsersPermissionsPermissionsAPI(this.config);
        // Auto-validate schema in development mode
        if (config.validateSchema) {
            this.validateSchema()
                .then((result) => {
                if (!result.valid && result.remoteHash) {
                    console.warn(`[Strapi Types] Schema mismatch detected!`);
                    console.warn(`  Local:  ${result.localHash.slice(0, 8)}...`);
                    console.warn(`  Remote: ${result.remoteHash.slice(0, 8)}...`);
                    console.warn('  Run "npx strapi-types generate" to update types.');
                }
            })
                .catch(() => {
                // Silently ignore validation errors (e.g., plugin not installed)
            });
        }
    }
    /** @deprecated Prefer `config.onRequest` to attach the Authorization header dynamically (enables token refresh / reading from storage). `setToken` still works for now. */
    setToken(token) {
        this.config.token = token;
    }
    /**
     * Validate that local types match the remote Strapi schema.
     * Useful for detecting schema drift in development.
     * @returns Promise<{ valid: boolean; localHash: string; remoteHash?: string; error?: string }>
     */
    async validateSchema() {
        try {
            const response = await fetch(`${this.config.baseURL}/api/strapi-typed-client/schema-hash`);
            if (!response.ok) {
                return {
                    valid: false,
                    localHash: SCHEMA_HASH,
                    error: `Failed to fetch remote schema: ${response.status}`,
                };
            }
            const { hash: remoteHash } = await response.json();
            const valid = SCHEMA_HASH === remoteHash;
            if (!valid && this.config.debug) {
                console.warn(`[Strapi Types] Schema mismatch! Local: ${SCHEMA_HASH.slice(0, 8)}... Remote: ${remoteHash.slice(0, 8)}...`);
                console.warn('[Strapi Types] Run "npx strapi-types generate" to update types.');
            }
            return { valid, localHash: SCHEMA_HASH, remoteHash };
        }
        catch (error) {
            return {
                valid: false,
                localHash: 'unknown',
                error: error.message,
            };
        }
    }
}
