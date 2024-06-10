export function formatDate(dateString: string): string {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Extract day, month, and year from the Date object
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  // Format the date as dd-mm-yyyy
  return `${day}-${month}-${year}`;
}
