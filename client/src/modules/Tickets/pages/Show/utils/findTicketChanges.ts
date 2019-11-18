import { translateMessages } from 'utils';

const findTicketChange = commentChanges => {
  let informationsToShow = [] as Array<String>;

  if (commentChanges !== undefined) {
    const changes = Object.entries(commentChanges);
    changes.forEach(([key, value]: Array<any>) => {
      switch (key) {
        case 'state':
          value && informationsToShow.push(`Zmieniono stan na: ${translateMessages(value)}`);
          break;
        case 'assignedTo':
          value && informationsToShow.push(`Zmieniono przypisanie na: ${value.userName}`);
          break;
        case 'priority':
          value && informationsToShow.push(`Zmieniono priorytet na: ${translateMessages(value)}`);
          break;
        case 'progress':
          value && informationsToShow.push(`Zmieniono postęp zadania na: ${value}%`);
          break;
        default:
          break;
      }
    });
  }

  return informationsToShow;
};

export default findTicketChange;
