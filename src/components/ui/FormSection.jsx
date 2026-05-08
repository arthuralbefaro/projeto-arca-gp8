export default function FormSection({ title, description, children }) {
    return (
        <section className="arca-form-section">
            <h2>{title}</h2>

            {description && <p>{description}</p>}

            {children}
        </section>
    );
}