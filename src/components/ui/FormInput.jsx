export default function FormInput({
                                      label,
                                      name,
                                      type = 'text',
                                      placeholder = '',
                                      required = false,
                                      as = 'input',
                                      children,
                                  }) {
    return (
        <div className="mb-3">
            <label className={`form-label ${required ? 'required' : ''}`}>
                {label}
            </label>

            {as === 'select' ? (
                <select name={name} className="form-select" required={required}>
                    {children}
                </select>
            ) : (
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className="form-control"
                    required={required}
                />
            )}
        </div>
    );
}