export function ageCalculator(birthDateString: string): number {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  // Tính số năm và tháng
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Điều chỉnh nếu tháng hiện tại ít hơn tháng sinh
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  // Nếu ngày hiện tại ít hơn ngày sinh, giảm 1 tháng
  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Số ngày trong tháng trước
  }

  // Chuyển đổi tháng sang phần thập phân của năm
  const preciseAge = years + months / 12;

  return parseFloat(preciseAge.toFixed(1)); // Làm tròn đến 1 chữ số thập phân
}
