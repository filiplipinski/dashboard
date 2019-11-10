export const messages = {
  // login
  'User not found': 'Nie ma takiego użytkownika',
  'Data are incorrect': 'Niepoprawne dane',
  // register
  'Email address exists unavailable': 'Adres email niedostępny',

  // ticket state
  cancelled: 'Anulowane',
  inRealization: 'W realizacji',
  finalized: 'Zakończone',
  waiting: 'Oczekujące',
  todo: 'Do wykonania',

  // ticket priority
  low: 'Niski',
  normal: 'Normalny',
  high: 'Wysoki',
};

export const translateMessages = (message: string) => {
  const messagesEntries = Object.entries(messages);

  const translatedMessage =
    messagesEntries.find(messageEntries => messageEntries.includes(message)) || [];

  return translatedMessage[1] || message;
};
