import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";

const Input = ({ name, half, label, handleChange, autoFocus, type, handleShowPassword, error, value, onFocus, onBlur, helperText}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField 
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            onFocus={onFocus}
            onBlur={onBlur}
            error={error}
            label={label}
            value={value}
            helperText={helperText}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' && {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    </Grid>
  )
}

export default Input;