import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography
      component="h4"
      variant="h4"
      color={'black'}
      align="center"
      noWrap
      id="button"
      sx={{
        color: 'whitesmoke',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add shadow
        fontWeight: 700, // Adjust font weight
        fontSize: '24px', // Adjust font size
        letterSpacing: '1px', // Adjust letter spacing
        // Add any other advanced styles here
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        COPCONNECT INSIGHTS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer(props) {
  const customIconUrl = 'https://cdn-icons-png.flaticon.com/512/3439/3439335.png';
  const locationIconUrl = 'https://tse4.mm.bing.net/th?id=OIP.H7_PhmSyCRWb4_1i5PFbdgHaHZ&pid=Api&P=0&h=180';
  const phoneIconUrl = 'https://tse4.mm.bing.net/th?id=OIP.5_xxdbU1J1GoLaVng_PBRQHaHa&pid=Api&P=0&h=180';
  const emailIconUrl = 'https://tse2.mm.bing.net/th?id=OIP.F9NJSGQHHjb87uqIOPiEQAHaHa&pid=Api&P=0&h=180';

  return (
    <Box component="footer" sx={{ bgcolor: 'black', py: 3, color: 'white' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={customIconUrl} alt="Custom Icon" style={{ marginRight: '8px', width: '60px', height: '60px', borderRadius: '50%' }} />
          <div>
            <Typography
              component="h4"
              variant="h4"
              color={'black'}
              align="left"
              noWrap
              id="button"
              sx={{
                color: 'whitesmoke',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add shadow
                fontWeight: 700, // Adjust font weight
                fontSize: '24px', // Adjust font size
                letterSpacing: '1px', // Adjust letter spacing
                // Add any other advanced styles here
              }}
            >COPCONNECT</Typography>
            <hr style={{ margin: '4px 0', border: '1px solid whitesmoke', width: '190px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={locationIconUrl} alt="Location Icon" style={{ marginRight: '8px', width: '30px', height: '30px' }} />
          <Typography variant="subtitle1">105, Police Head Quarter, Lal Kothi, <br></br> Jaipur - 302015 (Rajasthan)</Typography>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={phoneIconUrl} alt="Phone Icon" style={{ marginRight: '8px', width: '30px', height: '30px' }} />
          <Typography variant="subtitle1">Ph: 0141-2744254 <br></br>Ph: 0141-2740784</Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={emailIconUrl} alt="Email-Icon" style={{ marginRight: '8px', width: '30px', height: '30px' }} />
          <Typography variant="subtitle1">Rj-police@gmail.com</Typography>
        </div>
      </Container>
      <br></br>
      <hr style={{ width: '100%', margin: '10px 0', borderTop: '1px solid white' }} />
      <br></br>
      <Container maxWidth="lg" sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        {/* Section 1 */}
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6">Main Links</Typography>
          <br></br>
          <Link color="inherit" href="/About">About us</Link>
          <br></br>
          <br></br>
          <Link color="inherit" href="/Service">Service</Link>
          <br></br>
          <br></br>
          <Link color="inherit" href="/Contact">Contact</Link>
          <br></br>
          <br></br>
          <Link color="inherit" href="/">Home</Link>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6">Accreditation</Typography>
          <br></br>
          <Link color="inherit" href="https://police.rajasthan.gov.in/new/dashboard">NAAC</Link>
          <br></br>
          <br></br>
        </div>

        {/* Section 3 */}
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6">Website Links</Typography>
          <br></br>
          <Link color="inherit" href="https://police.rajasthan.gov.in/new/dashboard">Offical Link</Link>
        </div>

        {/* Section 4 */}
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6">Hackathon</Typography>
          <br></br>
          <Link color="inherit" href="https://police.rajasthan.gov.in/Old/hackathon/">Rj-Hackathon Website</Link>
        </div>
      </Container>

      <Container maxWidth="lg" sx={{ display:'-ms-grid', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
        {/* Copyright and Website Link */}
        <div style={{alignItems:'center'}}>
        <Copyright/>
        </div>
 
        <div style={{ display: 'flex', alignItems: 'center' }}>
          
        </div>
      </Container>
    </Box>
  );
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;
