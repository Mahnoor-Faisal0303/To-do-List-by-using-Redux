import React from 'react';
import { ErrorMessage, InputField } from '../Style/LoginScreenStyle';
import { Control, Controller } from 'react-hook-form';
import { Box } from '@mui/system';
import { IFormInput } from '../Pages/LoginScreen';

interface FormInputProps {
    showPassword: boolean;
    togglePasswordVisibility: () => void;
    onMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
    error: boolean;
    id: string;
    placeholder: string;
    type: string;
    endAdornment?: React.ReactNode;
    name: 'email' | 'password';
    errors: string | undefined;
    control: Control<IFormInput>;
}

const FormInput: React.FC<FormInputProps> = ({ control, name, endAdornment, type, placeholder, id, error, errors }) => {
    return (
        <Box>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <InputField
                        {...field}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        endAdornment={endAdornment}
                        error={error}
                    />
                )}
            />
            <ErrorMessage variant="caption" color="error">
                {errors}
            </ErrorMessage>
        </Box>
    );
};

export default FormInput;
