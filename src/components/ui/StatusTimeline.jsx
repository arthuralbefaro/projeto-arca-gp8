import { CheckCircle2, Circle, XCircle } from 'lucide-react';
import { formatDateBR, getStatusIndex, STATUS_FLOW } from '@/lib/arca-data';

export default function StatusTimeline({ currentStatus, history = [] }) {
    const currentIndex = getStatusIndex(currentStatus);
    const isRejected = currentStatus === 'recusado';

    return (
        <div className="arca-status-timeline">
            {STATUS_FLOW.map((step, index) => {
                const historyItem = history.find((item) => item.status === step.key);
                const isDone = !isRejected && index <= currentIndex;
                const isCurrent = !isRejected && index === currentIndex;

                return (
                    <div
                        className={`arca-status-step ${isDone ? 'is-done' : ''} ${
                            isCurrent ? 'is-current' : ''
                        }`}
                        key={step.key}
                    >
                        <div className="arca-status-icon">
                            {isDone ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                        </div>

                        <div>
                            <strong>{step.label}</strong>
                            <p>{historyItem?.note || step.description}</p>
                            {historyItem?.date && <small>{formatDateBR(historyItem.date)}</small>}
                        </div>
                    </div>
                );
            })}

            {isRejected && (
                <div className="arca-status-step is-rejected">
                    <div className="arca-status-icon">
                        <XCircle size={22} />
                    </div>

                    <div>
                        <strong>Solicitação recusada</strong>
                        <p>A solicitação foi recusada conforme os critérios do programa.</p>
                    </div>
                </div>
            )}
        </div>
    );
}