/**
 * Scalar identifier accepted by the Strapi v5 REST API for relations and media.
 * Strings are treated as documentId; numbers fall back to the legacy numeric id.
 */
export type StrapiID = string | number;
/**
 * Explicit relation operations supported by Strapi v5.
 * See: https://docs.strapi.io/cms/api/rest/relations
 */
export interface RelationOperations {
    connect?: StrapiID[] | {
        documentId: string;
        position?: {
            before?: StrapiID;
            after?: StrapiID;
            start?: true;
            end?: true;
        };
    }[];
    disconnect?: StrapiID[];
    set?: StrapiID[];
}
/**
 * Input value for a relation field in create/update payloads.
 * Accepts a single id, an array of ids, or the explicit { connect | disconnect | set } form.
 * Passing a plain id or array is equivalent to 'set' — it overwrites existing relations.
 */
export type RelationInput = StrapiID | StrapiID[] | RelationOperations | null;
/**
 * Input value for a single media file field. Accepts a documentId (string) or
 * legacy numeric id.
 */
export type MediaInput = StrapiID | null;
/**
 * Input value for a multi-media field. Accepts an array of ids.
 */
export type MultiMediaInput = StrapiID[] | null;
export interface MediaFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}
export interface BaseMediaFormats {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
    [key: string]: MediaFormat | undefined;
}
export interface MediaFile {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    focalPoint: {
        x: number;
        y: number;
    } | null;
    width: number | null;
    height: number | null;
    formats: BaseMediaFormats | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    createdAt: string;
    updatedAt: string;
}
/**
 * Main type for Strapi Blocks content
 */
export type BlocksContent = Block[];
/**
 * All possible block types
 */
export type Block = ParagraphBlock | HeadingBlock | QuoteBlock | CodeBlock | ListBlock | ImageBlock;
/**
 * Paragraph block - default text block
 */
export interface ParagraphBlock {
    type: 'paragraph';
    children: InlineNode[];
}
/**
 * Heading block - h1 to h6
 */
export interface HeadingBlock {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: InlineNode[];
}
/**
 * Quote block - blockquote
 */
export interface QuoteBlock {
    type: 'quote';
    children: InlineNode[];
}
/**
 * Code block - preformatted code with optional language
 */
export interface CodeBlock {
    type: 'code';
    language?: string;
    children: InlineNode[];
}
/**
 * List block - ordered or unordered (supports nesting)
 */
export interface ListBlock {
    type: 'list';
    format: 'ordered' | 'unordered';
    children: (ListItemBlock | ListBlock)[];
}
/**
 * List item - individual item in a list
 */
export interface ListItemBlock {
    type: 'list-item';
    children: InlineNode[];
}
/**
 * Image block - embedded image
 */
export interface ImageBlock {
    type: 'image';
    image: {
        name: string;
        alternativeText?: string | null;
        url: string;
        caption?: string | null;
        width: number;
        height: number;
        formats?: BaseMediaFormats;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        previewUrl?: string | null;
        provider: string;
        provider_metadata?: unknown | null;
        createdAt: string;
        updatedAt: string;
    };
    children: [{
        type: 'text';
        text: '';
    }];
}
/**
 * Inline nodes - text formatting and inline elements
 */
export type InlineNode = TextNode | LinkInline;
/**
 * Plain text node with optional formatting
 */
export interface TextNode {
    type: 'text';
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
}
/**
 * Inline link
 */
