export const messages = {
  // login
  'User not found': 'Nie ma takiego użytkownika',
  'Data are incorrect': 'Niepoprawne dane',
  // register
  'Email address exists unavailable': 'Adres email niedostępny',
  'User name exists unavailable': 'Nazwa użytkownika niedostępna',

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

  //group add
  'Group name exists unavailable': 'Nazwa grupy niedostępna',
};

export const translateMessages = (message: string) => {
  const messagesEntries = Object.entries(messages);

  const translatedMessage = messagesEntries.find(messageEntries => messageEntries.includes(message)) || [];

  return translatedMessage[1] || message;
};
