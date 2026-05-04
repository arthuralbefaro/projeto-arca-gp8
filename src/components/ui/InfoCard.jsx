export default function InfoCard({ title, description, children }) {
    return (
        <div className="arca-card h-100">
            <h3 className="h5 fw-bold mb-2">{title}</h3>

            <p className="text-muted mb-0">
                {description}
            </p>

            {children && (
                <div className="mt-3">
                    {children}
                </div>
            )}
        </div>
    );
}