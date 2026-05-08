import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

export default function AlertBox({ type = 'info', title, children }) {
    const icons = {
        info: Info,
        success: CheckCircle2,
        warning: AlertCircle,
    };

    const Icon = icons[type] || Info;

    return (
        <div className={`arca-alert arca-alert-${type}`} role="alert">
            <Icon size={22} className="flex-shrink-0" />

            <div>
                {title && <strong className="d-block mb-1">{title}</strong>}
                <div>{children}</div>
            </div>
        </div>
    );
}