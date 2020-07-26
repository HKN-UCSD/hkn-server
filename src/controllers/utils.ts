// Casts paramID string to number and throws error if invalid
export const castID = (paramID: string): number => {
  const id = Number(paramID);
  if (isNaN(id)) {
    throw new Error('Invalid id.');
  }
  return id;
};
