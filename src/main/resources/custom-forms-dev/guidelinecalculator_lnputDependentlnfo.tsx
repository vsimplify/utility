import React, { useCallback, useEffect, useState } from 'react';
import {
    TextInput,
    FormGroup,
    Card,
    CardBody,
    Split,
    SplitItem,
    Button,
} from '@patternfly/react-core';
import { PlusCircleIcon, MinusCircleIcon } from '@patternfly/react-icons';

const Form__guidelinecalculator_InputDependentInfo: React.FC<any> = (
    props: any
) => {
    const [formApi, setFormApi] = useState<any>();
    const [childrenCount, set__childrenCount] = useState<number>();
    const [
        dependentInfo__custodyPercentageHigh,
        set__dependentInfo__custodyPercentageHigh,
    ] = useState<number>();
    const [dependentInfo__dependents, set__dependentInfo__dependents] = useState<
        object[]
    >([]);
    const [
        dependentInfo__parentA_GrossIncome,
        set__dependentInfo__parentA_GrossIncome,
    ] = useState<number>();
    const [
        dependentInfo__parentB_GrossIncome,
        set__dependentInfo__parentB_GrossIncome,
    ] = useState<number>();
    const [custodyPercentageHigh, set__custodyPercentageHigh] =
        useState<number>();
    const [parentA_GrossIncome, set__parentA_GrossIncome] = useState<number>();
    const [parentB_GrossIncome, set__parentB_GrossIncome] = useState<number>();

    /* Utility function that fills the form with the data received from the kogito runtime */
    const setFormData = (data) => {
        if (!data) {
            return;
        }
        set__childrenCount(data?.childrenCount);
        set__dependentInfo__custodyPercentageHigh(
            data?.dependentInfo?.custodyPercentageHigh
        );
        set__dependentInfo__dependents(data?.dependentInfo?.dependents ?? []);
        set__dependentInfo__parentA_GrossIncome(
            data?.dependentInfo?.parentA_GrossIncome
        );
        set__dependentInfo__parentB_GrossIncome(
            data?.dependentInfo?.parentB_GrossIncome
        );
        set__custodyPercentageHigh(data?.custodyPercentageHigh);
        set__parentA_GrossIncome(data?.parentA_GrossIncome);
        set__parentB_GrossIncome(data?.parentB_GrossIncome);
    };

    /* Utility function to generate the expected form output as a json object */
    const getFormData = useCallback(() => {
        const formData: any = {};
        formData.dependentInfo = {};
        formData.dependentInfo.custodyPercentageHigh =
            dependentInfo__custodyPercentageHigh;
        formData.dependentInfo.dependents = dependentInfo__dependents;
        formData.dependentInfo.parentA_GrossIncome =
            dependentInfo__parentA_GrossIncome;
        formData.dependentInfo.parentB_GrossIncome =
            dependentInfo__parentB_GrossIncome;
        formData.custodyPercentageHigh = custodyPercentageHigh;
        formData.parentA_GrossIncome = parentA_GrossIncome;
        formData.parentB_GrossIncome = parentB_GrossIncome;
        return formData;
    }, [
        dependentInfo__custodyPercentageHigh,
        dependentInfo__dependents,
        dependentInfo__parentA_GrossIncome,
        dependentInfo__parentB_GrossIncome,
        custodyPercentageHigh,
        parentA_GrossIncome,
        parentB_GrossIncome,
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
                fieldId={'uniforms-0006-0001'}
                label={'Children count'}
                isRequired={false}>
                <TextInput
                    type={'number'}
                    name={'childrenCount'}
                    isDisabled={true}
                    id={'uniforms-0006-0001'}
                    placeholder={''}
                    step={1}
                    value={childrenCount}
                    onChange={(e, newValue) => set__childrenCount(Number(newValue))}
                />
            </FormGroup>
            <Card>
                <CardBody className='pf-v5-c-form'>
                    <label>
                        <b>Dependent info</b>
                    </label>
                    <FormGroup
                        fieldId={'uniforms-0006-0005'}
                        label={'Custody percentage high'}
                        isRequired={false}>
                        <TextInput
                            type={'number'}
                            name={'dependentInfo.custodyPercentageHigh'}
                            isDisabled={false}
                            id={'uniforms-0006-0005'}
                            placeholder={''}
                            step={0.01}
                            value={dependentInfo__custodyPercentageHigh}
                            onChange={(e, newValue) =>
                                set__dependentInfo__custodyPercentageHigh(Number(newValue))
                            }
                        />
                    </FormGroup>
                    <div>
                        <Split hasGutter>
                            <SplitItem>
                                {'Dependents' && (
                                    <label className={'pf-c-form__label'}>
                                        <span className={'pf-c-form__label-text'}>Dependents</span>
                                    </label>
                                )}
                            </SplitItem>
                            <SplitItem isFilled />
                            <SplitItem>
                                <Button
                                    name='$'
                                    variant='plain'
                                    style={{ paddingLeft: '0', paddingRight: '0' }}
                                    disabled={false}
                                    onClick={() => {
                                        !false &&
                                            set__dependentInfo__dependents(
                                                (dependentInfo__dependents ?? []).concat([{}])
                                            );
                                    }}>
                                    <PlusCircleIcon color='#0088ce' />
                                </Button>
                            </SplitItem>
                        </Split>
                        <div>
                            {dependentInfo__dependents?.map((_, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    style={{
                                        marginBottom: '1rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}>
                                    <div style={{ width: '100%', marginRight: '10px' }}>
                                        <Card>
                                            <CardBody className='pf-v5-c-form'>
                                                <FormGroup
                                                    fieldId={'uniforms-0006-000a'}
                                                    label={'Date of birth'}
                                                    isRequired={false}>
                                                    <TextInput
                                                        name={`dependentInfo__dependents.${itemIndex}.dateOfBirth`}
                                                        id={'uniforms-0006-000a'}
                                                        isDisabled={false}
                                                        placeholder={''}
                                                        type={'text'}
                                                        value={
                                                            dependentInfo__dependents?.[itemIndex].dateOfBirth
                                                        }
                                                        onChange={(e, newValue) => {
                                                            set__dependentInfo__dependents((s) => {
                                                                const newState = [...s];
                                                                newState[itemIndex].dateOfBirth = newValue;
                                                                return newState;
                                                            });
                                                        }}
                                                    />
                                                </FormGroup>
                                                <FormGroup
                                                    fieldId={'uniforms-0006-000b'}
                                                    label={'Dependent name'}
                                                    isRequired={false}>
                                                    <TextInput
                                                        name={`dependentInfo__dependents.${itemIndex}.dependentName`}
                                                        id={'uniforms-0006-000b'}
                                                        isDisabled={false}
                                                        placeholder={''}
                                                        type={'text'}
                                                        value={
                                                            dependentInfo__dependents?.[itemIndex]
                                                                .dependentName
                                                        }
                                                        onChange={(e, newValue) => {
                                                            set__dependentInfo__dependents((s) => {
                                                                const newState = [...s];
                                                                newState[itemIndex].dependentName = newValue;
                                                                return newState;
                                                            });
                                                        }}
                                                    />
                                                </FormGroup>
                                                <FormGroup
                                                    fieldId={'uniforms-0006-000d'}
                                                    label={'Monthly health premium'}
                                                    isRequired={false}>
                                                    <TextInput
                                                        type={'number'}
                                                        name={`dependentInfo__dependents.${itemIndex}.monthlyHealthPremium`}
                                                        isDisabled={false}
                                                        id={'uniforms-0006-000d'}
                                                        placeholder={''}
                                                        step={0.01}
                                                        value={
                                                            dependentInfo__dependents?.[itemIndex]
                                                                .monthlyHealthPremium
                                                        }
                                                        onChange={(e, newValue) => {
                                                            set__dependentInfo__dependents((s) => {
                                                                const newState = [...s];
                                                                newState[itemIndex].monthlyHealthPremium =
                                                                    Number(newValue);
                                                                return newState;
                                                            });
                                                        }}
                                                    />
                                                </FormGroup>
                                                <FormGroup
                                                    fieldId={'uniforms-0006-000f'}
                                                    label={'Overnight percentage'}
                                                    isRequired={false}>
                                                    <TextInput
                                                        type={'number'}
                                                        name={`dependentInfo__dependents.${itemIndex}.overnightPercentage`}
                                                        isDisabled={false}
                                                        id={'uniforms-0006-000f'}
                                                        placeholder={''}
                                                        step={0.01}
                                                        value={
                                                            dependentInfo__dependents?.[itemIndex]
                                                                .overnightPercentage
                                                        }
                                                        onChange={(e, newValue) => {
                                                            set__dependentInfo__dependents((s) => {
                                                                const newState = [...s];
                                                                newState[itemIndex].overnightPercentage =
                                                                    Number(newValue);
                                                                return newState;
                                                            });
                                                        }}
                                                    />
                                                </FormGroup>
                                                <FormGroup
                                                    fieldId={'uniforms-0006-000g'}
                                                    label={'Relationship'}
                                                    isRequired={false}>
                                                    <TextInput
                                                        name={`dependentInfo__dependents.${itemIndex}.relationship`}
                                                        id={'uniforms-0006-000g'}
                                                        isDisabled={false}
                                                        placeholder={''}
                                                        type={'text'}
                                                        value={
                                                            dependentInfo__dependents?.[itemIndex]
                                                                .relationship
                                                        }
                                                        onChange={(e, newValue) => {
                                                            set__dependentInfo__dependents((s) => {
                                                                const newState = [...s];
                                                                newState[itemIndex].relationship = newValue;
                                                                return newState;
                                                            });
                                                        }}
                                                    />
                                                </FormGroup>
                                            </CardBody>
                                        </Card>
                                    </div>
                                    <div>
                                        <Button
                                            disabled={false}
                                            variant='plain'
                                            style={{ paddingLeft: '0', paddingRight: '0' }}
                                            onClick={() => {
                                                const value = [...dependentInfo__dependents];
                                                value.splice(itemIndex, 1);
                                                !false && set__dependentInfo__dependents(value);
                                            }}>
                                            <MinusCircleIcon color='#cc0000' />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <FormGroup
                        fieldId={'uniforms-0006-000i'}
                        label={'Parent a gross income'}
                        isRequired={false}>
                        <TextInput
                            type={'number'}
                            name={'dependentInfo.parentA_GrossIncome'}
                            isDisabled={false}
                            id={'uniforms-0006-000i'}
                            placeholder={''}
                            step={0.01}
                            value={dependentInfo__parentA_GrossIncome}
                            onChange={(e, newValue) =>
                                set__dependentInfo__parentA_GrossIncome(Number(newValue))
                            }
                        />
                    </FormGroup>
                    <FormGroup
                        fieldId={'uniforms-0006-000k'}
                        label={'Parent b gross income'}
                        isRequired={false}>
                        <TextInput
                            type={'number'}
                            name={'dependentInfo.parentB_GrossIncome'}
                            isDisabled={false}
                            id={'uniforms-0006-000k'}
                            placeholder={''}
                            step={0.01}
                            value={dependentInfo__parentB_GrossIncome}
                            onChange={(e, newValue) =>
                                set__dependentInfo__parentB_GrossIncome(Number(newValue))
                            }
                        />
                    </FormGroup>
                </CardBody>
            </Card>
            <FormGroup
                fieldId={'uniforms-0006-000m'}
                label={'Custody percentage high'}
                isRequired={false}>
                <TextInput
                    type={'number'}
                    name={'custodyPercentageHigh'}
                    isDisabled={false}
                    id={'uniforms-0006-000m'}
                    placeholder={''}
                    step={0.01}
                    value={custodyPercentageHigh}
                    onChange={(e, newValue) =>
                        set__custodyPercentageHigh(Number(newValue))
                    }
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0006-000o'}
                label={'Parent a gross income'}
                isRequired={false}>
                <TextInput
                    type={'number'}
                    name={'parentA_GrossIncome'}
                    isDisabled={false}
                    id={'uniforms-0006-000o'}
                    placeholder={''}
                    step={0.01}
                    value={parentA_GrossIncome}
                    onChange={(e, newValue) => set__parentA_GrossIncome(Number(newValue))}
                />
            </FormGroup>
            <FormGroup
                fieldId={'uniforms-0006-000q'}
                label={'Parent b gross income'}
                isRequired={false}>
                <TextInput
                    type={'number'}
                    name={'parentB_GrossIncome'}
                    isDisabled={false}
                    id={'uniforms-0006-000q'}
                    placeholder={''}
                    step={0.01}
                    value={parentB_GrossIncome}
                    onChange={(e, newValue) => set__parentB_GrossIncome(Number(newValue))}
                />
            </FormGroup>
        </div>
    );
};
export default Form__guidelinecalculator_InputDependentInfo;