export interface LinkInline {
    type: 'link';
    url: string;
    children: TextNode[];
}
type _EntityField<T> = Exclude<keyof T & string, '__typename'>;
type _SortValue<T> = _EntityField<T> | `${_EntityField<T>}:${'asc' | 'desc'}`;
type _ApplyFields<TFull, TBase, TEntry> = TEntry extends true ? TFull : TEntry extends {
    fields: readonly (infer F extends string)[];
} ? Pick<TBase, Extract<F | 'id' | 'documentId', keyof TBase>> & Omit<TFull, keyof TBase> : TFull;
export interface SharedBanner {
    id: number;
    title: string | null;
    content: string | null;
}
export interface SharedSeo {
    id: number;
    title: string;
    description: string;
}
export interface SharedSsylka {
    id: number;
    url: string;
    /** @default true */
    isExternal: boolean;
}
export interface SharedTekstovyjBlok {
    id: number;
    title: string | null;
    content: BlocksContent;
}
export interface WidgetsPromoSekcziya {
    id: number;
    title: string;
    /** @maxLength 350 */
    content: string;
}
export interface WidgetsSlajder {
    id: number;
    title: string;
    content: string;
}
export type SharedTekstovyjBlokDz = SharedTekstovyjBlok & {
    __component: 'shared.tekstovyj-blok';
};
/** Create input for SharedBanner */
export interface SharedBannerCreateInput {
    id?: number;
    title?: string | null;
    content?: string | null;
    image?: MediaInput;
    link?: SharedSsylkaCreateInput | null;
}
/** Update input for SharedBanner */
export interface SharedBannerUpdateInput {
    id?: number;
    title?: string | null;
    content?: string | null;
    image?: MediaInput;
    link?: SharedSsylkaUpdateInput | null;
}
/** Create input for SharedSeo */
export interface SharedSeoCreateInput {
    id?: number;
    title: string;
    description: string;
}
/** Update input for SharedSeo */
export interface SharedSeoUpdateInput {
    id?: number;
    title?: string;
    description?: string;
}
/** Create input for SharedSsylka */
export interface SharedSsylkaCreateInput {
    id?: number;
    url: string;
    /** @default true */
    isExternal: boolean;
}
/** Update input for SharedSsylka */
export interface SharedSsylkaUpdateInput {
    id?: number;
    url?: string;
    /** @default true */
    isExternal?: boolean;
}
/** Create input for SharedTekstovyjBlok */
export interface SharedTekstovyjBlokCreateInput {
    id?: number;
    title?: string | null;
    content: BlocksContent;
}
/** Update input for SharedTekstovyjBlok */
export interface SharedTekstovyjBlokUpdateInput {
    id?: number;
    title?: string | null;
    content?: BlocksContent;
}
/** Create input for WidgetsPromoSekcziya */
export interface WidgetsPromoSekcziyaCreateInput {
    id?: number;
    title: string;
    /** @maxLength 350 */
    content: string;
    mainImage?: MediaInput;
    smallImage?: MediaInput;
    link?: SharedSsylkaCreateInput | null;
}
/** Update input for WidgetsPromoSekcziya */
export interface WidgetsPromoSekcziyaUpdateInput {
    id?: number;
    title?: string;
    /** @maxLength 350 */
    content?: string;
    mainImage?: MediaInput;
    smallImage?: MediaInput;
    link?: SharedSsylkaUpdateInput | null;
}
/** Create input for WidgetsSlajder */
export interface WidgetsSlajderCreateInput {
    id?: number;
    title: string;
    content: string;
    button?: SharedSsylkaCreateInput | null;
    banners?: SharedBannerCreateInput[] | null;
}
/** Update input for WidgetsSlajder */
export interface WidgetsSlajderUpdateInput {
    id?: number;
    title?: string;
    content?: string;
    button?: SharedSsylkaUpdateInput | null;
    banners?: SharedBannerUpdateInput[] | null;
}
export type SharedTekstovyjBlokDzCreateInput = SharedTekstovyjBlokCreateInput & {
    __component: 'shared.tekstovyj-blok';
};
export type SharedTekstovyjBlokDzUpdateInput = SharedTekstovyjBlokUpdateInput & {
    __component: 'shared.tekstovyj-blok';
};
export interface Glavnaya {
    readonly __typename?: 'Glavnaya';
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    title: string;
    locale: string | null;
}
export interface Kontakty {
    readonly __typename?: 'Kontakty';
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    title: string;
    locale: string | null;
}
export interface ONas {
    readonly __typename?: 'ONas';
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    title: string;
    locale: string | null;
}
export interface Permission {
    readonly __typename?: 'Permission';
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    action: string;
}
export interface Role {
    readonly __typename?: 'Role';
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    /** @minLength 3 */
    name: string;
    description: string | null;
    type: string | null;
}
export interface User {
    readonly __typename?: 'User';
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    /** @minLength 3 */
    username: string;
    /** @minLength 6 */
    email: string;
    provider: string | null;
    /** @default false */
    confirmed: boolean | null;
    /** @default false */
    blocked: boolean | null;
}
/** Create input for Glavnaya */
export interface GlavnayaCreateInput {
    title: string;
    locale?: string | null;
    localizations?: RelationInput;
    seo?: SharedSeoCreateInput | null;
    slider?: WidgetsSlajderCreateInput | null;
    promoSection1?: WidgetsPromoSekcziyaCreateInput | null;
    promoSection2?: WidgetsPromoSekcziyaCreateInput | null;
}
/** Update input for Glavnaya */
export interface GlavnayaUpdateInput {
    title?: string;
    locale?: string | null;
    localizations?: RelationInput;
    seo?: SharedSeoUpdateInput | null;
    slider?: WidgetsSlajderUpdateInput | null;
    promoSection1?: WidgetsPromoSekcziyaUpdateInput | null;
    promoSection2?: WidgetsPromoSekcziyaUpdateInput | null;
}
/** Create input for Kontakty */
export interface KontaktyCreateInput {
    title: string;
    locale?: string | null;
    localizations?: RelationInput;
    seo?: SharedSeoCreateInput | null;
    content?: SharedTekstovyjBlokDzCreateInput[] | null;
}
/** Update input for Kontakty */
export interface KontaktyUpdateInput {
    title?: string;
    locale?: string | null;
    localizations?: RelationInput;
    seo?: SharedSeoUpdateInput | null;
    content?: SharedTekstovyjBlokDzUpdateInput[] | null;
}
/** Create input for ONas */
export interface ONasCreateInput {
    title: string;
    locale?: string | null;
    localizations?: RelationInput;
    seo?: SharedSeoCreateInput | null;
    content?: SharedTekstovyjBlokDzCreateInput[] | null;
}
/** Update input for ONas */
export interface ONasUpdateInput {
    title?: string;
    locale?: string | null;
    localizations?: RelationInput;
    seo?: SharedSeoUpdateInput | null;
    content?: SharedTekstovyjBlokDzUpdateInput[] | null;
}
/** Create input for Permission */
export interface PermissionCreateInput {
    action: string;
    role?: RelationInput;
}
/** Update input for Permission */
export interface PermissionUpdateInput {
    action?: string;
    role?: RelationInput;
}
/** Create input for Role */
export interface RoleCreateInput {
    /** @minLength 3 */
    name: string;
    description?: string | null;
    type?: string | null;
    permissions?: RelationInput;
    users?: RelationInput;
}
/** Update input for Role */
export interface RoleUpdateInput {
    /** @minLength 3 */
    name?: string;
    description?: string | null;
    type?: string | null;
    permissions?: RelationInput;
    users?: RelationInput;
}
/** Create input for User */
export interface UserCreateInput {
    /** @minLength 3 */
    username: string;
    /** @minLength 6 */
    email: string;
    provider?: string | null;
    /** @default false */
    confirmed?: boolean | null;
    /** @default false */
    blocked?: boolean | null;
    role?: RelationInput;
}
/** Update input for User */
export interface UserUpdateInput {
    /** @minLength 3 */
    username?: string;
    /** @minLength 6 */
    email?: string;
    provider?: string | null;
    /** @default false */
    confirmed?: boolean | null;
    /** @default false */
    blocked?: boolean | null;
    role?: RelationInput;
}
export declare const UserDefaults: {
    readonly confirmed: false;
    readonly blocked: false;
};
export declare const SharedSsylkaDefaults: {
    readonly isExternal: true;
};
export declare const SharedTekstovyjBlokDzDefaults: {
    readonly __component: "shared.tekstovyj-blok";
};
export type SharedBannerPopulateParam = {
    image?: true | {
        fields?: (keyof MediaFile & string)[];
    };
    link?: true | {
        fields?: (keyof SharedSsylka & string)[];
    };
};
export type WidgetsPromoSekcziyaPopulateParam = {
    mainImage?: true | {
        fields?: (keyof MediaFile & string)[];
    };
    smallImage?: true | {
        fields?: (keyof MediaFile & string)[];
    };
    link?: true | {
        fields?: (keyof SharedSsylka & string)[];
    };
};
export type WidgetsSlajderPopulateParam = {
    button?: true | {
        fields?: (keyof SharedSsylka & string)[];
    };
    banners?: true | {
        fields?: (keyof SharedBanner & string)[];
        populate?: SharedBannerPopulateParam | (keyof SharedBannerPopulateParam & string)[] | '*';
    };
};
export type GlavnayaPopulateParam = {
    localizations?: true | {
        fields?: _EntityField<Glavnaya>[];
        populate?: GlavnayaPopulateParam | (keyof GlavnayaPopulateParam & string)[] | '*';
        filters?: GlavnayaFilters;
        sort?: _SortValue<Glavnaya> | _SortValue<Glavnaya>[];
        limit?: number;
        start?: number;
    };
    seo?: true | {
        fields?: (keyof SharedSeo & string)[];
    };
    slider?: true | {
        fields?: (keyof WidgetsSlajder & string)[];
        populate?: WidgetsSlajderPopulateParam | (keyof WidgetsSlajderPopulateParam & string)[] | '*';
    };
    promoSection1?: true | {
        fields?: (keyof WidgetsPromoSekcziya & string)[];
        populate?: WidgetsPromoSekcziyaPopulateParam | (keyof WidgetsPromoSekcziyaPopulateParam & string)[] | '*';
    };
    promoSection2?: true | {
        fields?: (keyof WidgetsPromoSekcziya & string)[];
        populate?: WidgetsPromoSekcziyaPopulateParam | (keyof WidgetsPromoSekcziyaPopulateParam & string)[] | '*';
    };
};
export type KontaktyPopulateParam = {
    localizations?: true | {
        fields?: _EntityField<Kontakty>[];
        populate?: KontaktyPopulateParam | (keyof KontaktyPopulateParam & string)[] | '*';
        filters?: KontaktyFilters;
        sort?: _SortValue<Kontakty> | _SortValue<Kontakty>[];
        limit?: number;
        start?: number;
    };
    seo?: true | {
        fields?: (keyof SharedSeo & string)[];
    };
    content?: true | {
        on?: {
            'shared.tekstovyj-blok'?: true | {
                fields?: (keyof SharedTekstovyjBlok & string)[];
            };
        };
    };
};
export type ONasPopulateParam = {
    localizations?: true | {
        fields?: _EntityField<ONas>[];
        populate?: ONasPopulateParam | (keyof ONasPopulateParam & string)[] | '*';
        filters?: ONasFilters;
        sort?: _SortValue<ONas> | _SortValue<ONas>[];
        limit?: number;
        start?: number;
    };
    seo?: true | {
        fields?: (keyof SharedSeo & string)[];
    };
    content?: true | {
        on?: {
            'shared.tekstovyj-blok'?: true | {
                fields?: (keyof SharedTekstovyjBlok & string)[];
            };
        };
    };
};
export type PermissionPopulateParam = {
    role?: true | {
        fields?: _EntityField<Role>[];
        populate?: RolePopulateParam | (keyof RolePopulateParam & string)[] | '*';
        filters?: RoleFilters;
        sort?: _SortValue<Role> | _SortValue<Role>[];
        limit?: number;
        start?: number;
    };
};
export type RolePopulateParam = {
    permissions?: true | {
        fields?: _EntityField<Permission>[];
        populate?: PermissionPopulateParam | (keyof PermissionPopulateParam & string)[] | '*';
        filters?: PermissionFilters;
        sort?: _SortValue<Permission> | _SortValue<Permission>[];
        limit?: number;
        start?: number;
    };
    users?: true | {
        fields?: _EntityField<User>[];
        populate?: UserPopulateParam | (keyof UserPopulateParam & string)[] | '*';
        filters?: UserFilters;
        sort?: _SortValue<User> | _SortValue<User>[];
        limit?: number;
        start?: number;
    };
};
export type UserPopulateParam = {
    role?: true | {
        fields?: _EntityField<Role>[];
        populate?: RolePopulateParam | (keyof RolePopulateParam & string)[] | '*';
        filters?: RoleFilters;
        sort?: _SortValue<Role> | _SortValue<Role>[];
        limit?: number;
        start?: number;
    };
};
export type SharedBannerGetPayload<P extends {
    populate?: unknown;
} = {}> = SharedBanner & (P extends {
    populate: infer Pop;
} ? Pop extends '*' | true ? {
    image?: MediaFile;
    link?: SharedSsylka;
} : Pop extends readonly (infer _)[] ? {
    image?: 'image' extends Pop[number] ? MediaFile : never;
    link?: 'link' extends Pop[number] ? SharedSsylka : never;
} : {
    image?: 'image' extends keyof Pop ? _ApplyFields<MediaFile, MediaFile, Pop['image']> : never;
    link?: 'link' extends keyof Pop ? _ApplyFields<SharedSsylka, SharedSsylka, Pop['link']> : never;
} : {});
export type WidgetsPromoSekcziyaGetPayload<P extends {
    populate?: unknown;
} = {}> = WidgetsPromoSekcziya & (P extends {
    populate: infer Pop;
} ? Pop extends '*' | true ? {
    mainImage?: MediaFile;
    smallImage?: MediaFile;
    link?: SharedSsylka;
} : Pop extends readonly (infer _)[] ? {
    mainImage?: 'mainImage' extends Pop[number] ? MediaFile : never;
    smallImage?: 'smallImage' extends Pop[number] ? MediaFile : never;
    link?: 'link' extends Pop[number] ? SharedSsylka : never;
} : {
    mainImage?: 'mainImage' extends keyof Pop ? _ApplyFields<MediaFile, MediaFile, Pop['mainImage']> : never;
    smallImage?: 'smallImage' extends keyof Pop ? _ApplyFields<MediaFile, MediaFile, Pop['smallImage']> : never;
    link?: 'link' extends keyof Pop ? _ApplyFields<SharedSsylka, SharedSsylka, Pop['link']> : never;
} : {});
export type WidgetsSlajderGetPayload<P extends {
    populate?: unknown;
} = {}> = WidgetsSlajder & (P extends {
    populate: infer Pop;
} ? Pop extends '*' | true ? {
    button?: SharedSsylka;
    banners?: SharedBanner[];
} : Pop extends readonly (infer _)[] ? {
    button?: 'button' extends Pop[number] ? SharedSsylka : never;
    banners?: 'banners' extends Pop[number] ? SharedBanner[] : never;
} : {
    button?: 'button' extends keyof Pop ? _ApplyFields<SharedSsylka, SharedSsylka, Pop['button']> : never;
    banners?: 'banners' extends keyof Pop ? _ApplyFields<Pop['banners'] extends {
        populate: infer NestedPop;
    } ? SharedBannerGetPayload<{
        populate: NestedPop;
    }> : SharedBanner, SharedBanner, Pop['banners']>[] : never;
} : {});
export type GlavnayaGetPayload<P extends {
    populate?: unknown;
} = {}> = Glavnaya & (P extends {
    populate: infer Pop;
} ? Pop extends '*' | true ? {
    localizations?: Glavnaya[];
    seo?: SharedSeo;
    slider?: WidgetsSlajder;
    promoSection1?: WidgetsPromoSekcziya;
    promoSection2?: WidgetsPromoSekcziya;
} : Pop extends readonly (infer _)[] ? {
    localizations?: 'localizations' extends Pop[number] ? Glavnaya[] : never;
    seo?: 'seo' extends Pop[number] ? SharedSeo : never;
    slider?: 'slider' extends Pop[number] ? WidgetsSlajder : never;
    promoSection1?: 'promoSection1' extends Pop[number] ? WidgetsPromoSekcziya : never;
    promoSection2?: 'promoSection2' extends Pop[number] ? WidgetsPromoSekcziya : never;
} : {
    localizations?: 'localizations' extends keyof Pop ? _ApplyFields<Pop['localizations'] extends {
        populate: infer NestedPop;
    } ? GlavnayaGetPayload<{
        populate: NestedPop;
    }> : Glavnaya, Glavnaya, Pop['localizations']>[] : never;
    seo?: 'seo' extends keyof Pop ? _ApplyFields<SharedSeo, SharedSeo, Pop['seo']> : never;
    slider?: 'slider' extends keyof Pop ? _ApplyFields<Pop['slider'] extends {
        populate: infer NestedPop;
    } ? WidgetsSlajderGetPayload<{
        populate: NestedPop;
    }> : WidgetsSlajder, WidgetsSlajder, Pop['slider']> : never;
    promoSection1?: 'promoSection1' extends keyof Pop ? _ApplyFields<Pop['promoSection1'] extends {
        populate: infer NestedPop;
    } ? WidgetsPromoSekcziyaGetPayload<{
        populate: NestedPop;
    }> : WidgetsPromoSekcziya, WidgetsPromoSekcziya, Pop['promoSection1']> : never;
    promoSection2?: 'promoSection2' extends keyof Pop ? _ApplyFields<Pop['promoSection2'] extends {
        populate: infer NestedPop;
    } ? WidgetsPromoSekcziyaGetPayload<{
        populate: NestedPop;
    }> : WidgetsPromoSekcziya, WidgetsPromoSekcziya, Pop['promoSection2']> : never;
} : {});
export type KontaktyGetPayload<P extends {
    populate?: unknown;
} = {}> = Kontakty & (P extends {
    populate: infer Pop;
} ? Pop extends '*' | true ? {
    localizations?: Kontakty[];
    seo?: SharedSeo;
    content?: SharedTekstovyjBlokDz[];
} : Pop extends readonly (infer _)[] ? {
    localizations?: 'localizations' extends Pop[number] ? Kontakty[] : never;
    seo?: 'seo' extends Pop[number] ? SharedSeo : never;
    content?: 'content' extends Pop[number] ? SharedTekstovyjBlokDz[] : never;
} : {
    localizations?: 'localizations' extends keyof Pop ? _ApplyFields<Pop['localizations'] extends {
        populate: infer NestedPop;
    } ? KontaktyGetPayload<{
        populate: NestedPop;
    }> : Kontakty, Kontakty, Pop['localizations']>[] : never;
    seo?: 'seo' extends keyof Pop ? _ApplyFields<SharedSeo, SharedSeo, Pop['seo']> : never;
    content?: 'content' extends keyof Pop ? SharedTekstovyjBlokDz[] : never;
} : {});
export type ONasGetPayload<P extends {
    populate?: unknown;
} = {}> = ONas & (P extends {
    populate: infer Pop;
} ? Pop extends '*' | true ? {
    localizations?: ONas[];
    seo?: SharedSeo;
    content?: SharedTekstovyjBlokDz[];
} : Pop extends readonly (infer _)[] ? {
    localizations?: 'localizations' extends Pop[number] ? ONas[] : never;
    seo?: 'seo' extends Pop[number] ? SharedSeo : never;
    content?: 'content' extends Pop[number] ? SharedTekstovyjBlokDz[] : never;
} : {
    localizations?: 'localizations' extends keyof Pop ? _ApplyFields<Pop['localizations'] extends {
        populate: infer NestedPop;
    } ? ONasGetPayload<{
        populate: NestedPop;
    }> : ONas, ONas, Pop['localizations']>[] : never;
    seo?: 'seo' extends keyof Pop ? _ApplyFields<SharedSeo, SharedSeo, Pop['seo']> : never;
    content?: 'content' extends keyof Pop ? SharedTekstovyjBlokDz[] : never;
} : {});
export type PermissionGetPayload<P extends {
    populate?: unknown;
} = {}> = Permission & (P extends {
    populate: infer Pop;
} ? Pop extends '*' | true ? {
    role?: Role | null;
} : Pop extends readonly (infer _)[] ? {
    role?: 'role' extends Pop[number] ? Role | null : never;
} : {
    role?: 'role' extends keyof Pop ? _ApplyFields<Pop['role'] extends {
        populate: infer NestedPop;
    } ? RoleGetPayload<{
        populate: NestedPop;
    }> : Role, Role, Pop['role']> | null : never;
} : {});
export type RoleGetPayload<P extends {
    populate?: unknown;
} = {}> = Role & (P extends {
    populate: infer Pop;
} ? Pop extends '*' | true ? {
    permissions?: Permission[];
    users?: User[];
} : Pop extends readonly (infer _)[] ? {
    permissions?: 'permissions' extends Pop[number] ? Permission[] : never;
    users?: 'users' extends Pop[number] ? User[] : never;
} : {
    permissions?: 'permissions' extends keyof Pop ? _ApplyFields<Pop['permissions'] extends {
        populate: infer NestedPop;
    } ? PermissionGetPayload<{
        populate: NestedPop;
    }> : Permission, Permission, Pop['permissions']>[] : never;
    users?: 'users' extends keyof Pop ? _ApplyFields<Pop['users'] extends {
        populate: infer NestedPop;
    } ? UserGetPayload<{
        populate: NestedPop;
    }> : User, User, Pop['users']>[] : never;
} : {});
export type UserGetPayload<P extends {
    populate?: unknown;
} = {}> = User & (P extends {
    populate: infer Pop;
} ? Pop extends '*' | true ? {
    role?: Role | null;
} : Pop extends readonly (infer _)[] ? {
    role?: 'role' extends Pop[number] ? Role | null : never;
} : {
    role?: 'role' extends keyof Pop ? _ApplyFields<Pop['role'] extends {
        populate: infer NestedPop;
    } ? RoleGetPayload<{
        populate: NestedPop;
    }> : Role, Role, Pop['role']> | null : never;
} : {});
/** String filter operators */
export interface StringFilterOperators {
    $eq?: string;
    $eqi?: string;
    $ne?: string;
    $nei?: string;
    $in?: string[];
    $notIn?: string[];
    $contains?: string;
    $notContains?: string;
    $containsi?: string;
    $notContainsi?: string;
    $startsWith?: string;
    $startsWithi?: string;
    $endsWith?: string;
    $endsWithi?: string;
    $null?: boolean;
    $notNull?: boolean;
}
/** Number filter operators */
export interface NumberFilterOperators {
    $eq?: number;
    $ne?: number;
    $lt?: number;
    $lte?: number;
    $gt?: number;
    $gte?: number;
    $in?: number[];
    $notIn?: number[];
    $between?: [number, number];
    $null?: boolean;
    $notNull?: boolean;
}
/** Boolean filter operators */
export interface BooleanFilterOperators {
    $eq?: boolean;
    $ne?: boolean;
    $null?: boolean;
    $notNull?: boolean;
}
/** Date filter operators (dates are strings in Strapi) */
export interface DateFilterOperators {
    $eq?: string;
    $ne?: string;
    $lt?: string;
    $lte?: string;
    $gt?: string;
    $gte?: string;
    $in?: string[];
    $notIn?: string[];
    $between?: [string, string];
    $null?: boolean;
    $notNull?: boolean;
}
/** ID filter operators (for relations) */
export interface IdFilterOperators {
    $eq?: number | string;
    $ne?: number | string;
    $in?: (number | string)[];
    $notIn?: (number | string)[];
    $null?: boolean;
    $notNull?: boolean;
}
/** Relation filter - filter by nested fields */
export type RelationFilter<T> = {
    id?: number | IdFilterOperators;
    documentId?: string | StringFilterOperators;
} & {
    [K in keyof T]?: T[K] extends string ? string | StringFilterOperators : T[K] extends number ? number | NumberFilterOperators : T[K] extends boolean ? boolean | BooleanFilterOperators : any;
};
/** Logical operators for combining filters */
export interface LogicalOperators<T> {
    $and?: T[];
    $or?: T[];
    $not?: T;
}
/** Sort direction */
export type SortDirection = 'asc' | 'desc';
/** Sort option - can be a field name or field:direction */
export type SortOption<T> = (keyof T & string) | `${keyof T & string}:${SortDirection}`;
/** Typed query parameters */
export interface TypedQueryParams<TEntity, TFilters = Record<string, any>, TPopulate = any> {
    /** Type-safe filters */
    filters?: TFilters;
    /** Sort by field(s) */
    sort?: SortOption<TEntity> | SortOption<TEntity>[];
    /** Pagination options */
    pagination?: {
        page?: number;
        pageSize?: number;
        limit?: number;
        start?: number;
    };
    /** Populate relations */
    populate?: TPopulate;
    /** Select specific fields */
    fields?: (keyof TEntity)[];
}
/** Type-safe filters for Glavnaya */
export interface GlavnayaFilters extends LogicalOperators<GlavnayaFilters> {
    id?: number | IdFilterOperators;
    documentId?: string | StringFilterOperators;
    title?: string | StringFilterOperators;
    locale?: string | StringFilterOperators;
    localizations?: {
        id?: number | IdFilterOperators;
        documentId?: string | StringFilterOperators;
        [key: string]: any;
    };
}
/** Type-safe filters for Kontakty */
export interface KontaktyFilters extends LogicalOperators<KontaktyFilters> {
    id?: number | IdFilterOperators;
    documentId?: string | StringFilterOperators;
    title?: string | StringFilterOperators;
    locale?: string | StringFilterOperators;
    localizations?: {
        id?: number | IdFilterOperators;
        documentId?: string | StringFilterOperators;
        [key: string]: any;
    };
}
/** Type-safe filters for ONas */
export interface ONasFilters extends LogicalOperators<ONasFilters> {
    id?: number | IdFilterOperators;
    documentId?: string | StringFilterOperators;
    title?: string | StringFilterOperators;
    locale?: string | StringFilterOperators;
    localizations?: {
        id?: number | IdFilterOperators;
        documentId?: string | StringFilterOperators;
        [key: string]: any;
    };
}
/** Type-safe filters for Permission */
export interface PermissionFilters extends LogicalOperators<PermissionFilters> {
    id?: number | IdFilterOperators;
    documentId?: string | StringFilterOperators;
    action?: string | StringFilterOperators;
    role?: {
        id?: number | IdFilterOperators;
        documentId?: string | StringFilterOperators;
        [key: string]: any;
    };
}
/** Type-safe filters for Role */
export interface RoleFilters extends LogicalOperators<RoleFilters> {
    id?: number | IdFilterOperators;
    documentId?: string | StringFilterOperators;
    name?: string | StringFilterOperators;
    description?: string | StringFilterOperators;
    type?: string | StringFilterOperators;
    permissions?: {
        id?: number | IdFilterOperators;
        documentId?: string | StringFilterOperators;
        [key: string]: any;
    };
    users?: {
        id?: number | IdFilterOperators;
        documentId?: string | StringFilterOperators;
        [key: string]: any;
    };
}
/** Type-safe filters for User */
export interface UserFilters extends LogicalOperators<UserFilters> {
    id?: number | IdFilterOperators;
    documentId?: string | StringFilterOperators;
    username?: string | StringFilterOperators;
    email?: string | StringFilterOperators;
    provider?: string | StringFilterOperators;
    confirmed?: boolean | BooleanFilterOperators;
    blocked?: boolean | BooleanFilterOperators;
    role?: {
        id?: number | IdFilterOperators;
        documentId?: string | StringFilterOperators;
        [key: string]: any;
    };
}
export {};
