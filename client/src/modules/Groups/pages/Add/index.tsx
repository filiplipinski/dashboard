import React, { useEffect, useMemo } from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Page from 'modules/App/components/Page';
import Panel from 'modules/App/components/Panel';
import Error from 'modules/App/components/Error';
import { Group } from 'modules/Groups/models';
import { TextField, Button, Form, SelectField, TextAreaField } from 'modules/Form';
import useRequestApi, { IRequestData } from 'utils/http';
import { translateMessages } from 'utils';

interface IAddGroupResponse extends IRequestData {
  data: {
    success: string;
    newGroup: Group;
  };
  errors: string;
}

type IAddGroup = {
  name: string;
  members: Array<string>;
};

const AddGroup: React.FC = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, setValue } = useForm<IAddGroup>();
  const {
    requestApi,
    data,
    called,
    errors: errorsRequest,
    loading: loadingRequest,
  } = useRequestApi() as IAddGroupResponse;

  const onSubmit = (addGroupData: IAddGroup) => {
    requestApi('api/group/add', 'POST', addGroupData);
  };

  useEffect(() => {
    if (data && data.success) {
      // TODO: co zrobic gdy utworzono grupe, redircet ? na co ? komunikat ? gdzie ? ...
      console.log('pomyslnie utworzono grupę');
      // history.push(`/tickets/show/${}`);
    }
  }, [data]);

  // TODO: zrobic czyszczenie bledu gdy ktos zacznie uzupelniac jakiekolwiek pole tekstowe
  let errorToShow = useMemo(() => {
    if (called) {
      return errorsRequest === 'Group name exists unavailable'
        ? translateMessages(errorsRequest)
        : 'Wystąpił błąd podczas dodawania nowej grupy';
    } else return undefined;
  }, [errorsRequest]);

  return (
    <Page>
      <Panel title="Dodaj grupę">
        <Form isHorizontal onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="name"
            register={register({
              required: true,
              maxLength: 50,
              minLength: 5,
            })}
            type="text"
            label="Nazwa"
            errors={errors}
          />
          <SelectField
            isCreatable
            name="members"
            label="Członkowie"
            register={register}
            setValue={setValue}
            errors={errors}
          />
          <Error>{errorToShow}</Error>
          <Button type="submit" loading={loadingRequest} disabled={loadingRequest}>
            Utwórz grupę
          </Button>
          <p className="has-text-centered">{data && data.success && 'Pomyślnie utworzono grupę'}</p>
        </Form>
      </Panel>
    </Page>
  );
};

export default AddGroup;
