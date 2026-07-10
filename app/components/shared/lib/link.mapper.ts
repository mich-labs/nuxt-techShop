import type { SharedSsylka } from "~~/cms"
import type { AppLinkProps } from "../ui/AppLink.vue"


export default function mapLink(dto: SharedSsylka | null | undefined, fallback = '/'): AppLinkProps {
    return {
        href: dto?.url || fallback,
        isExternal: dto?.isExternal ?? false
    }
}