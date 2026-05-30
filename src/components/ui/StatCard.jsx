export default function StatCard({ title, value, description, icon: Icon }) {
    return (
        <div className="arca-stat-card">
            <div>
                <span>{title}</span>
                <strong>{value}</strong>
                {description && <p>{description}</p>}
            </div>

            {Icon && (
                <div className="arca-stat-icon" aria-hidden="true">
                    <Icon size={24} />
                </div>
            )}
        </div>
    );
}
