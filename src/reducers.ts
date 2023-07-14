export const reduceAdditionalPlaceholders = (multilineInput: string[]) =>
  multilineInput.reduce<Record<string, string>>((acc, input) => {
    const indexOfFirstEquals = input.indexOf("=");
    if (indexOfFirstEquals < 0) {
      return acc;
    }
    const key = input.substring(0, indexOfFirstEquals);
    const value = input.substring(indexOfFirstEquals + 1);
    if (!key) {
      return acc;
    }
    return { ...acc, [key]: value };
  }, {});
