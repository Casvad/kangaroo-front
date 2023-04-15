import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from "@mui/material/Button";
import KangarooRepository from "../../repositories/KangarooRepository.ts";
import {useParams} from "react-router-dom";

class DeviceInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            template_type: props.template_type,
            rows: [],
            env_rows: [],
            page: 0,
            rowsPerPage: 100,
            loaded: false,
            template: null,
            columns: [
                {id: 'time', label: 'Id', minWidth: 170},
                {id: 'data', label: 'Data', minWidth: 100},
            ],
            device_id: this.props.params.deviceId

        };
    }

    makeGetData() {
        KangarooRepository.GetDeviceTransactions(this.state.device_id)
            .then(response => {
                this.setState({
                    ...this.state,
                    rows: response.data.map((mic, index) => {
                        return {position: index + 1, ...mic}
                    }),
                    loaded: true,
                })
            })
    }

    componentDidMount() {
        this.makeGetData()
    }

    render() {

        const handleChangePage = (event, newPage) => {
            this.setState(
                {
                    ...this.state,
                    page: newPage,
                }
            );
        };

        const handleChangeRowsPerPage = (event) => {
            this.setState({
                ...this.state,
                rowsPerPage: event.target.value,
                page: 0,
            })
        };

        return (
            <Box sx={{flexGrow: 1}} paddingTop={5}>
                <Box sx={{m: 10}}/>
                <Stack spacing={2}>
                    <Grid container spacing={2}>

                        <Grid item xs={2}>

                        </Grid>
                        <Grid item xs={8}>
                            <h2> Details of device:</h2>
                            <h2>{ this.state.device_id }</h2>
                            <ToastContainer
                                position="top-right"
                                autoClose={1000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored"
                            />
                            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {this.state.columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{minWidth: column.minWidth}}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.rows
                                                .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                                .map((row) => {

                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                                            {this.state.columns.map((column) => {
                                                                let value = row[column.id];


                                                                if (column.id === "data") {
                                                                    return (
                                                                        <TableCell component="th" scope="row">
                                                                            {JSON.stringify(value)}
                                                                        </TableCell>

                                                                    );
                                                                }
                                                                return (

                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {column.format && typeof value === 'number'
                                                                            ? column.format(value)
                                                                            : value}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={this.state.rows.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>

                        </Grid>
                        <Grid item xs={2}>

                        </Grid>
                    </Grid>
                </Stack>

            </Box>
        );
    }
}

export default function DeviceInformationWithParams(){

    const params = useParams()
    return  <DeviceInformation params={params}></DeviceInformation>
}