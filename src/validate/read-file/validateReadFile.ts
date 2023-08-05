import fs from 'fs';

export const validateReadFile = (): string | undefined => {
  const filePath = process.argv[2];
  try {
    fs.readFileSync(filePath);
  } catch (error) {
    return `The file path provided could not be read: ${filePath}`;
  }
};
