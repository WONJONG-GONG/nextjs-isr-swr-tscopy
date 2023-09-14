export const BASEURL: string = 'https://hoge.microcms.io/api/v1';
export const REQUEST_HEADER: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY ?? '',
};