import type { BlocksContent, SharedTekstovyjBlokDz } from '~~/cms';

/**
 * Структурный DTO — общий для всех 4 about single types
 * (ONas, Kontakty, Dostavka, GarantiyaIOplata).
 * Все они имеют идентичную форму после populate: '*'.
 */
export interface AboutPageDto {
    title: string;
    seo?: { title: string; description: string } | null;
    content?: SharedTekstovyjBlokDz[] | null;
}

export interface AboutPageBlockModel {
    title: string | null;
    content: BlocksContent;
}

export interface AboutPageModel {
    title: string;
    seo: { title: string; description: string };
    content: AboutPageBlockModel[];
}