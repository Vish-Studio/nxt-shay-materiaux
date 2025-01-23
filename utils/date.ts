export const getDayOfWeek = (dateString: string): string => {
  // Return empty state is date is not provided
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return '';
  }

  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return date.toLocaleDateString('en-US', options);
};
