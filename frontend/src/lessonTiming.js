const parseTimeToMinutes = (value) => {
  const time24Hour = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);
  if (time24Hour) {
    return Number(time24Hour[1]) * 60 + Number(time24Hour[2]);
  }

  const time12Hour = /^(0?[1-9]|1[0-2]):([0-5]\d)\s*([AP])\.?M\.?$/i.exec(
    value.trim(),
  );
  if (!time12Hour) return null;

  const hour = Number(time12Hour[1]) % 12;
  const isAfternoon = time12Hour[3].toUpperCase() === "P";
  return (hour + (isAfternoon ? 12 : 0)) * 60 + Number(time12Hour[2]);
};

export const formatLessonTime = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

export const isLessonInProgress = (lesson, now = new Date()) => {
  if (
    !lesson?.data ||
    typeof lesson.horaInicio !== "string" ||
    typeof lesson.horaFim !== "string"
  )
    return false;

  const startMinutes = parseTimeToMinutes(lesson.horaInicio);
  const endMinutes = parseTimeToMinutes(lesson.horaFim);
  if (startMinutes === null || endMinutes === null) return false;

  const scheduledDate = new Date(lesson.data);
  if (Number.isNaN(scheduledDate.getTime())) return false;

  // Usa o dia da aula com as horas guardadas para comparar o intervalo atual.
  const date = scheduledDate.toISOString().slice(0, 10);
  const startsAt = new Date(`${date}T00:00:00`);
  startsAt.setMinutes(startMinutes);
  const endsAt = new Date(`${date}T00:00:00`);
  endsAt.setMinutes(endMinutes);

  // O início é inclusivo e o fim exclusivo, evitando marcar como ativa uma aula terminada.
  return now >= startsAt && now < endsAt;
};
