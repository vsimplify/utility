import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ActionGroup, Button, Form, FormGroup, TextInput, Page, PageSection, Card, CardBody, Title, Alert, AlertVariant, HelperText, HelperTextItem } from '@patternfly/react-core';
export const DcssChildrenForm = ({ processInstanceId = 'test-process-123', taskId = 'test-task-123', onComplete }) => {
    const [childrenCount, setChildrenCount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = async (event) => {
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
                }
                else {
                    alert('Children count submitted successfully! Proceeding to next step...');
                    window.location.href = `/forms/dcss-dependent-form.html?processInstanceId=${processInstanceId}`;
                }
            }
            else {
                throw new Error('Failed to submit form');
            }
        }
        catch (err) {
            setError(`Failed to submit form: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleChildrenCountChange = (_event, value) => {
        setChildrenCount(value);
        if (error)
            setError('');
    };
    return (_jsx(Page, { children: _jsx(PageSection, { children: _jsx(Card, { children: _jsxs(CardBody, { children: [_jsx(Title, { headingLevel: "h1", size: "2xl", children: "California Child Support Calculator" }), _jsx(Title, { headingLevel: "h2", size: "lg", children: "Step 1: Number of Children" }), error && (_jsx(Alert, { variant: AlertVariant.danger, title: "Error", isInline: true, children: error })), _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(FormGroup, { label: "Number of Common Children", isRequired: true, fieldId: "childrenCount", children: [_jsx(TextInput, { isRequired: true, type: "number", id: "childrenCount", name: "childrenCount", value: childrenCount, onChange: handleChildrenCountChange, min: 1, max: 20, placeholder: "Enter 1-20", isDisabled: isSubmitting }), _jsx(HelperText, { children: _jsx(HelperTextItem, { children: "Range: 1 - 20 children" }) })] }), _jsx(ActionGroup, { children: _jsx(Button, { variant: "primary", type: "submit", isDisabled: isSubmitting || !childrenCount, isLoading: isSubmitting, children: isSubmitting ? 'Submitting...' : 'Continue to Dependent Information →' }) })] }), _jsxs("div", { style: { marginTop: '2rem', textAlign: 'center', color: '#6a6e73', fontSize: '14px' }, children: ["Process ID: ", processInstanceId] })] }) }) }) }));
};
export default DcssChildrenForm;
