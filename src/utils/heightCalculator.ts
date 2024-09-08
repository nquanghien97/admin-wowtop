import { Gender } from "../entities/HeightCalculator";

export function heightCalculator(
  currentHeight: number,
  currentAge: number,
  fatherHeight: number,
  motherHeight: number,
  gender: Gender
) {
  // Height increase per year based on the provided table for boys and girls
  const heightIncreasePerYear = {
    GIRL: [0, 12.4, 8.7, 7.6, 6.7, 5.7, 5.7, 5.8, 5.9, 6.1, 6.2, 6.7, 5.6, 3.3, 1.7, 0.6, 0.7, 0.3, 0],
    BOY:  [0, 11.4, 9, 7.2, 6.7, 6, 5.7, 5.6, 5.3, 5.2, 5.3, 6, 6.9, 7.2, 5.8, 3.9, 2.3, 0.9, 0]
  };

  // Ensure the age is within the supported range
  if (currentAge < 0 || currentAge > 20) {
    return null; // Invalid age
  }

  // Determine the height increase array based on gender
  const heightIncrease = gender === Gender.BOY ? heightIncreasePerYear.BOY : heightIncreasePerYear.GIRL;

  // Initialize array to store heights for each age
  const heightsByAge = new Array(21).fill(null);
  
  // Fill in known heights up to current age
  for (let age = 0; age <= currentAge; age++) {
    if (age === currentAge) {
      heightsByAge[age] = currentHeight.toFixed(1);
    } else {
      heightsByAge[age] = (
        currentHeight - heightIncrease.slice(age, currentAge).reduce((sum, val) => sum + val, 0)
      ).toFixed(1);
    }
  }

  let predictedHeight = currentHeight;

  // Calculate growth for future years
  for (let age = currentAge + 1; age <= 20; age++) {
    predictedHeight += heightIncrease[age - 1];  // Add previous year's increase
    heightsByAge[age] = predictedHeight.toFixed(1);
  }

  // Calculate final height at 20 based on parents' height
  let finalHeight;
  if (gender === Gender.BOY) {
    finalHeight = ((fatherHeight + motherHeight) * 1.08) / 2;
  } else {
    finalHeight = ((fatherHeight * 0.923) + motherHeight) / 2;
  }

  // Ensure that height from 18 to 20 is correctly adjusted
  for (let age = 18; age <= 20; age++) {
    heightsByAge[age] = finalHeight.toFixed(1);
  }

  return {
    predictedHeightAt20: heightsByAge[20],
    heightsByAge: heightsByAge
  };
}
