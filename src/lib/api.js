const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const TOKEN_KEY = 'arca-jwt-token';

function getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
}

function removeToken() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        removeToken();
        throw new ApiError(401, 'Sessão expirada. Faça login novamente.');
    }

    const body = await response.json().catch(() => null);

    if (!response.ok) {
        const message = body?.message || `Erro ${response.status}`;
        throw new ApiError(response.status, message);
    }

    return body?.data ?? body;
}

export class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export const authApi = {
    login: (email, senha) =>
        request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, senha }),
        }),

    logout: () => removeToken(),

    isAuthenticated: () => Boolean(getToken()),

    saveToken: (token) => setToken(token),
};

export const solicitacoesApi = {
    criar: (data) =>
        request('/api/solicitacoes', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    consultar: (query) =>
        request(`/api/solicitacoes/consulta?q=${encodeURIComponent(query)}`),
};

export const adminApi = {
    listar: (filtros = {}, page = 0, size = 20) => {
        const params = new URLSearchParams({ page, size });
        if (filtros.status) params.set('status', filtros.status);
        if (filtros.bairro) params.set('bairro', filtros.bairro);
        if (filtros.tipoSolicitante) params.set('tipoSolicitante', filtros.tipoSolicitante);
        return request(`/api/admin/solicitacoes?${params}`);
    },

    obter: (id) => request(`/api/admin/solicitacoes/${id}`),

    alterarStatus: (id, status, nota = '') =>
        request(`/api/admin/solicitacoes/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, nota }),
        }),

    stats: () => request('/api/admin/stats'),
};
