import { Gender } from "../entities/HeightCalculator";
import { ageCalculator } from "./ageCalculator";

export function heightCalculator(
  currentHeight: number,
  currentYear: number,
  currentMonth: number,
  fatherHeight: number,
  motherHeight: number,
  gender: Gender
) {
  // Height increase per year based on the provided table for boys and girls
  const heightIncreasePerYear = {
    GIRL: [0, 12.4, 8.7, 7.6, 6.7, 5.7, 5.7, 5.8, 5.9, 6.1, 6.2, 6.7, 5.6, 3.3, 1.7, 0.6, 0.7, 0.3, 0, 0, 0],
    BOY:  [0, 11.4, 9.0, 7.2, 6.7, 6.0, 5.7, 5.6, 5.3, 5.2, 5.3, 6.0, 6.9, 7.2, 5.8, 3.9, 2.3, 0.9, 0, 0, 0]
  };

  // Ensure the age is within the supported range
  if (currentYear < 0 || currentYear > 20 || currentMonth < 0 || currentMonth > 11) {
    return null; // Invalid year or month
  }

  // Determine the height increase array based on gender
  const heightIncrease = gender === "BOY" ? heightIncreasePerYear.BOY : heightIncreasePerYear.GIRL;
  // Initialize array to store heights for each age
  const heightsByAge = new Array(21).fill('0'); // Default to '0' for all ages initially

  // Tính chiều cao hiện tại theo tỷ lệ số tháng trong năm
  const fractionalHeightIncrease = (heightIncrease[currentYear] * currentMonth) / 12;
  const adjustedCurrentHeight = currentHeight - fractionalHeightIncrease;

  // Đặt chiều cao lúc tuổi hiện tại vào mảng
  heightsByAge[currentYear] = adjustedCurrentHeight.toFixed(1);

  let predictedHeight = adjustedCurrentHeight;

  // Calculate growth for future years starting from the next whole year
  for (let year = currentYear + 1; year <= 20; year++) {
    predictedHeight += heightIncrease[year - 1]; // Add previous year's increase
    heightsByAge[year] = predictedHeight.toFixed(1);
  }

  // Calculate final height at 20 based on parents' height
  let finalHeight;
  if (gender === "BOY") {
    finalHeight = ((+fatherHeight + +motherHeight) * 1.08) / 2;
  } else {
    finalHeight = ((+fatherHeight * 0.923) + +motherHeight) / 2;
  }

  // Ensure that height from 18 to 20 is correctly adjusted
  for (let year = 18; year <= 20; year++) {
    if(finalHeight >= heightsByAge[18]) {
      heightsByAge[year] = finalHeight.toFixed(1);
    }
  }

  return {
    predictedHeightAt20: heightsByAge[20],
    heightsByAge: heightsByAge
  };
}

export function dataCurrentHeight(listHeight: number[], date_of_birth: string) {
  const currentYear = ageCalculator(date_of_birth).years;
  const currentMonth = ageCalculator(date_of_birth).months;
  const finalHeight = listHeight[currentYear] + (listHeight[currentYear + 1] - listHeight[currentYear])/12*currentMonth
  return Number(finalHeight.toFixed(1));
}