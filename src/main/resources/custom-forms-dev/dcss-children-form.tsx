import React, { useState } from 'react';
import { Form, FormGroup, TextInput, ActionGroup, Button, PageSection, Title } from '@patternfly/react-core';

const EnterChildren = (props) => {
  const [childrenCount, setChildrenCount] = useState(props.userTask?.inputs?.childrenCount || 0);

  const submit = () => {
    const payload = {
      childrenCount: parseInt(childrenCount)
    };
    props.onSubmit(payload);
  };

  return (
    <PageSection>
      <Title headingLevel="h1" size="4xl">Enter Number of Children</Title>
      <Form>
        <FormGroup label="Number of Children" fieldId="children-count">
          <TextInput
            isRequired
            type="number"
            id="children-count"
            name="children-count"
            value={childrenCount}
            onChange={(value) => setChildrenCount(value)}
          />
        </FormGroup>
        <ActionGroup>
          <Button variant="primary" onClick={submit}>Submit</Button>
        </ActionGroup>
      </Form>
    </PageSection>
  );
};

export default EnterChildren;
