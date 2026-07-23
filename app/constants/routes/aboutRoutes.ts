import type { TRoutes } from '~/components/shared/lib/types/routeLinks.type';


export const ABOUT_ROUTES: TRoutes = [
    { name: 'about', to: '/about', title: 'о магазине' },
    { name: 'delivery', to: '/about/delivery', title: 'доставка' },
    { name: 'varanty-payment', to: '/about/varanty-payment', title: 'гарантия и оплата' },
    { name: 'contacts', to: '/about/contacts', title: 'контакты' },
]