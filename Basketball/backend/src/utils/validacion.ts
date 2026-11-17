export const esTextoValido = (
  valor: unknown,
  requerido = true
): boolean => {
  if (valor === undefined || valor === null) {
    return !requerido;
  }

  return typeof valor === 'string' && valor.trim().length > 0;
};

export const esNumeroValido = (
  valor: unknown,
  requerido = true
): boolean => {
  if (valor === undefined || valor === null || valor === '') {
    return !requerido;
  }

  return typeof valor === 'number' && Number.isFinite(valor);
};
