/**
 * Formats error message to be more readable
 * @param errorMessage - Error message from the server
 * @returns Formatted error message
 */
export const formatErrorMessage = (errorMessage: string) => {
  const errorMessageSplit = errorMessage.split("-");
  const lastPart = errorMessageSplit[errorMessageSplit.length - 1];

  const formattedMessage = lastPart.replace(/([a-z])([A-Z])/g, "$1 $2");

  return formattedMessage.charAt(0).toUpperCase() + formattedMessage.slice(1);
};
