import React from "react";
import { FormField } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import InputError from "@/components/input-error";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";

interface DynamicFormProps {
    fields: FormField[];
    onSubmit?: SubmitHandler<FieldValues>; // Todo type script error still exist
    isEditing?: boolean;
    onFieldChange?: (id: string, updates: Partial<FormField>) => void;
}

//type InputEventTypes = ChangeEvent<HTMLInputElement>;

export const DynamicForm = ({ fields, onSubmit, isEditing, onFieldChange }: DynamicFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const triggerOnFieldChange = <K extends keyof FormField>(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        field: FormField,
        attribute: K,
        onFieldChange?: (id: string, updates: Partial<FormField>) => void
    ) => {
        if (onFieldChange) {
            onFieldChange(field.id, { [attribute]: e.target.value } as Partial<FormField>);
        }
    };

    const renderField = (field: FormField) => {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
            case 'number':
            case 'tel':
            case 'url':
            case 'date':
            case 'datetime-local':
            case 'month':
            case 'week':
            case 'time':
            case 'color':
            case 'range':
                return (
                    <div key={field.id} className="grid gap-2">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Input
                            type={field.type}
                            id={field.id}
                            placeholder={field.placeholder}
                            required={field.required}
                            defaultValue={field.defaultValue?.toString()}
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            onChange={(e) => triggerOnFieldChange(e, field, 'defaultValue', onFieldChange)}
                            {...(!isEditing && register(field.name, {
                                required: field.required,
                                pattern: field.pattern ? new RegExp(field.pattern) : undefined,
                                minLength: field.validation?.minLength,
                                maxLength: field.validation?.maxLength,
                            }))}
                        />

                        {errors[field.name] && (<InputError message={`${errors[field.name]}`} />)}
                    </div>
                );

            case 'textarea':
                return (
                    <div key={field.id} className="grid gap-2">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Textarea
                            id={field.id}
                            placeholder={field.placeholder}
                            required={field.required}
                            rows={field.rows}
                            cols={field.cols}
                            defaultValue={field.defaultValue?.toString()}
                            onChange={(e) => triggerOnFieldChange(e, field, 'defaultValue', onFieldChange)}
                            {...(!isEditing && register(field.name, {
                                required: field.required,
                                minLength: field.validation?.minLength,
                                maxLength: field.validation?.maxLength,
                            }))}
                        />
                    </div>
                );

            case 'select':
                return (
                    <div key={field.id} className="grid gap-2">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Select
                            defaultValue={field.defaultValue?.toString()}
                            {...(!isEditing && register(field.name))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                {field.options?.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                );

            case 'checkbox':
                if (field.options) {
                    // Checkbox group
                    return (
                        <div key={field.id} className="grid gap-2">
                            <Label>{field.label}</Label>
                            <div className="space-y-2 mt-2">
                                {field.options.map(option => (
                                    <div key={option.value} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`${field.id}-${option.value}`}
                                            value={option.value}
                                            {...(!isEditing && register(field.name))}
                                        />
                                        <Label htmlFor={`${field.id}-${option.value}`}>{option.label}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                } else {
                    // Single checkbox
                    return (
                        <div key={field.id} className="mb-4 flex items-center space-x-2">
                            <Checkbox
                                id={field.id}
                                defaultChecked={Boolean(field.defaultValue)}
                                {...(!isEditing && register(field.name))}
                            />
                            <Label htmlFor={field.id}>{field.label}</Label>
                        </div>
                    );
                }

            case 'radio':
                return (
                    <div key={field.id} className="grid gap-2">
                        <Label>{field.label}</Label>
                        <RadioGroup
                            defaultValue={field.defaultValue?.toString()}
                            {...(!isEditing && register(field.name, { required: field.required }))}
                        >
                            {field.options?.map(option => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                                    <Label htmlFor={`${field.id}-${option.value}`}>{option.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                );

            case 'file':
                return (
                    <div key={field.id} className="grid gap-2">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Input
                            type="file"
                            id={field.id}
                            multiple={field.multiple}
                            accept={field.accept}
                            {...(!isEditing && register(field.name, { required: field.required }))}
                        />
                    </div>
                );

            case 'hidden':
                return (
                    <input
                        type="hidden"
                        id={field.id}
                        defaultValue={field.defaultValue?.toString()}
                        {...(!isEditing && register(field.name))}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <form onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined} className="space-y-4">
            {fields.map(renderField)}
            {onSubmit && (
                <Button type="submit">Submit</Button>
            )}
        </form>
    );
};