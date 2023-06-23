import { hour } from "./constants";

export const duration = (dur) => {
  if (dur < hour) return `${dur}м`;
  if (dur >= hour) {
    const hours = (Math.floor(dur/hour));
    const minutes = dur % hour;
    return `${hours}ч ${minutes}м`;
  }
  return false;
}
