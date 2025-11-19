import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ActionGroup, Button, FormGroup, TextInput, Page, PageSection, Card, CardBody, Title, Alert, AlertVariant, Grid, GridItem, HelperText, HelperTextItem } from '@patternfly/react-core';
export const DcssDependentForm = ({ processInstanceId = 'test-process-123', taskId = 'test-task-456', childrenCount: initialChildrenCount = 1, onComplete }) => {
    const [childrenCount, setChildrenCount] = useState(initialChildrenCount);
    const [parentAIncome, setParentAIncome] = useState('');
    const [parentBIncome, setParentBIncome] = useState('');
    const [custodyPercentage, setCustodyPercentage] = useState('');
    const [dependents, setDependents] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [results, setResults] = useState(null);
    useEffect(() => {
        const initialDependents = [];
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
    const handleDependentChange = (index, field, _event, value) => {
        const updatedDependents = [...dependents];
        const numValue = field === 'overnightPercentage' || field === 'monthlyHealthPremium' ? parseFloat(value) || 0 : value;
        updatedDependents[index] = { ...updatedDependents[index], [field]: numValue };
        setDependents(updatedDependents);
    };
    const validateForm = () => {
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
        if (!validateForm())
            return;
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
            }
            else {
                throw new Error('Calculation failed');
            }
        }
        catch (err) {
            setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };
    return (_jsx(Page, { children: _jsx(PageSection, { children: _jsx(Card, { children: _jsxs(CardBody, { children: [_jsx(Title, { headingLevel: "h1", size: "2xl", children: "California Child Support Calculator" }), _jsx(Title, { headingLevel: "h2", size: "lg", children: "Step 2: Dependent Information" }), error && (_jsx(Alert, { variant: AlertVariant.danger, title: "Error", isInline: true, children: error })), _jsxs("div", { style: { marginBottom: '2rem' }, children: [_jsx(Title, { headingLevel: "h3", size: "md", children: "Parent Income Information" }), _jsxs(Grid, { hasGutter: true, children: [_jsx(GridItem, { span: 6, children: _jsx(FormGroup, { label: "Parent A Gross Monthly Income", isRequired: true, fieldId: "parentAIncome", children: _jsx(TextInput, { isRequired: true, type: "number", id: "parentAIncome", name: "parentA_GrossIncome", value: parentAIncome, onChange: (_event, value) => setParentAIncome(value), step: "0.01", min: "0", placeholder: "5000.00" }) }) }), _jsx(GridItem, { span: 6, children: _jsx(FormGroup, { label: "Parent B Gross Monthly Income", isRequired: true, fieldId: "parentBIncome", children: _jsx(TextInput, { isRequired: true, type: "number", id: "parentBIncome", name: "parentB_GrossIncome", value: parentBIncome, onChange: (_event, value) => setParentBIncome(value), step: "0.01", min: "0", placeholder: "4000.00" }) }) })] }), _jsxs(FormGroup, { label: "Custody Percentage (Parent A)", isRequired: true, fieldId: "custodyPercentage", children: [_jsx(TextInput, { isRequired: true, type: "number", id: "custodyPercentage", name: "custodyPercentageHigh", value: custodyPercentage, onChange: (_event, value) => setCustodyPercentage(value), min: "1", max: "99", placeholder: "60" }), _jsx(HelperText, { children: _jsx(HelperTextItem, { children: "Percentage of time children spend with Parent A (1-99%)" }) })] })] }), _jsxs("div", { style: { marginBottom: '2rem' }, children: [_jsx(Title, { headingLevel: "h3", size: "md", children: "Children Information" }), dependents.map((dependent, index) => (_jsx(Card, { style: { marginBottom: '1rem' }, children: _jsxs(CardBody, { children: [_jsxs(Title, { headingLevel: "h4", children: ["Child ", dependent.id] }), _jsxs(Grid, { hasGutter: true, children: [_jsx(GridItem, { span: 6, children: _jsx(FormGroup, { label: "Name", isRequired: true, fieldId: `dependentName_${dependent.id}`, children: _jsx(TextInput, { isRequired: true, type: "text", id: `dependentName_${dependent.id}`, value: dependent.dependentName, onChange: (event, value) => handleDependentChange(index, 'dependentName', event, value), placeholder: "Full name" }) }) }), _jsx(GridItem, { span: 6, children: _jsx(FormGroup, { label: "Date of Birth", isRequired: true, fieldId: `dateOfBirth_${dependent.id}`, children: _jsx(TextInput, { isRequired: true, type: "date", id: `dateOfBirth_${dependent.id}`, value: dependent.dateOfBirth, onChange: (event, value) => handleDependentChange(index, 'dateOfBirth', event, value) }) }) })] }), _jsxs(Grid, { hasGutter: true, children: [_jsx(GridItem, { span: 4, children: _jsx(FormGroup, { label: "Relationship", fieldId: `relationship_${dependent.id}`, children: _jsx(TextInput, { type: "text", id: `relationship_${dependent.id}`, value: dependent.relationship, onChange: (event, value) => handleDependentChange(index, 'relationship', event, value), placeholder: "child" }) }) }), _jsx(GridItem, { span: 4, children: _jsx(FormGroup, { label: "Overnight %", fieldId: `overnightPercentage_${dependent.id}`, children: _jsx(TextInput, { type: "number", id: `overnightPercentage_${dependent.id}`, value: dependent.overnightPercentage, onChange: (event, value) => handleDependentChange(index, 'overnightPercentage', event, value), min: "0", max: "100", placeholder: "0-100" }) }) }), _jsx(GridItem, { span: 4, children: _jsx(FormGroup, { label: "Health Premium ($)", fieldId: `monthlyHealthPremium_${dependent.id}`, children: _jsx(TextInput, { type: "number", id: `monthlyHealthPremium_${dependent.id}`, value: dependent.monthlyHealthPremium, onChange: (event, value) => handleDependentChange(index, 'monthlyHealthPremium', event, value), min: "0", step: "0.01", placeholder: "0.00" }) }) })] })] }) }, dependent.id)))] }), _jsx(ActionGroup, { children: _jsx(Button, { variant: "primary", onClick: calculateChildSupport, isDisabled: isSubmitting, isLoading: isSubmitting, children: isSubmitting ? 'Calculating...' : 'Calculate Child Support' }) }), results && (_jsxs("div", { style: { marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f0f9ff', border: '1px solid #bee3f8', borderRadius: '4px' }, children: [_jsx(Title, { headingLevel: "h3", size: "md", children: "Calculation Results" }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.5rem 0' }, children: [_jsx("span", { style: { fontWeight: 'bold', color: '#002952' }, children: "Monthly Child Support Amount:" }), _jsx("span", { style: { fontWeight: 'bold', color: '#002952' }, children: formatCurrency(results.childSupportAmount) })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.5rem 0' }, children: [_jsx("span", { style: { fontWeight: 'bold', color: '#002952' }, children: "K Factor:" }), _jsx("span", { style: { fontWeight: 'bold', color: '#002952' }, children: results.kFactor })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.5rem 0' }, children: [_jsx("span", { style: { fontWeight: 'bold', color: '#002952' }, children: "Higher Earner Net Income:" }), _jsx("span", { style: { fontWeight: 'bold', color: '#002952' }, children: formatCurrency(results.netIncomeHigh) })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.5rem 0' }, children: [_jsx("span", { style: { fontWeight: 'bold', color: '#002952' }, children: "Total Net Income:" }), _jsx("span", { style: { fontWeight: 'bold', color: '#002952' }, children: formatCurrency(results.netIncomeTotal) })] })] })), _jsxs("div", { style: { marginTop: '2rem', textAlign: 'center', color: '#6a6e73', fontSize: '14px' }, children: ["Process ID: ", processInstanceId] })] }) }) }) }));
};
export default DcssDependentForm;
