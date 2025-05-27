// src/components/Mui/Input.tsx
import { TextField } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../../pages/_app"; // Adjust path if necessary
import { IInput } from "../../Types/Types"; // Assuming IInput is defined correctly

// Extend IInput to include value and onChange for controlled components
interface ExtendedIInput extends IInput {
    value: string | number; // Value can be string or number (for type='number')
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input = ({ multi, mt, label, name, type, value, onChange }: ExtendedIInput) => {
    const colorMode = useContext(ColorModeContext);
    // Use a more descriptive variable name
    const inputTextColor = colorMode.mode === 'light' ? 'black' : 'white';

    // Determine rows based on multi prop, default to 1 if not multiline
    const rows = multi ? 5 : 1; 

    return (
        <TextField
            name={name}
            type={type || 'text'}
            multiline={multi} // No need for ternary, multi is already boolean
            rows={rows} // Use the determined rows
            value={value} // Controlled value
            onChange={onChange} // Event handler for changes
            sx={{
                width: '100%',
                mt: mt,
                // Apply color directly to the input and textarea elements
                '& .MuiInputBase-input': { // This targets both input and textarea
                    color: inputTextColor,
                    // Ensure placeholder color also changes
                    '&::placeholder': {
                        color: inputTextColor,
                        opacity: 0.7, // Adjust opacity if needed
                    },
                },
                // Apply color to the label
                '& .MuiInputLabel-root': {
                    color: inputTextColor,
                    '&.Mui-focused': {
                        color: '#0092ff', // Focus color for the label
                    },
                },
                // Consistent styling for outline, hover, and focus
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: colorMode.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.7)',
                    },
                    '&:hover fieldset': {
                        borderColor: '#0092ff',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#0092ff',
                    },
                },
            }}
            label={label}
            variant="outlined"
        />
    );
};

export default Input;