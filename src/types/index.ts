export interface FormField {
    id: string;
    type: InputTypeProps;
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    defaultValue?: string | number | boolean;
    options?: { value: string; label: string }[]; // For select, radio, checkbox groups
    multiple?: boolean; // For file inputs and select
    min?: number; // For number, range, date inputs
    max?: number; // For number, range, date inputs
    step?: number; // For number, range inputs
    pattern?: string; // For text validation
    rows?: number; // For textarea
    cols?: number; // For textarea
    accept?: string; // For file inputs
    validation?: {
        regex?: string;
        minLength?: number;
        maxLength?: number;
        customMessage?: string;
    };
}

export type InputTypeProps = 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' |
    'radio' | 'date' | 'file' | 'textarea' | 'hidden' | 'color' | 'range' |
    'tel' | 'url' | 'search' | 'datetime-local' | 'month' | 'week' | 'time';

export  interface FormConfig {
    id: string;
    title: string;
    description?: string;
    fields: FormField[];
    submitText?: string;
    createdAt: Date;
    updatedAt: Date;
}