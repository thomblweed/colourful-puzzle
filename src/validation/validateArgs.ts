import { validateReadFileArg } from './read-file/validateReadFileArg';
import { validateSingleArgs } from './single-args/validateSingleArgs';

export const validateArgs = (): string[] => {
  let validationMessages: string[] = [];
  const singleArgValidationMessage = validateSingleArgs();
  if (singleArgValidationMessage) {
    validationMessages.push(singleArgValidationMessage);
  }
  const canReadFileMessage = validateReadFileArg();
  if (canReadFileMessage) {
    validationMessages.push(canReadFileMessage);
  }

  return validationMessages;
};
