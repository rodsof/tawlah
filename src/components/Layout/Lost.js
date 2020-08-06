import React from 'react'
import { Container, Typography, Button } from '@material-ui/core';

const Lost = () => {
    return(
        <Container minWidth={120}>
        <Typography>Oops! Looks like you are lost, go back<Button color="primary" href="/">home</Button></Typography>
        </Container>
    )
}

export default Lost;