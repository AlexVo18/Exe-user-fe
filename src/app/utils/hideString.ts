export function hideString(str: string): string {
  const firstTwo = str.slice(0, 2);
  const lastTwo = str.slice(-2);
  const asterisks = "*****"
  return firstTwo + asterisks + lastTwo;
}
