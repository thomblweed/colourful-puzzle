export const validateSingleArgs = (): string | undefined => {
  const args = process.argv.slice(2);

  return args.length !== 1
    ? 'Please provide a single file path argument'
    : undefined;
};
