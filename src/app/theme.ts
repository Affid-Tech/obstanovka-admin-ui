import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
    cssVariables: true,
    colorSchemes: { light: true, dark: true },
    components: {
        MuiButton: { defaultProps: { variant: 'contained' } },
    },
});