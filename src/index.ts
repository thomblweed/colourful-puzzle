import { validateSingleArgs } from './validate/validateSingleArgs';

const main = () => {
  const validationMessage = validateSingleArgs();
  if (validationMessage) {
    console.error(validationMessage);
    process.exit(1);
  }
};

main();
