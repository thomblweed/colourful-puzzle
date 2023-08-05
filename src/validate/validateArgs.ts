import { validateReadFile } from './read-file/validateReadFile';
import { validateSingleArgs } from './single-args/validateSingleArgs';

export const validateArgs = (): string[] => {
  let validationMessages: string[] = [];
  const singleArgValidationMessage = validateSingleArgs();
  if (singleArgValidationMessage) {
    validationMessages.push(singleArgValidationMessage);
  }
  const canReadFileMessage = validateReadFile();
  if (canReadFileMessage) {
    validationMessages.push(canReadFileMessage);
  }

  return validationMessages;
};
