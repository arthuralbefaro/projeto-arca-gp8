export default function FormInput({
  label,
  name,
  type = 'text',
  placeholder = '',
  required = false,
  as = 'input',
  helper,
  children,
  ...props
}) {
  const inputId = props.id || name;
  const helperId = helper ? `${inputId}-helper` : undefined;

  return (
    <div className="mb-3">
      {label && (
        <label className={`form-label ${required ? 'required' : ''}`} htmlFor={inputId}>
          {label}
        </label>
      )}

      {as === 'select' ? (
        <select
          id={inputId}
          name={name}
          className="form-select"
          required={required}
          aria-describedby={helperId}
          {...props}
        >
          {children}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          className="form-control"
          placeholder={placeholder}
          required={required}
          aria-describedby={helperId}
          {...props}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          className="form-control"
          placeholder={placeholder}
          required={required}
          aria-describedby={helperId}
          {...props}
        />
      )}

      {helper && (
        <small id={helperId} className="arca-helper-text">
          {helper}
        </small>
      )}
    </div>
  );
}
