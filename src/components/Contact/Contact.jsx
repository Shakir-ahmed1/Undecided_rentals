import { Paper, Container, TextField, Button, Grid } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const Contact = () => {
  return (
    <Container size="md">
        <h1 style={{textAlign:'center'}}>Contact Us</h1>
        
          <Paper elevation={3} style={{padding:'30px'}}>
            <Grid spacing={5} container>
              <Grid item xs={12} md={6}>
                <h2 style={{textAlign:'center'}}>Send Message Us</h2>
                <TextField label="Your Name" fullWidth style={{marginBottom:'20px'}}/>
                <TextField label="Your Email" fullWidth style={{marginBottom:'20px'}}/>
                <TextField label="Subject" fullWidth style={{marginBottom:'20px'}}/>
                <TextField multiline rows={4} label="Message" type="textarea" fullWidth style={{marginBottom:'20px'}}/>
                <div style={{
                  display:'flex',
                  justifyContent:'center'
                }}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    style={{
                      width:'300px',
                      borderRadius: "15px",
                      height: "50px",
                      textTransform: "none",
                      fontSize: "17px",
                      fontFamily: "Georgia",
                      fontWeight: "bold",
                    }}
                  >
                    Send Message
                  </Button>
                </div>
              </Grid>
              <Grid xs={12} md={6} item>
                <h2 style={{textAlign:'center'}}>Get in Touch</h2>
                <p style={{lineHeight:'40px', fontSize:'20px', fontWeight:'400'}}>
                  At RentEase, we're dedicated to helping
                  you find the perfect home for your needs. Whether you're looking
                  for a cozy apartment in the heart of the city or a spacious family
                  house in the suburbs, we have a wide range of rental properties to
                  suit every lifestyle and budget.
                </p>
                <div style={{display:"flex", justifyContent:'center', gap:'20px'}}>
                    <GitHubIcon fontSize="large" color="primary" style={{cursor:'pointer'}}/>
                    <LinkedInIcon fontSize="large" color="primary" style={{cursor:'pointer'}}/>
                    <FacebookIcon fontSize="large" color="primary" style={{cursor:'pointer'}}/>
                    <XIcon fontSize="large" color="primary" style={{cursor:'pointer'}}/>
                </div>
              </Grid>
            </Grid>
          </Paper>
    </Container>
  );
}

export default Contact