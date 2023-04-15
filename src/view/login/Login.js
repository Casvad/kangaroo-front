import * as React from 'react';
import {
    Container,
    Grid,
    Box,
    Typography,
    Stack,
    TextField,
} from '@mui/material';
import { FormProvider } from 'react-hook-form';
import Button from "@mui/material/Button";
import KangarooRepository from "../../repositories/KangarooRepository.ts";
import KangarooUtils from "../../utils/KangarooUtils.ts";
import {useNavigate} from 'react-router-dom';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    handleChangeProperty(property){
        this.setState(
            {
                ...this.state,
                ...property
            }
        )
    }

    makeLogin(){

        console.log("email: ", this.state.email, "password: ", this.state.password)

        KangarooRepository.MakeLogin(
            this.state.email,
            this.state.password
        ).then(response =>{
            KangarooUtils.SetToken(response.data)
            this.props.navigate('/home');
        })
    }

    render() {

        return (
            <Container
                maxWidth={false}
                sx={{height: '100vh', backgroundColor: {xs: '#fff', md: '#f4f4f4'}}}
            >
                <Grid
                    container
                    justifyContent='center'
                    alignItems='center'
                    sx={{width: '100%', height: '100%'}}
                >
                    <Grid
                        item
                        sx={{maxWidth: '70rem', width: '100%', backgroundColor: '#fff'}}
                    >
                        <FormProvider>
                            <Grid
                                container
                                sx={{
                                    boxShadow: {sm: '0 0 5px #ddd'},
                                    py: '6rem',
                                    px: '1rem',
                                }}
                            >
                                <Grid
                                    item
                                    container
                                    justifyContent='space-between'
                                    rowSpacing={5}
                                    sx={{
                                        maxWidth: {sm: '45rem'},
                                        marginInline: 'auto',
                                    }}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        sx={{borderRight: {sm: '1px solid #ddd'}}}
                                    >
                                        <Box
                                            display='flex'
                                            flexDirection='column'
                                            component='form'
                                            noValidate
                                            autoComplete='off'
                                            sx={{paddingRight: {sm: '3rem'}}}
                                            onSubmit={(e) => { console.log(e) }}
                                        >
                                            <Typography
                                                variant='h6'
                                                component='h1'
                                                sx={{textAlign: 'center', mb: '1.5rem'}}
                                            >
                                                Log into your account
                                            </Typography>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Email"
                                                onChange={(e) => this.handleChangeProperty({"email": e.target.value})}
                                                value={this.state.email}
                                            />

                                            <TextField style={{marginTop: "30px"}}

                                                id="outlined-password-input"
                                                label="Password"
                                                type="password"
                                                       required
                                                autoComplete="current-password"
                                                       onChange={(e) => this.handleChangeProperty({"password": e.target.value})}
                                                       value={this.state.password}
                                            />

                                            <Button
                                                variant='contained'
                                                sx={{
                                                    py: '0.8rem',
                                                    mt: 2,
                                                    width: '80%',
                                                    marginInline: 'auto',
                                                }}
                                                onClick={() => this.makeLogin()}
                                            >
                                                Login
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent='center'>
                                    <Stack sx={{mt: '3rem', textAlign: 'center'}}>
                                        <Typography sx={{fontSize: '0.9rem', mb: '1rem'}}>
                                            Need an account?{' '}

                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </FormProvider>
                    </Grid>
                </Grid>
            </Container>
        );
    };
}

export default function LoginWithRouter(props){
    const navigate = useNavigate()
    return <LoginPage navigate={navigate}/>
}

//export default LoginPage