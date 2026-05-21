import {
    buildProtocol,
    calculatePriorityScore,
    DEMO_REQUESTS,
    getPriorityLabel,
    onlyNumbers,
    STORAGE_KEYS,
} from './arca-data';

function canUseStorage() {
    return typeof window !== 'undefined' && window.localStorage;
}

function createId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `arca-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
}

export function getRequests() {
    if (!canUseStorage()) return [];

    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.requests) || '[]');
    } catch {
        return [];
    }
}

export function saveRequests(requests) {
    if (!canUseStorage()) return;
    localStorage.setItem(STORAGE_KEYS.requests, JSON.stringify(requests));
}

export function addRequest(data) {
    const now = new Date().toISOString();
    const score = calculatePriorityScore(data);

    const request = {
        ...data,
        id: createId(),
        protocol: buildProtocol(),
        service:
            data.service ||
            (data.type === 'castracao'
                ? 'Solicitação de castração'
                : 'Cadastro de tutor/protetor'),
        status: 'recebido',
        priorityScore: score,
        priorityLabel: getPriorityLabel(score),
        createdAt: now,
        history: [
            {
                status: 'recebido',
                date: now,
                note: 'Solicitação registrada no sistema.',
            },
        ],
    };

    const current = getRequests();
    const updated = [request, ...current];

    saveRequests(updated);

    return request;
}

export function updateRequestStatus(id, status, note = 'Status atualizado pela equipe administrativa.') {
    const requests = getRequests();
    const now = new Date().toISOString();

    const updated = requests.map((item) => {
        if (item.id !== id) return item;

        return {
            ...item,
            status,
            history: [
                ...(item.history || []),
                {
                    status,
                    date: now,
                    note,
                },
            ],
        };
    });

    saveRequests(updated);

    return updated;
}

export function seedDemoRequests() {
    const current = getRequests();
    const currentIds = new Set(current.map((item) => item.id));
    const missing = DEMO_REQUESTS.filter((item) => !currentIds.has(item.id));
    const updated = [...missing, ...current];

    saveRequests(updated);

    return updated;
}

export function clearRequests() {
    saveRequests([]);
}

export function findRequestsByQuery(query) {
    const value = String(query || '').trim().toLowerCase();
    const numeric = onlyNumbers(value);

    if (!value) return [];

    const stored = getRequests();
    const source = stored.length > 0 ? stored : DEMO_REQUESTS;

    return source.filter((item) => {
        const fields = [
            item.protocol,
            item.tutorName,
            item.email,
            item.cpf,
            item.phone,
            item.bairro,
            item.animalName,
        ]
            .filter(Boolean)
            .map((field) => String(field).toLowerCase());

        const hasTextMatch = fields.some((field) => field.includes(value));

        const hasNumericMatch =
            numeric.length >= 3 &&
            [item.cpf, item.phone]
                .filter(Boolean)
                .map((field) => onlyNumbers(field))
                .some((field) => field.includes(numeric));

        return hasTextMatch || hasNumericMatch;
    });
}

export function setAdminAuth(value) {
    if (!canUseStorage()) return;
    localStorage.setItem(STORAGE_KEYS.adminAuth, value ? 'true' : 'false');
}

export function isAdminAuthenticated() {
    if (!canUseStorage()) return false;
    return localStorage.getItem(STORAGE_KEYS.adminAuth) === 'true';
}

export function logoutAdmin() {
    setAdminAuth(false);
}