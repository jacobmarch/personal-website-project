function isValidDate(value) {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function parseFrontmatterDate(dateInput) {
  if (!dateInput) {
    return null;
  }

  if (dateInput instanceof Date) {
    return isValidDate(dateInput) ? new Date(dateInput.getTime()) : null;
  }

  const value = String(dateInput).trim();
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (match) {
    const year = Number(match[1]);
    const monthIndex = Number(match[2]) - 1;
    const day = Number(match[3]);
    const localDate = new Date(year, monthIndex, day, 12, 0, 0, 0);
    return isValidDate(localDate) ? localDate : null;
  }

  const parsed = new Date(value);
  return isValidDate(parsed) ? parsed : null;
}

export function dateSortValue(dateInput) {
  const parsed = parseFrontmatterDate(dateInput);
  return parsed ? parsed.getTime() : 0;
}

export function formatDisplayDate(dateInput, locale = "en-US") {
  const parsed = parseFrontmatterDate(dateInput);

  if (!parsed) {
    return "Draft";
  }

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(parsed);
}
