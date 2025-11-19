import React, { useState } from 'react';
import {
  ActionGroup,
  Button,
  Form,
  FormGroup,
  TextInput,
  Page,
  PageSection,
  Card,
  CardBody,
  Title,
  Alert,
  AlertVariant,
  HelperText,
  HelperTextItem
} from '@patternfly/react-core';

interface DcssChildrenFormProps {
  processInstanceId?: string;
  taskId?: string;
  onComplete?: (data: any) => void;
}

export const DcssChildrenForm: React.FC<DcssChildrenFormProps> = ({
  processInstanceId = 'test-process-123',
  taskId = 'test-task-123',
  onComplete
}) => {
  const [childrenCount, setChildrenCount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const count = parseInt(childrenCount);
    if (isNaN(count) || count < 1 || count > 20) {
      setError('Please enter a number between 1 and 20');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/guidelinecalculator/${processInstanceId}/Task_EnterChildren/${taskId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          childrenCount: count
        })
      });

      if (response.ok) {
        if (onComplete) {
          onComplete({ childrenCount: count });
        } else {
          alert('Children count submitted successfully! Proceeding to next step...');
          window.location.href = `/forms/dcss-dependent-form.html?processInstanceId=${processInstanceId}`;
        }
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (err) {
      setError(`Failed to submit form: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChildrenCountChange = (_event: React.FormEvent<HTMLInputElement>, value: string) => {
    setChildrenCount(value);
    if (error) setError('');
  };

  return (
    <Page>
      <PageSection>
        <Card>
          <CardBody>
            <Title headingLevel="h1" size="2xl">
              California Child Support Calculator
            </Title>
            <Title headingLevel="h2" size="lg">
              Step 1: Number of Children
            </Title>

            {error && (
              <Alert variant={AlertVariant.danger} title="Error" isInline>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <FormGroup
                label="Number of Common Children"
                isRequired
                fieldId="childrenCount"
              >
                <TextInput
                  isRequired
                  type="number"
                  id="childrenCount"
                  name="childrenCount"
                  value={childrenCount}
                  onChange={handleChildrenCountChange}
                  min={1}
                  max={20}
                  placeholder="Enter 1-20"
                  isDisabled={isSubmitting}
                />
                <HelperText>
                  <HelperTextItem>Range: 1 - 20 children</HelperTextItem>
                </HelperText>
              </FormGroup>

              <ActionGroup>
                <Button
                  variant="primary"
                  type="submit"
                  isDisabled={isSubmitting || !childrenCount}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Continue to Dependent Information →'}
                </Button>
              </ActionGroup>
            </Form>

            <div style={{ marginTop: '2rem', textAlign: 'center', color: '#6a6e73', fontSize: '14px' }}>
              Process ID: {processInstanceId}
            </div>
          </CardBody>
        </Card>
      </PageSection>
    </Page>
  );
};

export default DcssChildrenForm;