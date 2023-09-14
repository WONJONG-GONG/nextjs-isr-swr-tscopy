import { HttpHeader } from "@/src/types";

// #region API Data Fetching
export const BASEURL: string = 'https://hoge.microcms.io/api/v1';
export const REQUEST_HEADER: HttpHeader = {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY ?? '',
};
// #endregion