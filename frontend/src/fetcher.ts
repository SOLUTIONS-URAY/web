export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

class FetcherError extends Error {
    info: unknown;
    status?: number;

    constructor(error: string, status?: number, info?: unknown) {
        super(error);
        this.status = status;
        this.info = info;
    }

}

export const fetcher = async <T = unknown>(uri: string, data = {}, method: HttpMethod = HttpMethod.GET): Promise<T> => {
    const unparsed_response = await fetch("/api/v1" + uri, {
        headers: {
            "Content-Type": "application/json",
        },
        method,
        body: method !== HttpMethod.GET ? JSON.stringify(data) : undefined,
    });

    let resp: T & { message?: string; error_code?: string };

    try {
        resp = await unparsed_response.json();
    } catch (e) {
        console.error();
        throw new Error(unparsed_response.statusText);
    }

    if (!unparsed_response.ok) {
        console.error("Произошла ошибка при получении данных. URI: " + uri);
        throw new FetcherError("Проблема при попытка запроса " + uri, unparsed_response.status, resp.message || unparsed_response.text())
    }

    return resp;
};
