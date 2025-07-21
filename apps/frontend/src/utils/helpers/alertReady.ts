export function readyAlert(
  e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>
): void {
  e.preventDefault();
  alert("준비중입니다.");
}
