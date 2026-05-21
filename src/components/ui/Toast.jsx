"use client";

import { CheckCircle2, X } from "lucide-react";

export default function Toast({ message, onClose }) {
    if (!message) return null;

    return (
        <div className="arca-toast">
            <CheckCircle2 size={20} />
            <span>{message}</span>

            <button type="button" onClose={onClose} aria-label="Fechar aviso">
                <X size={16} />
            </button>
        </div>
    );
}