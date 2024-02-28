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
          <div style={{width:'200px'}}>
            <h2>Get in Touch</h2>
            <p>
              At RentEase, we're dedicated to helping
              you find the perfect home for your needs. Whether you're looking
              for a cozy apartment in the heart of the city or a spacious family
              house in the suburbs, we have a wide range of rental properties to
              suit every lifestyle and budget.
            </p>
          </div>
        </Paper>
        ={" "}
      </div>
    </Container>
  );
}

export default Contact