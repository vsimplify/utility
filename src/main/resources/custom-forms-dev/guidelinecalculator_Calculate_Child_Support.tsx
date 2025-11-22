import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, FormGroup } from '@patternfly/react-core';

const Form__guidelinecalculator_Calculate_Child_Support: React.FC<any> = (
    props: any
) => {
    const [formApi, setFormApi] = useState<any>();
    const [childSupportAmount, set__childSupportAmount] = useState<number>();
    const [kFactor, set__kFactor] = useState<number>();
    const [netDisposableIncomeHigh, set__netDisposableIncomeHigh] =
        useState<number>();
    const [netDisposableIncomeTotal, set__netDisposableIncomeTotal] =
        useState<number>();
    const [Interface, set__Interface] = useState<string>('');
    const [Operation, set__Operation] = useState<string>('');
    const [childrenCount, set__childrenCount] = useState<number>();
    const [custodyPercentageHigh, set__custodyPercentageHigh] =
        useState<number>();
    const [implementation, set__implementation] = useState<string>('');
    const [interfaceImplementationRef, set__interfaceImplementationRef] =
        useState<string>('');
    const [operationImplementationRef, set__operationImplementationRef] =
        useState<string>('');
    const [parentA_GrossIncome, set__parentA_GrossIncome] = useState<number>();
    const [parentB_GrossIncome, set__parentB_GrossIncome] = useState<number>();

    /* Utility function that fills the form with the data received from the kogito runtime */
    const setFormData = (data) => {
        if (!data) {
            return;
        }
        set__childSupportAmount(data?.childSupportAmount);
        set__kFactor(data?.kFactor);
        set__netDisposableIncomeHigh(data?.netDisposableIncomeHigh);
        set__netDisposableIncomeTotal(data?.netDisposableIncomeTotal);
        set__Interface(data?.Interface ?? '');
        set__Operation(data?.Operation ?? '');
        set__childrenCount(data?.childrenCount);
        set__custodyPercentageHigh(data?.custodyPercentageHigh);
        set__implementation(data?.implementation ?? '');
        set__interfaceImplementationRef(data?.interfaceImplementationRef ?? '');
        set__operationImplementationRef(data?.operationImplementationRef ?? '');
        set__parentA_GrossIncome(data?.parentA_GrossIncome);
        set__parentB_GrossIncome(data?.parentB_GrossIncome);
    };

    /* Utility function to generate the expected form output as a json object */
    const getFormData = useCallback(() => {
        const formData: any = {};
        formData.childSupportAmount = childSupportAmount;
        formData.kFactor = kFactor;
        formData.netDisposableIncomeHigh = netDisposableIncomeHigh;
        formData.netDisposableIncomeTotal = netDisposableIncomeTotal;
        return formData;
    }, [
        childSupportAmount,
        kFactor,
        netDisposableIncomeHigh,
        netDisposableIncomeTotal,
    ]);

    /* Utility function to validate the form on the 'beforeSubmit' Lifecycle Hook */
    const validateForm = useCallback(() => { }, []);

    /* Utility function to perform actions on the on the 'afterSubmit' Lifecycle Hook */
    const afterSubmit = useCallback((result) => { }, []);

    useEffect(() => {
        if (formApi) {
            /*
        Form Lifecycle Hook that will be executed before the form is submitted.
        Throwing an error will stop the form submit. Usually should be used to validate the form.
      */
            formApi.beforeSubmit = () => validateForm();
            /*
        Form Lifecycle Hook that will be executed after the form is submitted.
        It will receive a response object containing the `type` flag indicating if the submit has been successful and `info` with extra information about the submit result.
      */
            formApi.afterSubmit = (result) => afterSubmit(result);
            /* Generates the expected form output object to be posted */
            formApi.getFormData = () => getFormData();
        }
    }, [getFormData, validateForm, afterSubmit]);

    useEffect(() => {
        /*
      Call to the Kogito console form engine. It will establish the connection with the console embeding the form
      and return an instance of FormAPI that will allow hook custom code into the form lifecycle.
      The `window.Form.openForm` call expects an object with the following entries:
        - onOpen: Callback that will be called after the connection with the console is established. The callback
        will receive the following arguments:
          - data: the data to be bound into the form
          - ctx: info about the context where the form is being displayed. This will contain information such as the form JSON Schema, process/task, user...
    */
        const api = window.Form.openForm({
            onOpen: (data, context) => {
                setFormData(data);
            },
        });
        setFormApi(api);
    }, []);

    return (
        <div className={'pf-v5-c-form'}>
            <FormGroup
                fieldId={'uniforms-0002-0001'}
                label={'Child support amount'}
                isRequired={false}>
                <TextInput
                    type={'number'}
                    name={'childSupportAmount'}
                    isDisabled={false}
                    id={'uniforms-0002-0001'}
                    placeholder={''}
                    step={0.01}
                    value={childSupportAmount}
                    onChange={(e, newValue) => set__childSupportAmount(Number(newValue))}
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0002-0003'}
                label={'K factor'}
                isRequired={false}>
                <TextInput
                    type={'number'}
                    name={'kFactor'}
                    isDisabled={false}
                    id={'uniforms-0002-0003'}
                    placeholder={''}
                    step={0.01}
                    value={kFactor}
                    onChange={(e, newValue) => set__kFactor(Number(newValue))}
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0002-0005'}
                label={'Net disposable income high'}
                isRequired={false}>
                <TextInput
                    type={'number'}
                    name={'netDisposableIncomeHigh'}
                    isDisabled={false}
                    id={'uniforms-0002-0005'}
                    placeholder={''}
                    step={0.01}
                    value={netDisposableIncomeHigh}
                    onChange={(e, newValue) =>
                        set__netDisposableIncomeHigh(Number(newValue))
                    }
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0002-0007'}
                label={'Net disposable income total'}
                isRequired={false}>
                <TextInput
                    type={'number'}
                    name={'netDisposableIncomeTotal'}
                    isDisabled={false}
                    id={'uniforms-0002-0007'}
                    placeholder={''}
                    step={0.01}
                    value={netDisposableIncomeTotal}
                    onChange={(e, newValue) =>
                        set__netDisposableIncomeTotal(Number(newValue))
                    }
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0002-0008'}
                label={'Interface'}
                isRequired={false}>
                <TextInput
                    name={'Interface'}
                    id={'uniforms-0002-0008'}
                    isDisabled={true}
                    placeholder={''}
                    type={'text'}
                    value={Interface}
                    onChange={(e, newValue) => set__Interface(newValue)}
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0002-0009'}
                label={'Operation'}
                isRequired={false}>
                <TextInput
                    name={'Operation'}
                    id={'uniforms-0002-0009'}
                    isDisabled={true}
                    placeholder={''}
                    type={'text'}
                    value={Operation}
                    onChange={(e, newValue) => set__Operation(newValue)}
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0002-000b'}
                label={'Children count'}
                isRequired={false}>
                <TextInput
                    type={'number'}
                    name={'childrenCount'}
                    isDisabled={true}
                    id={'uniforms-0002-000b'}
                    placeholder={''}
                    step={1}
                    value={childrenCount}
                    onChange={(e, newValue) => set__childrenCount(Number(newValue))}
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0002-000d'}
                label={'Custody percentage high'}
                isRequired={false}>
                <TextInput
                    type={'number'}
                    name={'custodyPercentageHigh'}
                    isDisabled={true}
                    id={'uniforms-0002-000d'}
                    placeholder={''}
                    step={0.01}
                    value={custodyPercentageHigh}
                    onChange={(e, newValue) =>
                        set__custodyPercentageHigh(Number(newValue))
                    }
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0002-000e'}
                label={'Implementation'}
                isRequired={false}>
                <TextInput
                    name={'implementation'}
                    id={'uniforms-0002-000e'}
                    isDisabled={true}
                    placeholder={''}
                    type={'text'}
                    value={implementation}
                    onChange={(e, newValue) => set__implementation(newValue)}
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0002-000f'}
                label={'Interface implementation ref'}
                isRequired={false}>
                <TextInput
                    name={'interfaceImplementationRef'}
                    id={'uniforms-0002-000f'}
                    isDisabled={true}
                    placeholder={''}
                    type={'text'}
                    value={interfaceImplementationRef}
                    onChange={(e, newValue) => set__interfaceImplementationRef(newValue)}
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0002-000g'}
                label={'Operation implementation ref'}
                isRequired={false}>
                <TextInput
                    name={'operationImplementationRef'}
                    id={'uniforms-0002-000g'}
                    isDisabled={true}
                    placeholder={''}
                    type={'text'}
                    value={operationImplementationRef}
                    onChange={(e, newValue) => set__operationImplementationRef(newValue)}
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0002-000i'}
                label={'Parent a gross income'}
                isRequired={false}>
                <TextInput
                    type={'number'}
                    name={'parentA_GrossIncome'}
                    isDisabled={true}
                    id={'uniforms-0002-000i'}
                    placeholder={''}
                    step={0.01}
                    value={parentA_GrossIncome}
                    onChange={(e, newValue) => set__parentA_GrossIncome(Number(newValue))}
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0002-000k'}
                label={'Parent b gross income'}
                isRequired={false}>
                <TextInput
                    type={'number'}
                    name={'parentB_GrossIncome'}
                    isDisabled={true}
                    id={'uniforms-0002-000k'}
                    placeholder={''}
                    step={0.01}
                    value={parentB_GrossIncome}
                    onChange={(e, newValue) => set__parentB_GrossIncome(Number(newValue))}
                />
            </FormGroup>
        </div>
    );
};
export default Form__guidelinecalculator_Calculate_Child_Support;
