import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {Container, Paper, Avatar, Typography, Grid, Button} from "@material-ui/core";
import Input from "./Input";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);


    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

  return (
    <Container maxWidth="xs" component="main">
            <Paper elevation={3} style={{padding:'20px', position:'relative'}}>
                <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                    <Avatar >
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography variant="h5" style={{margin:"10px"}}>
                        Sign Up
                    </Typography>
                </div>
                <form action="" onSubmit=''>
                    <Grid container spacing={2}>
                        <Input name="email" label="Email Address" handleChange='' type="email" />
                        <Input name="password" label="Password" handleChange='' type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{margin:'20px 0'}}>
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-start">
                        <Grid item>
                            <Link to={'/api/users/register'}>
                                <Button onClick=''>
                                   Dont have an account ? Sign Up
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
  )
}

export default Login