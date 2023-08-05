import { validateArgs } from './validate/validateArgs';

const main = () => {
  const validationMessages = validateArgs();
  if (validationMessages.length > 0) {
    validationMessages.forEach((message) => {
      console.error(message);
    });
    process.exit(1);
  }
};

main();
