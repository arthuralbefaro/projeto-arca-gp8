export default function StatusBadge({ status }) {
    const normalizedStatus = status || "Pendente";

    return (
        <span className="arca-status-badge">
            {normalizedStatus}
        </span>
    );
}