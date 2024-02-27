import { Paper, Container, TextField, Button } from "@mui/material"
const Contact = () => {
  return (
    <Container size="md">
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Contact Us</h1>
        <Paper
          elevation={3}
          style={{
            padding: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "60px",
            width:'700px'
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <h2>Send Message Us</h2>
            <TextField label="Your Name" />
            <TextField label="Your Email" />
            <TextField label="Subject" />
            <TextField multiline rows={4} label="Message" type="textarea" />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{
                borderRadius:'15px',
                height:'50px',
                textTransform:'none',
                fontSize:'17px',
                fontFamily:'Georgia',
                fontWeight:'bold'
              }}
            >
              Send Message
            </Button>
          </div>
          <div>
            <h2>Get in Touch</h2>
          </div>
        </Paper>
        ={" "}
      </div>
    </Container>
  );
}

export default Contact