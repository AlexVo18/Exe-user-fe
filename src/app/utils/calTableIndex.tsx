export function calTableIndex(
  currentPage: number,
  index: number,
  itemsPerPage: number
) {
  return currentPage !== 1 ? (currentPage - 1) * itemsPerPage + index + 1 : index + 1;
}
