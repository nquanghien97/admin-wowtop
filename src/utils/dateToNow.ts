export function dateToNow(startDate: string) {
  const start = new Date(startDate);
  const today = new Date();
  
  let years = today.getFullYear() - start.getFullYear();
  let months = today.getMonth() - start.getMonth();
  let days = today.getDate() - start.getDate();
  
  // Điều chỉnh khi ngày hiện tại nhỏ hơn ngày bắt đầu
  if (days < 0) {
      months--;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonth.getDate();
  }
  
  // Điều chỉnh khi tháng hiện tại nhỏ hơn tháng bắt đầu
  if (months < 0) {
      years--;
      months += 12;
  }

  return `${years} năm, ${months} tháng, ${days} ngày`;
}