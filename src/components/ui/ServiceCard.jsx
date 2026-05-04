import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({
                                        icon: Icon,
                                        title,
                                        description,
                                        href,
                                    }) {
    return (
        <div className="arca-feature-card">
            <div className="arca-feature-icon">
                <Icon size={24} />
            </div>

            <h3 className="h5 fw-bold">
                {title}
            </h3>

            <p className="text-muted">
                {description}
            </p>

            <Link href={href} className="arca-small-link text-decoration-none">
                Acessar <ArrowRight size={16} />
            </Link>
        </div>
    );
}