export function calsTrees(money: number | 0) {
  if (money >= 150000) {
    return money / 150000;
  }
  return 0;
}

export function calsMoney(tree: number | 0) {
  return tree * 150000;
}
