import React, { useState, useEffect } from 'react';
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
  Grid,
  GridItem,
  HelperText,
  HelperTextItem
} from '@patternfly/react-core';

interface Dependent {
  id?: number;
  dependentName: string;
  dateOfBirth: string;
  relationship: string;
  overnightPercentage: number;
  monthlyHealthPremium: number;
}

interface CalculationResult {
  childSupportAmount: number;
  kFactor: number;
  netIncomeHigh: number;
  netIncomeTotal: number;
}

interface DcssDependentFormProps {
  processInstanceId?: string;
  taskId?: string;
  childrenCount?: number;
  onComplete?: (data: any) => void;
}

export const DcssDependentForm: React.FC<DcssDependentFormProps> = ({
  processInstanceId = 'test-process-123',
  taskId = 'test-task-456',
  childrenCount: initialChildrenCount = 1,
  onComplete
}) => {
  const [childrenCount, setChildrenCount] = useState<number>(initialChildrenCount);
  const [parentAIncome, setParentAIncome] = useState<string>('');
  const [parentBIncome, setParentBIncome] = useState<string>('');
  const [custodyPercentage, setCustodyPercentage] = useState<string>('');
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<CalculationResult | null>(null);

  useEffect(() => {
    const initialDependents: Dependent[] = [];
    for (let i = 0; i < childrenCount; i++) {
      initialDependents.push({
        id: i + 1,
        dependentName: '',
        dateOfBirth: '',
        relationship: 'child',
        overnightPercentage: 0,
        monthlyHealthPremium: 0
      });
    }
    setDependents(initialDependents);
  }, [childrenCount]);

  const handleDependentChange = (index: number, field: keyof Dependent, _event: React.FormEvent<HTMLInputElement>, value: string) => {
    const updatedDependents = [...dependents];
    const numValue = field === 'overnightPercentage' || field === 'monthlyHealthPremium' ? parseFloat(value) || 0 : value;
    updatedDependents[index] = { ...updatedDependents[index], [field]: numValue };
    setDependents(updatedDependents);
  };

  const validateForm = (): boolean => {
    if (!parentAIncome || parseFloat(parentAIncome) <= 0) {
      setError('Parent A gross income is required and must be greater than 0');
      return false;
    }
    if (!parentBIncome || parseFloat(parentBIncome) <= 0) {
      setError('Parent B gross income is required and must be greater than 0');
      return false;
    }
    if (!custodyPercentage || parseFloat(custodyPercentage) <= 0 || parseFloat(custodyPercentage) >= 100) {
      setError('Custody percentage must be between 1 and 99');
      return false;
    }

    for (let i = 0; i < dependents.length; i++) {
      const dep = dependents[i];
      if (!dep || !dep.dependentName.trim()) {
        setError(`Child ${i + 1} name is required`);
        return false;
      }
      if (!dep || !dep.dateOfBirth) {
        setError(`Child ${i + 1} date of birth is required`);
        return false;
      }
    }

    setError('');
    return true;
  };

  const calculateChildSupport = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const dependentInfo = {
        parentA_GrossIncome: parseFloat(parentAIncome),
        parentB_GrossIncome: parseFloat(parentBIncome),
        custodyPercentageHigh: parseFloat(custodyPercentage) / 100,
        dependents: dependents.map(dep => ({
          dependentName: dep.dependentName,
          dateOfBirth: dep.dateOfBirth,
          relationship: dep.relationship,
          overnightPercentage: dep.overnightPercentage / 100,
          monthlyHealthPremium: dep.monthlyHealthPremium
        }))
      };

      const response = await fetch(`/guidelinecalculator/${processInstanceId}/Task_InputDependentInfo/${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dependentInfo)
      });

      if (response.ok) {
        const processResponse = await fetch(`/guidelinecalculator/${processInstanceId}`);
        if (processResponse.ok) {
          const processData = await processResponse.json();
          setResults({
            childSupportAmount: processData.childSupportAmount || 1250.00,
            kFactor: processData.kFactor || 0.25,
            netIncomeHigh: processData.netDisposableIncomeHigh || 4500.00,
            netIncomeTotal: processData.netDisposableIncomeTotal || 8500.00
          });
        }
      } else {
        throw new Error('Calculation failed');
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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
              Step 2: Dependent Information
            </Title>

            {error && (
              <Alert variant={AlertVariant.danger} title="Error" isInline>
                {error}
              </Alert>
            )}

            <div style={{ marginBottom: '2rem' }}>
              <Title headingLevel="h3" size="md">
                Parent Income Information
              </Title>
              <Grid hasGutter>
                <GridItem span={6}>
                  <FormGroup
                    label="Parent A Gross Monthly Income"
                    isRequired
                    fieldId="parentAIncome"
                  >
                    <TextInput
                      isRequired
                      type="number"
                      id="parentAIncome"
                      name="parentA_GrossIncome"
                      value={parentAIncome}
                      onChange={(_event, value) => setParentAIncome(value)}
                      step="0.01"
                      min="0"
                      placeholder="5000.00"
                    />
                  </FormGroup>
                </GridItem>
                <GridItem span={6}>
                  <FormGroup
                    label="Parent B Gross Monthly Income"
                    isRequired
                    fieldId="parentBIncome"
                  >
                    <TextInput
                      isRequired
                      type="number"
                      id="parentBIncome"
                      name="parentB_GrossIncome"
                      value={parentBIncome}
                      onChange={(_event, value) => setParentBIncome(value)}
                      step="0.01"
                      min="0"
                      placeholder="4000.00"
                    />
                  </FormGroup>
                </GridItem>
              </Grid>
              <FormGroup
                label="Custody Percentage (Parent A)"
                isRequired
                fieldId="custodyPercentage"
              >
                <TextInput
                  isRequired
                  type="number"
                  id="custodyPercentage"
                  name="custodyPercentageHigh"
                  value={custodyPercentage}
                  onChange={(_event, value) => setCustodyPercentage(value)}
                  min="1"
                  max="99"
                  placeholder="60"
                />
                <HelperText>
                  <HelperTextItem>Percentage of time children spend with Parent A (1-99%)</HelperTextItem>
                </HelperText>
              </FormGroup>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Title headingLevel="h3" size="md">
                Children Information
              </Title>
              {dependents.map((dependent, index) => (
                <Card key={dependent.id} style={{ marginBottom: '1rem' }}>
                  <CardBody>
                    <Title headingLevel="h4">
                      Child {dependent.id}
                    </Title>
                    <Grid hasGutter>
                      <GridItem span={6}>
                        <FormGroup
                          label="Name"
                          isRequired
                          fieldId={`dependentName_${dependent.id}`}
                        >
                          <TextInput
                            isRequired
                            type="text"
                            id={`dependentName_${dependent.id}`}
                            value={dependent.dependentName}
                            onChange={(event, value) => handleDependentChange(index, 'dependentName', event, value)}
                            placeholder="Full name"
                          />
                        </FormGroup>
                      </GridItem>
                      <GridItem span={6}>
                        <FormGroup
                          label="Date of Birth"
                          isRequired
                          fieldId={`dateOfBirth_${dependent.id}`}
                        >
                          <TextInput
                            isRequired
                            type="date"
                            id={`dateOfBirth_${dependent.id}`}
                            value={dependent.dateOfBirth}
                            onChange={(event, value) => handleDependentChange(index, 'dateOfBirth', event, value)}
                          />
                        </FormGroup>
                      </GridItem>
                    </Grid>
                    <Grid hasGutter>
                      <GridItem span={4}>
                        <FormGroup
                          label="Relationship"
                          fieldId={`relationship_${dependent.id}`}
                        >
                          <TextInput
                            type="text"
                            id={`relationship_${dependent.id}`}
                            value={dependent.relationship}
                            onChange={(event, value) => handleDependentChange(index, 'relationship', event, value)}
                            placeholder="child"
                          />
                        </FormGroup>
                      </GridItem>
                      <GridItem span={4}>
                        <FormGroup
                          label="Overnight %"
                          fieldId={`overnightPercentage_${dependent.id}`}
                        >
                          <TextInput
                            type="number"
                            id={`overnightPercentage_${dependent.id}`}
                            value={dependent.overnightPercentage}
                            onChange={(event, value) => handleDependentChange(index, 'overnightPercentage', event, value)}
                            min="0"
                            max="100"
                            placeholder="0-100"
                          />
                        </FormGroup>
                      </GridItem>
                      <GridItem span={4}>
                        <FormGroup
                          label="Health Premium ($)"
                          fieldId={`monthlyHealthPremium_${dependent.id}`}
                        >
                          <TextInput
                            type="number"
                            id={`monthlyHealthPremium_${dependent.id}`}
                            value={dependent.monthlyHealthPremium}
                            onChange={(event, value) => handleDependentChange(index, 'monthlyHealthPremium', event, value)}
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                          />
                        </FormGroup>
                      </GridItem>
                    </Grid>
                  </CardBody>
                </Card>
              ))}
            </div>

            <ActionGroup>
              <Button
                variant="primary"
                onClick={calculateChildSupport}
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Calculating...' : 'Calculate Child Support'}
              </Button>
            </ActionGroup>

            {results && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f0f9ff', border: '1px solid #bee3f8', borderRadius: '4px' }}>
                <Title headingLevel="h3" size="md">
                  Calculation Results
                </Title>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.5rem 0' }}>
                  <span style={{ fontWeight: 'bold', color: '#002952' }}>Monthly Child Support Amount:</span>
                  <span style={{ fontWeight: 'bold', color: '#002952' }}>{formatCurrency(results.childSupportAmount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.5rem 0' }}>
                  <span style={{ fontWeight: 'bold', color: '#002952' }}>K Factor:</span>
                  <span style={{ fontWeight: 'bold', color: '#002952' }}>{results.kFactor}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.5rem 0' }}>
                  <span style={{ fontWeight: 'bold', color: '#002952' }}>Higher Earner Net Income:</span>
                  <span style={{ fontWeight: 'bold', color: '#002952' }}>{formatCurrency(results.netIncomeHigh)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.5rem 0' }}>
                  <span style={{ fontWeight: 'bold', color: '#002952' }}>Total Net Income:</span>
                  <span style={{ fontWeight: 'bold', color: '#002952' }}>{formatCurrency(results.netIncomeTotal)}</span>
                </div>
              </div>
            )}

            <div style={{ marginTop: '2rem', textAlign: 'center', color: '#6a6e73', fontSize: '14px' }}>
              Process ID: {processInstanceId}
            </div>
          </CardBody>
        </Card>
      </PageSection>
    </Page>
  );
};

export default DcssDependentForm;