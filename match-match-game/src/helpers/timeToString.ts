export const timeToString = (time: number | null) => {
  if (time === null) {
    return null;
  }
  if (time === 0) {
    return '00:00';
  }
  const seconds = Math.round(time % 60);
  const minutes = Math.round((time - seconds) / 60);
  const secondsStr = `${seconds}`.length < 2 ? `0${seconds}` : `${seconds}`;
  const minutesStr = `${minutes}`.length < 2 ? `0${minutes}` : `${minutes}`;
  return `${minutesStr}:${secondsStr}`;
};
