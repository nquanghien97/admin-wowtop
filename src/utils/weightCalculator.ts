import { Gender } from "../entities/HeightCalculator";
import { ageCalculator } from "./ageCalculator";

export function weightCalculator({ currentWeight, date_of_birth, gender } : { currentWeight: number, date_of_birth: string, gender: Gender}) {
  const currentYear = ageCalculator(date_of_birth).years;
  const currentMonth = ageCalculator(date_of_birth).months;
  const weightIncreasePerYear = {
    GIRL: [3.2, 5.7, 2.6, 2.4, 2.2, 2.1, 2.0, 2.2, 2.6, 3.2, 3.7, 4.1, 4.0, 5.0, 5.0, 3.5, 2.0, 1.0, 1.0, 0.4, 1.0],
    BOY:  [3.3, 6.3, 2.6, 2.1, 2.0, 2.0, 2.2, 2.4, 2.5, 2.7, 3.1, 3.8, 3.0, 5.0, 6.5, 6.0, 5.0, 4.0, 2.5, 2.0, 1.4]
    //      0    1    2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18   19   20  
  };

  if (currentYear < 0 || currentYear > 20 || currentMonth < 0 || currentMonth > 11) {
    return null; // Invalid year or month
  }

  const weightIncrease = gender === "BOY" ? weightIncreasePerYear.BOY : weightIncreasePerYear.GIRL;
  const weightInNextYear = +currentWeight + (weightIncrease[currentYear+1] * (12 - currentMonth)) / 12;
  let finalWeight = weightInNextYear
  for(let year = currentYear + 2; year <= 20; year++) {
    finalWeight += weightIncrease[year]
  }
  return finalWeight.toFixed(1);
}

export function dataCurrentWeight(listWeight: number[], date_of_birth: string) {
  const currentYear = ageCalculator(date_of_birth).years;
  const currentMonth = ageCalculator(date_of_birth).months;
  const finalWeight = listWeight[currentYear] + (listWeight[currentYear + 1] - listWeight[currentYear])/12*currentMonth
  return Number(finalWeight.toFixed(1));
}