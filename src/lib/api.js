import {
    MOCK_MODE,
    MOCK_USER,
    mockConsultar,
    mockListar,
    mockObter,
    mockStats,
    mockAlterarStatus,
    mockCriar,
} from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const CSRF_COOKIE = 'arca_csrf';

function getCookie(name) {
    if (typeof document === 'undefined') return null;

    return document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`))
        ?.split('=')[1] ?? null;
}

function isUnsafeMethod(method) {
    return !['GET', 'HEAD', 'OPTIONS'].includes(String(method || 'GET').toUpperCase());
}

function createCorrelationId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }

    return `arca-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function request(path, options = {}, retryOnUnauthorized = true) {
    const method = options.method || 'GET';
    const csrfToken = getCookie(CSRF_COOKIE);
    const headers = {
        'Content-Type': 'application/json',
        'X-Correlation-ID': createCorrelationId(),
        ...(isUnsafeMethod(method) && csrfToken ? { 'X-ARCA-CSRF': decodeURIComponent(csrfToken) } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        method,
        headers,
        credentials: 'include',
    });

    if (response.status === 401
        && retryOnUnauthorized
        && path !== '/api/auth/login'
        && path !== '/api/auth/refresh') {
        await authApi.refresh();
        return request(path, options, false);
    }

    const body = await response.json().catch(() => null);

    if (!response.ok) {
        const message = body?.message || `Erro ${response.status}`;
        throw new ApiError(response.status, message, body?.errorCode ?? null, body?.errors ?? []);
    }

    return body?.data ?? body;
}

export class ApiError extends Error {
    constructor(status, message, errorCode = null, errors = []) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
        this.errors = errors;
    }
}

export const authApi = {
    login: (email, senha) =>
        MOCK_MODE
            ? Promise.resolve(MOCK_USER)
            : request('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, senha }),
            }),

    refresh: () =>
        MOCK_MODE
            ? Promise.resolve(MOCK_USER)
            : request('/api/auth/refresh', {
                method: 'POST',
            }, false),

    logout: () =>
        MOCK_MODE
            ? Promise.resolve({})
            : request('/api/auth/logout', {
                method: 'POST',
            }, false),

    me: () => (MOCK_MODE ? Promise.resolve(MOCK_USER) : request('/api/auth/me')),

    isAuthenticated: async () => {
        try {
            await authApi.me();
            return true;
        } catch {
            return false;
        }
    },

    saveToken: () => {},
};

export const solicitacoesApi = {
    criar: (data) =>
        MOCK_MODE
            ? Promise.resolve(mockCriar(data))
            : request('/api/solicitacoes', {
                method: 'POST',
                body: JSON.stringify(data),
            }),

    consultar: ({ protocolo, cpf }) =>
        MOCK_MODE
            ? Promise.resolve(mockConsultar({ protocolo, cpf }))
            : request('/api/solicitacoes/consulta', {
                method: 'POST',
                body: JSON.stringify({ protocolo, cpf }),
            }),
};

export const adminApi = {
    listar: (filtros = {}, page = 0, size = 20) => {
        if (MOCK_MODE) return Promise.resolve(mockListar(filtros, page, size));
        const params = new URLSearchParams({ page, size });
        if (filtros.status) params.set('status', filtros.status);
        if (filtros.bairro) params.set('bairro', filtros.bairro);
        if (filtros.tipoSolicitante) params.set('tipoSolicitante', filtros.tipoSolicitante);
        return request(`/api/admin/solicitacoes?${params}`);
    },

    obter: (id) => (MOCK_MODE ? Promise.resolve(mockObter(id)) : request(`/api/admin/solicitacoes/${id}`)),

    alterarStatus: (id, status, nota = '') =>
        MOCK_MODE
            ? Promise.resolve(mockAlterarStatus(id, status))
            : request(`/api/admin/solicitacoes/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status, nota }),
            }),

    stats: () => (MOCK_MODE ? Promise.resolve(mockStats()) : request('/api/admin/stats')),
};
