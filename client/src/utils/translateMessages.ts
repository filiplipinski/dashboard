export const messages = {
  // login
  "No user found": "Nie ma takiego użytkownika",
  "Data are incorrect": "Niepoprawne dane",
  // register
  "Email address exists unavailable": "Adres email niedostępny"
};

export const translateMessages = (message: string) => {
  const messagesEntries = Object.entries(messages);

  const translatedMessage =
    messagesEntries.find(messageEntries => messageEntries.includes(message)) ||
    [];

  return translatedMessage[1];
};
