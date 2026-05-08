export default function PageTitle({ badge, title, subtitle, align = 'start' }) {
    const alignmentClass = align === 'center' ? 'text-center mx-auto' : '';

    return (
        <div className="{`mb-5 ${alignmentClass}`}">
            {badge && <span className="arca-badge mb-3">{badge}</span>}

            <h1 className="arca-section-title">{title}</h1>

            {subtitle && (
                <p className="arca-section-subtitle">{subtitle}</p>
            )}
        </div>
    );
}