import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <footer id="footer">
      <Grid
        container
        spacing={3}
        borderTop="1px solid gray"
        style={{ marginTop: "auto" }}
      >
        <Grid item xs={12} sm={12} md={4} textAlign={"center"}>
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Georgia" }}
          >
            Support
          </Typography>
          <p>Help Center</p>
        </Grid>
        <Grid item xs={12} md={4} textAlign={"center"}>
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Georgia" }}
          >
            Hosting
          </Typography>
          <p>RentEase your home</p>
        </Grid>
        <Grid item xs={12} md={4} textAlign={"center"}>
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Georgia" }}
          >
            RentEase
          </Typography>
          <p>Newsroom</p>
          <p>New features</p>
          <p>Careers</p>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={3} justifyContent={"space-between"} padding={'20px'}>
        <Grid item xs={12} md={6} textAlign={"center"}>
          <span>© 2024 RentEase, Inc.</span>
          <span>·Terms</span>
          <span> . Sitemap </span>
          <span>. Privacy</span> <span>. Your Privacy Choices</span>
        </Grid>
        <Grid item xs={12} md={6} textAlign={"center"}>
          <div style={{display:'flex' ,justifyContent:'center', gap:'20px', cursor:'pointer' }}>
            <FacebookIcon/>
            <XIcon />
            <LinkedInIcon />
          </div>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
