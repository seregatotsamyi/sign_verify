export function convertToLocalTime(dateString: string) {
  try {
    // 1. Извлекаем компоненты даты и времени и часовой пояс:
    const parts = dateString.match(/(\d{2}):(\d{2})\s(\d{2})\.(\d{2})\.(\d{4})\s\(UTC\s([+-]\d{2}:\d{2})\)/);

    if (!parts) {
      throw new Error("Invalid date format");
    }

    const [, hours, minutes, day, month, year] = parts;

    // 2. Создаем Date объект в UTC:
    //@ts-ignore
    const dateUTC = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    // 3. Форматируем с учетом местного времени:
    const formatter = new Intl.DateTimeFormat(undefined, {
      // Используем локаль браузера по умолчанию
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Используем 24-часовой формат
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Явно получаем таймзону браузера
    });

    const formattedDate = formatter.format(dateUTC).replace(/(\d+)\/(\d+)\/(\d+),?/, "$3.$1.$2");

    return formattedDate;
  } catch (error) {
    console.error("Error converting date:", error);
    return null;
  }
}

export const formatter = new Intl.DateTimeFormat("ru-RU", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
