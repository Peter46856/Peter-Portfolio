import { Box, Typography, Divider } from '@mui/material';
import { blue, blueGrey } from '@mui/material/colors';

import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * Renders the copyright information for the footer.
 * Includes a divider and centered text with copyright details.
 */
function Copyright() {
    return (
        <>
            {/* Horizontal divider line */}
            <Divider />
            <Box
                maxWidth='lg' // Limits the maximum width of the box to large screen size
                sx={{
                    textAlign: 'center', // Centers the text horizontally
                    margin: '1em auto' // Adds vertical margin and centers horizontally
                }}
            >
                <Typography variant='h1' fontSize='1em'>
                    {'Copyright © '}
                    MutisoJuma@Quantum Quill Developers
                    {' '} {new Date().getFullYear()} {/* Dynamically gets the current year */}
                    {'.'}
                </Typography>
            </Box>
        </>
    );
}

/**
 * Defines the common styles for the link and contact sections within the footer.
 * Uses flexbox for layout and sets spacing and text color.
 */
const styles = {
    mt: '1em', // Margin top for spacing
    display: 'flex', // Enables flexbox layout for children
    flexDirection: 'column', // Arranges flex items in a vertical column
    gap: '15px', // Adds space between flex items
    flexWrap: 'wrap', // Allows flex items to wrap to the next line if space is limited
    color: 'white' // Sets the text color to white
};

/**
 * The main Footer component.
 * Displays sections for About, Links, and Contact information,
 * and includes the Copyright component at the bottom.
 */
function Footer() {
    const router = useRouter(); // Initializes Next.js router for programmatic navigation

    // Function to handle smooth scrolling to sections
    // Corrected: Added explicit type 'string' for the 'id' parameter
    const handleScrollToSection = (id: string) => {
        router.push(`#${id}`); // Updates the URL hash, useful for direct linking and browser history
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' }); // Smoothly scrolls the element into view
        }
    };

    return (
        <Box
            sx={{
                // Add borderRadius to the main Box containing the footer
                // Adjust the value (e.g., '16px', '50px', '20%') to control the roundness
                borderRadius: '30px', 
                overflow: 'hidden',
                margin: '30px',
                borderColor: 'white',
                borderStyle: 'inherit'
                 // Ensures content respects the rounded corners
                // You might want to add a background color if your footer isn't full-width 
                // and you want the corners to be visible against the page background.
                // backgroundColor: 'primary.main', // Example background color
            }}
        >
           
            <Divider />
            <Box
                sx={{
                    width: '100%', // Ensures the box takes full available width
                    color: 'white', // Sets the default text color for this section
                    minHeight: '200px', // Sets a minimum height for the footer content area
                    display: 'flex', // Uses flexbox for internal layout
                    margin: '0 auto', // Centers the box horizontally on the page
                    flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on small, row on medium+
                    justifyContent: 'space-around', // Distribute space
                    alignItems: { xs: 'center', md: 'flex-start' }, // Center on small, align to start on medium+
                    py: '2em', // Vertical padding
                    px: { xs: '3vw', lg: 'auto' }, // Horizontal padding
                    gap: '2em', // Add gap between sections
                    maxWidth: 'lg', // Apply max width directly
                    
                }}
            >
                {/*
                <Box
                    sx={{
                        flex: { md: 5 }, // Allocate flex space similar to Grid
                        maxWidth: { xs: '100%', sm: '80%', md: '35%' }, // Control max width for responsiveness
                        textAlign: { xs: 'center', md: 'left' } // Center text on small, left-align on medium+
                    }}
                >
                    <Typography variant='h1' fontSize='1.4em' fontWeight='400'>About</Typography>
                    <Box sx={styles}>
                        <Typography variant='h3' fontSize='1em'>
                            Hello, my name is Peter Juma Mutiso.
                            I am a Kenyan software developer specializing in web development, with a strong focus on building scalable, user-centric digital solutions.
                            My passion lies in leveraging technology to empower communities and businesses across Africa by addressing local challenges with innovative and practical applications.
                            With a commitment to continuous learning and excellence, I aim to contribute meaningfully to the continent&apos;s growing digital landscape through impactful and sustainable software development.
                        </Typography>
                    </Box>
                </Box>
                *}
                {/* Products Section */}
               <Box
                    sx={{
                         flex: { md: 3 }, // Allocate flex space similar to Grid
                        maxWidth: { xs: '100%', sm: '80%', md: '25%' },
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                >
                   <Typography variant='h1' fontSize='1.4em' fontWeight='400'>Product & Services</Typography>
                     {/* Corrected: Using Box with component="ul" for a semantic unordered list */}
                        <Box 
                         component="ul" // This tells MUI to render this Box as an <ul> element
                            sx={{ 
                               ...styles, // Apply your existing flex styles
                               listStyle: 'disc', // Ensures standard bullet points (disc is default)
                               pl: '20px', // Add padding-left for bullet indentation
                               mt: '0', // Adjust margin-top if inheriting from 'styles' causes extra space
                               gap: '10px' // Adjust gap between list items if needed
                            }}
                        >
                            {/* Each list item must be directly inside the <ul> or <Box component="ul"> */}
                            <li><Typography>Online Stores</Typography></li>
                            <li><Typography>Blogs</Typography></li>
                            <li><Typography>Personal Portfolio</Typography></li>
                            <li><Typography>Marketing</Typography></li>
                            <li><Typography>Database Management</Typography></li>
                            <li><Typography>Software Maintenance</Typography></li> {/* Corrected typo: Maintainance -> Maintenance */}
                        </Box>
                    </Box>

                {/* Links Section */}
                <Box
                    sx={{
                        flex: { md: 3 }, // Allocate flex space similar to Grid
                        maxWidth: { xs: '100%', sm: '80%', md: '25%' },
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                >
                    <Typography variant='h1' fontSize='1.4em' fontWeight='400'>Links</Typography>
                    <Box className='link' sx={styles}>
                        {/* Home link with native scroll animation */}
                        <Typography
                            className='FooterLink'
                            onClick={() => handleScrollToSection('hero')}
                            sx={{ cursor: 'pointer' }} // Add cursor pointer to indicate it's clickable
                        >Home</Typography>
                        {/* Contact link using Next.js Link component */}
                        <Link href='/contact' passHref>
                            <Typography className='FooterLink' >Contact</Typography>
                        </Link>
                        {/* About link with native scroll animation */}
                        <Typography
                            className='FooterLink'
                            onClick={() => handleScrollToSection('about')}
                            sx={{ cursor: 'pointer' }} // Add cursor pointer to indicate it's clickable
                        >About</Typography>
                    </Box>
                </Box>

                {/* Contact Section */}
                <Box
                    sx={{
                        flex: { md: 3 }, // Allocate flex space similar to Grid
                        maxWidth: { xs: '100%', sm: '80%', md: '25%' },
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                >
                    <Typography variant='h1' fontSize='1.4em' fontWeight='400'>Contact</Typography>
                    <Box className='link' sx={styles}>
                        {/* GitHub link, opens in a new tab */}
                        <a target='_blank' rel="noreferrer" href='https://github.com/Peter46856'>Github</a>
                        <Typography variant='h1' fontSize='1em'>pjuma655@gmail.com</Typography>
                        <Typography variant='h1' fontSize='1em'>Nairobi - Kenya</Typography>
                        <Typography variant='h1' fontSize='1em'>+254718279984</Typography>
                    </Box>
                </Box>
            </Box>
            {/* Includes the Copyright component at the very bottom of the footer */}
            <Copyright />
        </Box>
    );
}

export default Footer;