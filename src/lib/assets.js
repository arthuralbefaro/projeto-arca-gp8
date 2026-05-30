export const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function assetPath(path) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${APP_BASE_PATH}${normalizedPath}`.replace(/\/{2,}/g, '/');
}
