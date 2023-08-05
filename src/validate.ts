import { validateArgs } from './validation/validateArgs';

export const validate = () => {
  const validationMessages = validateArgs();
  if (validationMessages.length > 0) {
    validationMessages.forEach((message) => {
      console.error(message);
    });
    process.exit(1);
  }
};
