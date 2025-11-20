import React, { useState, useEffect } from 'react';
import { Form, FormGroup, TextInput, ActionGroup, Button, PageSection, Title, Card, CardBody, TextContent, Text, Grid, GridItem } from '@patternfly/react-core';

const InputDependentInfo = (props) => {
    const count = props.userTask?.inputs?.childrenCount || 0;
    const [dependents, setDependents] = useState([]);
    const [parentAIncome, setParentAIncome] = useState(0);
    const [parentBIncome, setParentBIncome] = useState(0);
    const [custodyPercent, setCustodyPercent] = useState(0);
    const [result, setResult] = useState(null);

    useEffect(() => {
        // Initialize dependents array based on count
        const initialDependents = Array.from({ length: count }, (_, i) => ({ name: '', age: '' }));
        setDependents(initialDependents);
    }, [count]);

    const handleDependentChange = (index, field, value) => {
        const newDependents = [...dependents];
        newDependents[index][field] = value;
        setDependents(newDependents);
    };

    const calculate = () => {
        // Client-side estimation (actual calculation happens in Service Task)
        const totalIncome = parseFloat(parentAIncome) + parseFloat(parentBIncome);
        const estimatedSupport = totalIncome * (parseFloat(custodyPercent) / 100) * 0.2 * count; // Mock formula
        setResult(`Estimated Support: $${estimatedSupport.toFixed(2)} (Official calculation will follow)`);
    };

    const submit = () => {
        const payload = {
            dependentInfo: {
                dependents: dependents
            },
            parentA_GrossIncome: parseFloat(parentAIncome),
            parentB_GrossIncome: parseFloat(parentBIncome),
            custodyPercentageHigh: parseFloat(custodyPercent)
        };
        props.onSubmit(payload);
    };

    return (
        <PageSection>
            <Title headingLevel="h1" size="4xl">Enter Financial & Dependent Info</Title>
            <TextContent>
                <Text component="p">Please enter details for {count} children and financial information.</Text>
            </TextContent>
            <Form>
                <Card isCompact style={{ marginBottom: '1rem' }}>
                    <CardBody>
                        <Title headingLevel="h4">Financial Information</Title>
                        <Grid hasGutter>
                            <GridItem span={6}>
                                <FormGroup label="Parent A Gross Income" fieldId="parent-a-income">
                                    <TextInput type="number" id="parent-a-income" value={parentAIncome} onChange={setParentAIncome} />
                                </FormGroup>
                            </GridItem>
                            <GridItem span={6}>
                                <FormGroup label="Parent B Gross Income" fieldId="parent-b-income">
                                    <TextInput type="number" id="parent-b-income" value={parentBIncome} onChange={setParentBIncome} />
                                </FormGroup>
                            </GridItem>
                            <GridItem span={12}>
                                <FormGroup label="Custody Percentage (High)" fieldId="custody-percent">
                                    <TextInput type="number" id="custody-percent" value={custodyPercent} onChange={setCustodyPercent} />
                                </FormGroup>
                            </GridItem>
                        </Grid>
                    </CardBody>
                </Card>

                <Title headingLevel="h4">Dependents</Title>
                {dependents.map((dep, index) => (
                    <Card key={index} isCompact style={{ marginBottom: '1rem' }}>
                        <CardBody>
                            <Title headingLevel="h5">Child {index + 1}</Title>
                            <Grid hasGutter>
                                <GridItem span={6}>
                                    <FormGroup label="Name" fieldId={`name-${index}`}>
                                        <TextInput
                                            id={`name-${index}`}
                                            value={dep.name}
                                            onChange={(value) => handleDependentChange(index, 'name', value)}
                                        />
                                    </FormGroup>
                                </GridItem>
                                <GridItem span={6}>
                                    <FormGroup label="Age" fieldId={`age-${index}`}>
                                        <TextInput
                                            type="number"
                                            id={`age-${index}`}
                                            value={dep.age}
                                            onChange={(value) => handleDependentChange(index, 'age', value)}
                                        />
                                    </FormGroup>
                                </GridItem>
                            </Grid>
                        </CardBody>
                    </Card>
                ))}

                <ActionGroup>
                    <Button variant="secondary" onClick={calculate}>Estimate</Button>
                    <Button variant="primary" onClick={submit}>Submit</Button>
                </ActionGroup>
            </Form>

            {result && (
                <Card style={{ marginTop: '2rem' }}>
                    <CardBody>
                        <Title headingLevel="h2">Estimation</Title>
                        <TextContent>
                            <Text>{result}</Text>
                        </TextContent>
                    </CardBody>
                </Card>
            )}
        </PageSection>
    );
};

export default InputDependentInfo;
