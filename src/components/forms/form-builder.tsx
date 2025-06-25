"use client";
import { useState } from 'react';
import {FormField, InputTypeProps} from "@/types";
import {DynamicForm} from "@/components/forms/dynamic-form";
import {Button} from "@/components/ui/button";

interface availableFieldTypesProps {
    type: InputTypeProps,
    label: string;
}

const FormBuilder = () => {
    const [formFields, setFormFields] = useState<FormField[]>([]);
    const availableFieldTypes: availableFieldTypesProps[] = [
        { type: 'text', label: 'Text Input' },
        { type: 'email', label: 'Email Input' },
    ];

    const addField = (type: InputTypeProps) => {
        const newField: FormField = {
            id: `field-${Date.now()}`,
            type: type,
            label: `New ${type} Field`,
            name: `field_${formFields.length + 1}`,
            required: false,
        };

        setFormFields([...formFields, newField]);
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
        setFormFields(formFields.map(field =>
            field.id === id ? { ...field, ...updates } : field
        ));
    };

    const saveForm = async () => {
        console.log(formFields)
    };

    return (
        <div className="flex">
            <div className="w-1/5 p-4">
                <h3>Available Fields</h3>
                <div className="flex flex-col gap-2">
                    {availableFieldTypes.map(field => (
                        <Button variant="default" key={field.type} onClick={() => addField(field.type)}>
                            {field.label}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="w-4/5 p-4">
                <h2 className="mb-4">Form Preview</h2>
                <DynamicForm fields={formFields} isEditing onFieldChange={updateField} />
                <Button variant="outline" className="mt-4" onClick={saveForm}>Save Form</Button>
            </div>
        </div>
    );
};

export default FormBuilder;