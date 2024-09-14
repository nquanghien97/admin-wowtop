export function dateToNow(startDate: string) {
  const [day, month, year] = startDate.split('-').map(Number); // Tách ngày, tháng, năm
  const start = new Date(year, month - 1, day); // Chuyển thành đối tượng Date (lưu ý tháng bắt đầu từ 0)
  const now = new Date(); // Ngày hiện tại
  
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  
  
  // Điều chỉnh khi ngày hiện tại nhỏ hơn ngày bắt đầu
  if (days < 0) {
      months--;
      const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += previousMonth.getDate();
  }
  
  // Điều chỉnh khi tháng hiện tại nhỏ hơn tháng bắt đầu
  if (months < 0) {
      years--;
      months += 12;
  }

  return `${years} năm, ${months} tháng, ${days} ngày`;
}