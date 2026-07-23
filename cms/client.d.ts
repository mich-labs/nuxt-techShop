export declare const SCHEMA_HASH = "fe06802f3f5d6de8138d3e5d0e431ab0b4025f603ba4e5aad7d0dbe32ed6cd14";
export declare const GENERATOR_VERSION = "2.0.1";
import type { Dostavka, DostavkaGetPayload, DostavkaPopulateParam, DostavkaCreateInput, DostavkaUpdateInput, GarantiyaIOplata, GarantiyaIOplataGetPayload, GarantiyaIOplataPopulateParam, GarantiyaIOplataCreateInput, GarantiyaIOplataUpdateInput, Glavnaya, GlavnayaGetPayload, GlavnayaPopulateParam, GlavnayaCreateInput, GlavnayaUpdateInput, Kontakty, KontaktyGetPayload, KontaktyPopulateParam, KontaktyCreateInput, KontaktyUpdateInput, ONas, ONasGetPayload, ONasPopulateParam, ONasCreateInput, ONasUpdateInput, Permission, PermissionGetPayload, PermissionPopulateParam, PermissionCreateInput, PermissionUpdateInput, Role, RoleGetPayload, RolePopulateParam, RoleCreateInput, RoleUpdateInput, User, UserGetPayload, UserPopulateParam, UserCreateInput, UserUpdateInput, MediaFile } from './types.js';
import type { DostavkaFilters, GarantiyaIOplataFilters, GlavnayaFilters, KontaktyFilters, ONasFilters, PermissionFilters, RoleFilters, UserFilters } from './types.js';
export interface StrapiResponse<T> {
    data: T;
    meta?: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}
/**
 * A single validation issue inside a `ValidationError`.
 * Mirrors the Yup-style errors Strapi propagates from schema validation.
 */
export interface StrapiValidationIssue {
    /** Field path to the offending value (e.g. ["author", "email"]). */
    path: string[];
    message: string;
    /** The Yup validator name (e.g. "required"). */
    name: string;
}
/**
 * Known Strapi v5 error names. Other strings are still accepted at
 * runtime via the `(string & {})` fallback so plugin or future-version
 * errors are not lost.
 */
export type StrapiErrorName = 'ValidationError' | 'BadRequestError' | 'PaginationError' | 'UnauthorizedError' | 'ForbiddenError' | 'PolicyError' | 'NotFoundError' | 'ConflictError' | 'PayloadTooLargeError' | 'RateLimitError' | 'ApplicationError' | (string & {});
/**
 * Maps each known `StrapiErrorName` to the shape of its `details`
 * payload. Used by `isStrapiErrorOf` to narrow `details` after the
 * discriminator check. Wrapped in `Partial` because Strapi may
 * omit `details` even when the error name is known.
 */
export type StrapiErrorDetailsMap = Partial<{
    ValidationError: {
        errors: StrapiValidationIssue[];
    };
    BadRequestError: Record<string, unknown>;
    PaginationError: Record<string, unknown>;
    UnauthorizedError: undefined;
    ForbiddenError: undefined;
    PolicyError: {
        policy?: string;
        message?: string;
    };
    NotFoundError: undefined;
    ConflictError: Record<string, unknown>;
    PayloadTooLargeError: undefined;
    RateLimitError: Record<string, unknown>;
    ApplicationError: Record<string, unknown>;
}>;
/**
 * Fallback shape when `errorName` is not in `StrapiErrorDetailsMap`
 * (e.g. 3rd-party plugin errors or Strapi versions newer than this client).
 */
export interface UnknownStrapiErrorDetails {
    errorName: string;
    details?: Record<string, unknown>;
}
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
export declare class StrapiError extends Error {
    /** Clean user-friendly message from Strapi backend */
    userMessage: string;
    /** HTTP status code */
    status: number;
    /** HTTP status text */
    statusText: string;
    /**
     * Strapi-side error name (e.g. "ValidationError", "PolicyError").
     * Use as discriminator with `isStrapiErrorOf`. `Error.name` itself
     * remains "StrapiError" so Sentry/sourcemap contracts are unchanged.
     */
    errorName: StrapiErrorName;
    /**
     * Additional error details from Strapi. Typed as `unknown` —
     * narrow via `isStrapiErrorOf` for typed access.
     */
    details?: unknown;
    constructor(message: string, userMessage: string, status: number, statusText: string, details?: unknown, errorName?: StrapiErrorName);
}
/** Error thrown when the client cannot connect to Strapi (network failures, DNS, timeouts) */
export declare class StrapiConnectionError extends Error {
    /** The URL that was being requested */
    url: string;
    /** The original error that caused the connection failure */
    cause?: Error;
    constructor(message: string, url: string, cause?: Error);
}
/**
 * Type guard: is the value a StrapiError instance?
 */
