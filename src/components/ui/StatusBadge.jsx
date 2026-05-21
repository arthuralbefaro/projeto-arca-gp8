function getBadgeStyle(status) {
  const styles = {
    'Cadastro recebido': {
      background: '#eef6ff',
      borderColor: '#c7ddf7',
      color: '#174a8b',
    },
    'Em triagem': {
      background: '#fff7e6',
      borderColor: '#ffe0a3',
      color: '#8a5a00',
    },
    'Documentos pendentes': {
      background: '#fff1f1',
      borderColor: '#ffd1d1',
      color: '#a12828',
    },
    Aprovado: {
      background: '#eaf7ef',
      borderColor: '#cbeed7',
      color: '#256f3f',
    },
    'Agendamento disponível': {
      background: '#ecfeff',
      borderColor: '#bae6fd',
      color: '#0f5f70',
    },
    'Atendimento realizado': {
      background: '#f0fdf4',
      borderColor: '#bbf7d0',
      color: '#166534',
    },
    Recusado: {
      background: '#fef2f2',
      borderColor: '#fecaca',
      color: '#991b1b',
    },
  };

  return styles[status] || styles['Cadastro recebido'];
}

export default function StatusBadge({ status }) {
  const normalizedStatus = status || 'Cadastro recebido';

  return (
    <span className="arca-status-badge" style={getBadgeStyle(normalizedStatus)}>
      {normalizedStatus}
    </span>
  );
}
