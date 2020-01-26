import React, { useEffect, useMemo } from 'react';
import useForm from 'react-hook-form';

import Page from 'modules/App/components/Page';
import Panel from 'modules/App/components/Panel';
import Error from 'modules/App/components/Error';
import { Group } from 'modules/Groups/models';
import { TextField, Button, Form, SelectField } from 'modules/Form';
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
  const { register, handleSubmit, errors, setValue, reset } = useForm<IAddGroup>();
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
      reset();
      // group created.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // TODO: zrobic czyszczenie bledu gdy ktos zacznie uzupelniac jakiekolwiek pole tekstowe
  let errorToShow = useMemo(() => {
    if (called) {
      return errorsRequest === 'Group name exists unavailable'
        ? translateMessages(errorsRequest)
        : 'Wystąpił błąd podczas dodawania nowej grupy';
    } else return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorsRequest]);

  const tooltipText =
    'Tworzenie grupy służącej do dzielenia zadań z innymi użytkowikami. \nUtwórz grupę poprzez nadanie nazwy oraz podanie DOKŁADNEGO loginu użytkownika, \nktórego chcesz dodać do grupy.';

  return (
    <Page>
      <Panel title="Dodaj grupę" tooltipText={tooltipText}>
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
            // onChange={() => (errorToShow = undefined)}
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
        </Form>
        <p className="has-text-centered is-size-4">{data && data.success && 'Pomyślnie utworzono grupę'}</p>
      </Panel>
    </Page>
  );
};

export default AddGroup;
