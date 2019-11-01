import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Page from 'modules/App/components/Page';
import Panel from 'modules/App/components/Panel';
import Loader from 'modules/App/components/Loader';
import useRequestApi, { IRequestData } from 'utils/http';

type ticketUrlParams = {
  id: string;
};

// type Ticket = {
//   title: string;
// };

// interface ITicketResponse extends IRequestData {
//   data: {
//     success: string;
//     ticket: Ticket;
//   };
//   errors: {
//     error: string;
//   };
// }

const TicketShow: React.FC<RouteComponentProps> = ({ match }) => {
  const { id } = match.params as ticketUrlParams;
  const requestAsync = useRequestApi();
  const { requestApi } = requestAsync;

  useEffect(() => {
    requestApi(`api/ticket/show/${id}`);
  }, []);

  return (
    <Page>
      <Loader async={requestAsync}>
        {({ data }) => {
          return <Panel title={`Zadanie ${data.ticket.title}`}>jakis content</Panel>;
        }}
      </Loader>
    </Page>
  );
};

export default TicketShow;