export declare function isStrapiError(err: unknown): err is StrapiError;
/**
 * Type guard that narrows both `errorName` and `details` for a specific
 * Strapi error type.
 *
 * @example
 * if (isStrapiErrorOf(err, 'ValidationError')) {
 *   err.details?.errors?.[0]?.path // string[] | undefined
 * }
 */
export declare function isStrapiErrorOf<N extends keyof StrapiErrorDetailsMap>(err: unknown, name: N): err is StrapiError & {
    errorName: N;
    details: StrapiErrorDetailsMap[N];
};
declare class BaseAPI {
    protected config: StrapiClientConfig;
    constructor(config: StrapiClientConfig);
    private getErrorHint;
    protected request<R>(url: string, options?: RequestInit, nextOptions?: NextOptions, errorPrefix?: string): Promise<R>;
    protected buildQueryString(params?: QueryParams): string;
}
type StrapiSortOption<T> = Exclude<keyof T & string, '__typename'> | `${Exclude<keyof T & string, '__typename'>}:${'asc' | 'desc'}`;
export interface QueryParams<TEntity = any, TFilters = Record<string, any>, TPopulate = any, TFields extends string = Exclude<keyof TEntity & string, '__typename'>> {
    filters?: TFilters;
    sort?: StrapiSortOption<TEntity> | StrapiSortOption<TEntity>[];
    pagination?: {
        page?: number;
        pageSize?: number;
        limit?: number;
        start?: number;
    };
    populate?: TPopulate;
    fields?: TFields[];
    locale?: string;
    status?: 'draft' | 'published';
}
/**
 * Query params for the upload plugin's content-API.
 *
 * NOTE: Strapi v5 upload plugin uses flat `start`/`limit` for
 * pagination — `pagination[page]`/`pagination[pageSize]` are
 * silently ignored. `filters` and `sort` follow the standard
 * Strapi v5 syntax.
 */
export interface UploadQueryParams {
    filters?: Record<string, any>;
    sort?: StrapiSortOption<MediaFile> | StrapiSortOption<MediaFile>[];
    fields?: Exclude<keyof MediaFile & string, '__typename'>[];
    /** Offset (0-based). Upload plugin uses flat `start`, not `pagination[start]`. */
    start?: number;
    /** Page size. Upload plugin uses flat `limit`, not `pagination[pageSize]`. */
    limit?: number;
}
export interface NextOptions {
    revalidate?: number | false;
    tags?: string[];
    cache?: RequestCache;
    headers?: Record<string, string | undefined>;
}
/** The outgoing request, passed to `onRequest`. Mutate it in place, or return a partial object whose fields override the assembled request; omitted fields keep their assembled value. */
export interface RequestConfig {
    url: string;
    method?: string;
    headers: Record<string, string>;
    body?: BodyInit | null;
    signal?: AbortSignal;
}
export interface StrapiClientConfig {
    baseURL: string;
    /** @deprecated Prefer `onRequest` to attach the Authorization header dynamically (e.g. token refresh, reading from storage). Still read by `request()` for now. */
    token?: string;
    fetch?: typeof fetch;
    debug?: boolean;
    credentials?: RequestCredentials;
    /** Request timeout in milliseconds. When set, requests that take longer will be aborted. */
    timeout?: number;
    /** Enable schema validation on init (dev mode). Logs warning if types are outdated. */
    validateSchema?: boolean;
    /** Called before each request, after headers/timeout are assembled. Mutate `req` in place, or return a partial object to override individual fields (omitted fields keep their assembled value). Use it to attach a token from any async source (replaces `setToken`). If you swap the body to/from FormData you must set the Content-Type header yourself. */
    onRequest?: (req: RequestConfig) => Partial<RequestConfig> | void | Promise<Partial<RequestConfig> | void>;
    /** Called after a successful (2xx) response, before its body is parsed. The body stream is single-use — call `res.clone()` if you need to read it. Error responses go through `onError`, not `onResponse`. */
    onResponse?: (res: Response) => void | Promise<void>;
    /** Called on every connection/HTTP error before it is thrown (e.g. clear a stored token or redirect on 401). The error is always re-thrown afterward. */
    onError?: (err: StrapiError | StrapiConnectionError) => void | Promise<void>;
}
/** Utility type for exact type equality check */
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
/**
 * Utility type to automatically infer populated type based on base type
 * Uses exact equality instead of extends to avoid structural typing issues
 */
