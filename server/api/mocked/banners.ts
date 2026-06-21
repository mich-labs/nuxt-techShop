import type { IRecordBanner } from "~~/types/records/banner.record"

const mocked: IRecordBanner[] = [
    {
        link: '/products/iphone-15-pro',
        imgPath: '/mocked/Gemini_Generated_Image_atxrqsatxrqsatxr.png',
        alt: 'iphone-15-pro'
    },
    {
        link: '/products/galaxy-s24-ultra',
        imgPath: '/mocked/Gemini_Generated_Image_4rg8tk4rg8tk4rg8.png',
        alt: 'galaxy-s24-ultra',
    },
    {
        link: '/products/google-pixel-9',
        imgPath: '/mocked/Gemini_Generated_Image_tved5otved5otved.png',
        alt: 'google-pixel-9'
    },
    {
        link: '/products/galaxy-tab-s10-plus',
        imgPath: '/mocked/Gemini_Generated_Image_7a2nmc7a2nmc7a2n.png',
        alt: 'galaxy-tab-s10-plus',
    },
    {
        link: '/products/fiio-fh7',
        imgPath: '/mocked/Gemini_Generated_Image_n3yzt0n3yzt0n3yz.png',
        alt: 'fiio-fh7'
    },
];

export default defineEventHandler(async (event) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mocked
})