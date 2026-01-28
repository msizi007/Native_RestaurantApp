export const formatToSAST = (isoString: string) => {
  const date = new Date(isoString);

  // Intl.DateTimeFormat is the most reliable way to handle timezones in React Native
  const hours = date.toLocaleTimeString("en-ZA", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Africa/Johannesburg",
  });

  const minutes = date.toLocaleTimeString("en-ZA", {
    minute: "2-digit",
    timeZone: "Africa/Johannesburg",
  });

  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}T${hours}h${minutes}`; // Results in "14h46"
};
