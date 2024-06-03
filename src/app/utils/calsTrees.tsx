export function calsTrees(money: number | 0) {
  if (money >= 150000) {
    return money / 150000;
  }
  return 0;
}
