export function arrays_are_equal<T>(array_one: T[], array_two: T[]): boolean {
    // Check if the arrays have the same length
    if (array_one.length !== array_two.length) {
      return false;
    }
  
    // Check if each element at corresponding positions is equal
    for (let i = 0; i < array_one.length; i++) {
      if (array_one[i] !== array_two[i]) {
        return false;
      }
    }
  
    // If all elements are equal, the arrays are equal
    return true;
  }