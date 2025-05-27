import gsap from 'gsap';
import { Box, Typography, Divider, Grid } from '@mui/material';

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

    return (
        <Box>
            {/* Horizontal divider line at the top of the footer content */}
            <Divider />
            <Box
                sx={{
                    width: '100%', // Ensures the box takes full available width
                    color: 'white', // Sets the default text color for this section
                    minHeight: '200px', // Sets a minimum height for the footer content area
                    display: 'flex', // Uses flexbox for internal layout
                    margin: '0 auto' // Centers the box horizontally on the page
                }}
            >
                <Grid
                    sx={{
                        gap: '1.5em', // Sets a gap between grid items
                        mx: {
                            xs: '3vw', // Horizontal margin for extra small screens (3% of viewport width)
                            lg: 'auto' // Auto horizontal margin for large screens to center the grid
                        },
                        my: '2em' // Vertical margin for the grid container
                    }}
                    maxWidth='lg' // Limits the maximum width of the grid container
                    container // Designates this Grid as a flex container for its direct children (Grid items)
                >
                    {/* About Section */}
                    {/* This Grid item takes 12 columns on extra-small, 6 on small, and 5 on medium and larger screens */}
                    <Grid item xs={12} sm={6} md={5}>
                        <Typography variant='h1' fontSize='1.4em' fontWeight='400'>About</Typography>
                        <Box sx={styles}>
                            <Typography variant='h3' fontSize='1em'>
                                Hello, my name is Peter Juma Mutiso.
                                I am a Kenyan software developer specializing in web development, with a strong focus on building scalable, user-centric digital solutions.
                                My passion lies in leveraging technology to empower communities and businesses across Africa by addressing local challenges with innovative and practical applications.
                                With a commitment to continuous learning and excellence, I aim to contribute meaningfully to the continent&apos;s growing digital landscape through impactful and sustainable software development.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Links Section */}
                    {/* This Grid item takes 12 columns on extra-small, 4 on small, and 3 on medium and larger screens */}
                    <Grid item xs={12} sm={4} md={3}>
                        <Typography variant='h1' fontSize='1.4em' fontWeight='400'>Links</Typography>
                        <Box className='link' sx={styles}>
                            {/* Home link with GSAP scroll animation */}
                            <Typography
                                className='FooterLink'
                                onClick={() => { router.push('/'); gsap.to(window, { duration: .8, scrollTo: `#hero` }) }}
                            >Home</Typography>
                            {/* Contact link using Next.js Link component */}
                            <Link href='/contact'>Contact</Link>
                            {/* About link with GSAP scroll animation */}
                            <Typography
                                className='FooterLink'
                                onClick={() => { router.push('/'); gsap.to(window, { duration: .5, scrollTo: `#about` }) }}
                            >About</Typography>
                        </Box>
                    </Grid>

                    {/* Contact Section */}
                    {/* This Grid item takes 12 columns on extra-small, 3 on small, and 3 on medium and larger screens */}
                    <Grid item xs={12} sm={3} md={3}>
                        <Typography variant='h1' fontSize='1.4em' fontWeight='400'>Contact</Typography>
                        <Box className='link' sx={styles}>
                            {/* GitHub link, opens in a new tab */}
                            <a target='_blank' rel="noreferrer" href='https://github.com/Peter46856'>Github</a>
                            <Typography variant='h1' fontSize='1em'>pjuma655@gmail.com</Typography>
                            <Typography variant='h1' fontSize='1em'>Nairobi - Kenya</Typography>
                            <Typography variant='h1' fontSize='1em'>+254718279984</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/* Includes the Copyright component at the very bottom of the footer */}
            <Copyright />
        </Box>
    );
}

export default Footer;
