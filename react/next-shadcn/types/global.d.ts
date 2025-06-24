// eslint-disable-next-line no-unused-vars
declare type Nullable<T> = T | null
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type PageQuery = {
    pageNum?: number;
    pageSize?: number;
}

declare type ResWithPagination<T = any> = {
    data: T;
    pagination: {
        limit: number;
        page: number;
        total: number;
    };
}