type GetPopulated<TBase, TPopulate> = Equal<TBase, Dostavka> extends true ? DostavkaGetPayload<{
    populate: TPopulate;
}> : Equal<TBase, GarantiyaIOplata> extends true ? GarantiyaIOplataGetPayload<{
    populate: TPopulate;
}> : Equal<TBase, Glavnaya> extends true ? GlavnayaGetPayload<{
    populate: TPopulate;
}> : Equal<TBase, Kontakty> extends true ? KontaktyGetPayload<{
    populate: TPopulate;
}> : Equal<TBase, ONas> extends true ? ONasGetPayload<{
    populate: TPopulate;
}> : Equal<TBase, Permission> extends true ? PermissionGetPayload<{
    populate: TPopulate;
}> : Equal<TBase, Role> extends true ? RoleGetPayload<{
    populate: TPopulate;
}> : Equal<TBase, User> extends true ? UserGetPayload<{
    populate: TPopulate;
}> : TBase;
/** Utility type for narrowing return type based on fields parameter */
type SelectFields<TFull, TBase, TFields extends string> = [TFields] extends [never] ? TFull : Pick<TBase, Extract<TFields | 'id' | 'documentId', keyof TBase>> & Omit<TFull, keyof TBase>;
export interface LoginCredentials {
    identifier: string;
    password: string;
}
export interface RegisterData {
    username: string;
    email: string;
    password: string;
    referralCode?: string;
    referralSource?: 'code' | 'link' | 'share';
}
export interface AuthResponse {
    jwt: string;
    user: User;
}
export interface ForgotPasswordData {
    email: string;
}
export interface ResetPasswordData {
    code: string;
    password: string;
    passwordConfirmation: string;
}
export interface ChangePasswordData {
    currentPassword: string;
    password: string;
    passwordConfirmation: string;
}
export interface EmailConfirmationResponse {
    jwt: string;
    user: User;
}
export interface ForgotPasswordResponse {
    ok: true;
}
export interface SendEmailConfirmationResponse {
    email: string;
    sent: boolean;
}
declare class CollectionAPI<TBase, TCreateInput = Partial<TBase>, TUpdateInput = Partial<TBase>, TFilters = Record<string, any>, TPopulateKeys extends Record<string, any> = Record<string, any>> extends BaseAPI {
    protected endpoint: string;
    constructor(endpoint: string, config: StrapiClientConfig);
    protected wrapBody(data: any): any;
    protected unwrap(response: any): any;
    find<const TPopulate extends TPopulateKeys, const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(params: {
        populate: TPopulate;
    } & QueryParams<TBase, TFilters, TPopulate, TFields>, nextOptions?: NextOptions): Promise<SelectFields<GetPopulated<TBase, TPopulate>, TBase, TFields>[]>;
    find<const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(params: {
        populate: '*' | true;
    } & QueryParams<TBase, TFilters, '*' | true, TFields>, nextOptions?: NextOptions): Promise<SelectFields<GetPopulated<TBase, '*'>, TBase, TFields>[]>;
    find<const TPopulate extends readonly (keyof TPopulateKeys & string)[], const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(params: {
        populate: TPopulate;
    } & QueryParams<TBase, TFilters, TPopulate, TFields>, nextOptions?: NextOptions): Promise<SelectFields<GetPopulated<TBase, TPopulate>, TBase, TFields>[]>;
    find<const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(params?: QueryParams<TBase, TFilters, TPopulateKeys | (keyof TPopulateKeys & string)[] | '*' | boolean, TFields>, nextOptions?: NextOptions): Promise<SelectFields<TBase, TBase, TFields>[]>;
    findWithMeta<const TPopulate extends TPopulateKeys, const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(params: {
        populate: TPopulate;
    } & QueryParams<TBase, TFilters, TPopulate, TFields>, nextOptions?: NextOptions): Promise<StrapiResponse<SelectFields<GetPopulated<TBase, TPopulate>, TBase, TFields>[]>>;
    findWithMeta<const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(params: {
        populate: '*' | true;
    } & QueryParams<TBase, TFilters, '*' | true, TFields>, nextOptions?: NextOptions): Promise<StrapiResponse<SelectFields<GetPopulated<TBase, '*'>, TBase, TFields>[]>>;
    findWithMeta<const TPopulate extends readonly (keyof TPopulateKeys & string)[], const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(params: {
        populate: TPopulate;
    } & QueryParams<TBase, TFilters, TPopulate, TFields>, nextOptions?: NextOptions): Promise<StrapiResponse<SelectFields<GetPopulated<TBase, TPopulate>, TBase, TFields>[]>>;
    findWithMeta<const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(params?: QueryParams<TBase, TFilters, TPopulateKeys | (keyof TPopulateKeys & string)[] | '*' | boolean, TFields>, nextOptions?: NextOptions): Promise<StrapiResponse<SelectFields<TBase, TBase, TFields>[]>>;
    findOne<const TPopulate extends TPopulateKeys, const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(documentId: string, params: {
        populate: TPopulate;
    } & QueryParams<TBase, TFilters, TPopulate, TFields>, nextOptions?: NextOptions): Promise<SelectFields<GetPopulated<TBase, TPopulate>, TBase, TFields> | null>;
    findOne<const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(documentId: string, params: {
        populate: '*' | true;
    } & QueryParams<TBase, TFilters, '*' | true, TFields>, nextOptions?: NextOptions): Promise<SelectFields<GetPopulated<TBase, '*'>, TBase, TFields> | null>;
    findOne<const TPopulate extends readonly (keyof TPopulateKeys & string)[], const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(documentId: string, params: {
        populate: TPopulate;
    } & QueryParams<TBase, TFilters, TPopulate, TFields>, nextOptions?: NextOptions): Promise<SelectFields<GetPopulated<TBase, TPopulate>, TBase, TFields> | null>;
    findOne<const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(documentId: string, params?: QueryParams<TBase, TFilters, TPopulateKeys | (keyof TPopulateKeys & string)[] | '*' | boolean, TFields>, nextOptions?: NextOptions): Promise<SelectFields<TBase, TBase, TFields> | null>;
    create(data: TCreateInput | FormData, nextOptions?: NextOptions): Promise<TBase>;
    update(documentId: string, data: TUpdateInput | FormData, nextOptions?: NextOptions): Promise<TBase>;
    delete(documentId: string, nextOptions?: NextOptions): Promise<TBase | null>;
}
declare class SingleTypeAPI<TBase, TCreateInput = Partial<TBase>, TUpdateInput = Partial<TBase>, TFilters = Record<string, any>, TPopulateKeys extends Record<string, any> = Record<string, any>> extends BaseAPI {
    protected endpoint: string;
    constructor(endpoint: string, config: StrapiClientConfig);
    find<const TPopulate extends TPopulateKeys, const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(params: {
        populate: TPopulate;
    } & QueryParams<TBase, TFilters, TPopulate, TFields>, nextOptions?: NextOptions): Promise<SelectFields<GetPopulated<TBase, TPopulate>, TBase, TFields>>;
    find<const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(params: {
        populate: '*' | true;
    } & QueryParams<TBase, TFilters, '*' | true, TFields>, nextOptions?: NextOptions): Promise<SelectFields<GetPopulated<TBase, '*'>, TBase, TFields>>;
    find<const TPopulate extends readonly (keyof TPopulateKeys & string)[], const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(params: {
        populate: TPopulate;
    } & QueryParams<TBase, TFilters, TPopulate, TFields>, nextOptions?: NextOptions): Promise<SelectFields<GetPopulated<TBase, TPopulate>, TBase, TFields>>;
    find<const TFields extends Exclude<keyof TBase & string, '__typename'> = never>(params?: QueryParams<TBase, TFilters, TPopulateKeys | (keyof TPopulateKeys & string)[] | '*' | boolean, TFields>, nextOptions?: NextOptions): Promise<SelectFields<TBase, TBase, TFields>>;
    update(data: TUpdateInput | FormData, nextOptions?: NextOptions): Promise<TBase>;
}
declare class UsersPermissionsUserAPI<TBase, TCreateInput = Partial<TBase>, TUpdateInput = Partial<TBase>, TFilters = Record<string, any>, TPopulateKeys extends Record<string, any> = Record<string, any>> extends CollectionAPI<TBase, TCreateInput, TUpdateInput, TFilters, TPopulateKeys> {
    protected wrapBody(data: any): any;
    protected unwrap(response: any): any;
}
declare class RoleAPI extends CollectionAPI<Role, RoleCreateInput, RoleUpdateInput, RoleFilters, RolePopulateParam> {
    /**
     * GET /roles/:id
     * Handler: plugin::users-permissions.role.findOne
     */
    findOneRole(id: string): Promise<any>;
    /**
     * GET /roles
     * Handler: plugin::users-permissions.role.find
     */
    findRole(): Promise<any>;
    /**
     * POST /roles
     * Handler: plugin::users-permissions.role.createRole
     */
    createRole(data?: any | FormData): Promise<any>;
    /**
     * PUT /roles/:role
     * Handler: plugin::users-permissions.role.updateRole
     */
    updateRole(role: string, data?: any | FormData): Promise<any>;
    /**
     * DELETE /roles/:role
     * Handler: plugin::users-permissions.role.deleteRole
     */
    deleteRole(role: string): Promise<any>;
}
declare class UsersPermissionsPermissionsAPI extends BaseAPI {
    constructor(config: StrapiClientConfig);
    /**
     * GET /permissions
     * Handler: plugin::users-permissions.permissions.getPermissions
     */
    getPermissions(): Promise<any>;
}
declare class AuthAPI extends BaseAPI {
    constructor(config: StrapiClientConfig);
    /**
     * GET /connect/(.*)
     * Handler: plugin::users-permissions.auth.connect
     */
    connect(nextOptions?: NextOptions): Promise<any>;
    /**
     * POST /auth/local
     * Handler: plugin::users-permissions.auth.callback
     */
    login(data: LoginCredentials, nextOptions?: NextOptions): Promise<AuthResponse>;
    /**
     * POST /auth/local/register
     * Handler: plugin::users-permissions.auth.register
     */
    register(data: RegisterData, nextOptions?: NextOptions): Promise<AuthResponse>;
    /**
     * GET /auth/:provider/callback
     * Handler: plugin::users-permissions.auth.callback
     * OAuth callback with query string support
     * @param provider - OAuth provider name (google, github, etc.)
     * @param search - Query string (e.g., "access_token=xxx&code=yyy" or "?access_token=xxx")
     */
    callback(provider: string, search?: string, nextOptions?: NextOptions): Promise<AuthResponse>;
    /**
     * POST /auth/forgot-password
     * Handler: plugin::users-permissions.auth.forgotPassword
     */
    forgotPassword(data: ForgotPasswordData, nextOptions?: NextOptions): Promise<ForgotPasswordResponse>;
    /**
     * POST /auth/reset-password
     * Handler: plugin::users-permissions.auth.resetPassword
     */
    resetPassword(data: ResetPasswordData, nextOptions?: NextOptions): Promise<AuthResponse>;
    /**
     * GET /auth/email-confirmation
     * Handler: plugin::users-permissions.auth.emailConfirmation
     * Confirm a user's email address with the token from the confirmation email.
     */
    confirmEmail(confirmationToken: string, nextOptions?: NextOptions): Promise<EmailConfirmationResponse>;
    /**
     * POST /auth/send-email-confirmation
     * Handler: plugin::users-permissions.auth.sendEmailConfirmation
     * Resend the confirmation email to a user who hasn't confirmed yet.
     */
    sendEmailConfirmation(email: string): Promise<SendEmailConfirmationResponse>;
    /**
     * POST /auth/change-password
     * Handler: plugin::users-permissions.auth.changePassword
     */
    changePassword(data: ChangePasswordData, nextOptions?: NextOptions): Promise<AuthResponse>;
    /**
     * POST /auth/refresh
     * Handler: plugin::users-permissions.auth.refresh
     */
    refresh(data?: any, nextOptions?: NextOptions): Promise<any>;
    /**
     * POST /auth/logout
     * Handler: plugin::users-permissions.auth.logout
     */
    logout(data?: any, nextOptions?: NextOptions): Promise<any>;
    /**
     * GET /users/count
     * Handler: plugin::users-permissions.user.count
     */
    count(nextOptions?: NextOptions): Promise<any>;
    /**
     * GET /users/me
     * Handler: plugin::users-permissions.user.me
     * Supports populate with automatic type inference
     */
    me<const TPopulate extends UserPopulateParam, const TFields extends Exclude<keyof User & string, '__typename'> = never>(params: {
        populate: TPopulate;
    } & QueryParams<User, UserFilters, TPopulate, TFields>, nextOptions?: NextOptions): Promise<SelectFields<GetPopulated<User, TPopulate>, User, TFields>>;
    me<const TFields extends Exclude<keyof User & string, '__typename'> = never>(params: {
        populate: '*' | true;
    } & QueryParams<User, UserFilters, '*' | true, TFields>, nextOptions?: NextOptions): Promise<SelectFields<GetPopulated<User, '*'>, User, TFields>>;
    me<const TFields extends Exclude<keyof User & string, '__typename'> = never>(params?: QueryParams<User, UserFilters, UserPopulateParam | (keyof UserPopulateParam & string)[] | '*' | boolean, TFields>, nextOptions?: NextOptions): Promise<SelectFields<User, User, TFields>>;
    /**
     * Clear the stored auth token. Client-side only — does not call the server.
     */
    clearToken(): Promise<void>;
}
declare class UploadAPI extends BaseAPI {
    constructor(config: StrapiClientConfig);
    /**
     * Upload one or more files. Pass FormData with field "files".
     *
     * POST /api/upload
     */
    upload(body: FormData, nextOptions?: NextOptions): Promise<MediaFile[]>;
    /**
     * List uploaded files. Supports filters/sort and flat start/limit pagination.
     *
     * GET /api/upload/files
     */
    find(params?: UploadQueryParams, nextOptions?: NextOptions): Promise<MediaFile[]>;
    /**
     * Get a single uploaded file by numeric id.
     *
     * GET /api/upload/files/:id
     */
    findOne(id: number, nextOptions?: NextOptions): Promise<MediaFile>;
    /**
     * Delete an uploaded file by numeric id. Returns the deleted file.
     *
     * DELETE /api/upload/files/:id
     */
    delete(id: number, nextOptions?: NextOptions): Promise<MediaFile>;
    /**
     * @deprecated Use `delete()` instead. Will be removed in a future major.
     */
    destroy(id: number, nextOptions?: NextOptions): Promise<MediaFile>;
}
export declare class StrapiClient {
    private config;
    auth: AuthAPI;
    /** @deprecated Use `auth` instead. Will be removed in a future major. */
    get authentication(): AuthAPI;
    upload: UploadAPI;
    dostavka: SingleTypeAPI<Dostavka, DostavkaCreateInput, DostavkaUpdateInput, DostavkaFilters, DostavkaPopulateParam>;
    garantiyaIOplata: SingleTypeAPI<GarantiyaIOplata, GarantiyaIOplataCreateInput, GarantiyaIOplataUpdateInput, GarantiyaIOplataFilters, GarantiyaIOplataPopulateParam>;
    glavnaya: SingleTypeAPI<Glavnaya, GlavnayaCreateInput, GlavnayaUpdateInput, GlavnayaFilters, GlavnayaPopulateParam>;
    kontakty: SingleTypeAPI<Kontakty, KontaktyCreateInput, KontaktyUpdateInput, KontaktyFilters, KontaktyPopulateParam>;
    oNas: SingleTypeAPI<ONas, ONasCreateInput, ONasUpdateInput, ONasFilters, ONasPopulateParam>;
    permissions: CollectionAPI<Permission, PermissionCreateInput, PermissionUpdateInput, PermissionFilters, PermissionPopulateParam>;
    roles: RoleAPI;
    users: UsersPermissionsUserAPI<User, UserCreateInput, UserUpdateInput, UserFilters, UserPopulateParam>;
    usersPermissionsPermissions: UsersPermissionsPermissionsAPI;
    constructor(config: StrapiClientConfig);
    /** @deprecated Prefer `config.onRequest` to attach the Authorization header dynamically (enables token refresh / reading from storage). `setToken` still works for now. */
    setToken(token: string): void;
    /**
     * Validate that local types match the remote Strapi schema.
     * Useful for detecting schema drift in development.
     * @returns Promise<{ valid: boolean; localHash: string; remoteHash?: string; error?: string }>
     */
    validateSchema(): Promise<{
        valid: boolean;
        localHash: string;
        remoteHash?: string;
        error?: string;
    }>;
}
export {};
