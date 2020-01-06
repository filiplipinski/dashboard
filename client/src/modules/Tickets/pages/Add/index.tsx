import React, { useEffect, useMemo, useState } from 'react';

import useRequestApi, { IRequestData } from 'utils/http';
import { Group } from 'modules/Groups/models';
import Page from 'modules/App/components/Page';
import Panel from 'modules/App/components/Panel';
import Loader from 'modules/App/components/Loader';
import ClearSelect from './components/ClearSelect';
import AddForm from './components/Form';

interface IUsersResponse extends IRequestData {
  data: {
    success: string;
    groups: Array<Group>;
  };
}

const AddTicket: React.FC = () => {
  const usersRequestAsync = useRequestApi() as IUsersResponse;
  const { data, requestApi } = usersRequestAsync;

  const [selectValue, setSelectValue] = useState();

  useEffect(() => {
    requestApi('api/group/list');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groupsOptions = useMemo(() => {
    return data ? data.groups.map(group => ({ value: group._id, label: group.name })) : [];
  }, [data]);

  return (
    <Page>
      <Loader async={usersRequestAsync}>
        {({ data }) => (
          <Panel title="Dodaj zadanie">
            <ClearSelect options={groupsOptions} value={selectValue} onChange={setSelectValue} />

            {data && selectValue && <AddForm group={data.groups.find(group => group._id === selectValue.value)} />}
          </Panel>
        )}
      </Loader>
    </Page>
  );
};

export default AddTicket;
