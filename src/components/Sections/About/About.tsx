import { Container, Box } from '@mui/material'; // Removed Grid
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import ReadMore from '../ReadMore/ReadMore';
import { ColorModeContext } from '../../../../pages/_app';
import { useContext } from 'react';

const About = () => {
    const colorMode = useContext(ColorModeContext);

    return (
        <>
            <Container
                id='about'
                maxWidth='lg'
                sx={{
                    margin: '0 auto',
                    py: '6em',
                }}
            >
                {/* Replaced Grid with Box for flex container */}
                <Box
                    sx={{
                        display: 'flex', // Enable flexbox for this container
                        flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on small, row on medium+
                        alignItems: { xs: 'center', md: 'flex-start' }, // Center items on small, align to start on medium+
                        justifyContent: 'space-between', // Distribute space between image and text
                        gap: { xs: '3em', md: '2em' }, // Add gap between the elements
                    }}
                >
                    {/* Image Section - This now comes first in the JSX */}
                    <Box
                        sx={{
                            maxWidth: '400px',
                            width: '100%',
                            height: '450px',
                            margin: { xs: '0 auto', md: '0' }, // Center image on small screens, remove margin auto on md+
                            boxShadow: {
                                xs: '-.5em 1.5em 0px #0092ff',
                                sm: '-1.5em 1.5em 0px #0092ff',
                            },
                            position: 'relative',
                            // Allow this box to shrink if necessary, but prefer its intrinsic size
                            flexShrink: 0,
                        }}
                    >
                        <Box
                            sx={{
                                width: '100px',
                                height: '100px',
                                zIndex: '0',
                                position: 'absolute',
                                right: {
                                    xs: '-4%',
                                    sm: '90%',
                                },
                                bottom: {
                                    xs: '-5%',
                                    sm: '-10%',
                                },
                                background: 'transparent',
                                backgroundImage: colorMode.mode === 'dark' ? 'radial-gradient(white 2px, transparent 0)' : 'radial-gradient(black 2px, transparent 0)',
                                backgroundSize: '15px 13px',
                            }}
                        ></Box>
                        <Image
                            alt='Personal Image'
                            className='img1 '
                            fill // Retain layout='fill' for responsive image within its parent Box
                            src={`https://res.cloudinary.com/dwcu3wcol/image/upload/v1659776757/20211226_154523_-_Copy_hhy2kp.jpg`}
                        />
                    </Box>

                    {/* Text Content Section - This now comes second in the JSX */}
                    <Box
                        sx={{
                            flex: 1, // Allow this box to grow and take available space
                            maxWidth: { md: '60%', lg: '50%' }, // Limit text width on larger screens to prevent it from stretching too much
                            textAlign: { xs: 'center', md: 'left' }, // Center text on small, left-align on medium+
                        }}
                    >
                        <Box sx={{ pb: '.5em' }}>
                            <Typography
                                variant='h1'
                                sx={{
                                    fontSize: {
                                        xs: '2.2em',
                                        sm: '2.5em',
                                        md: '3em',
                                    },
                                    py: '.5em',
                                    pt: {
                                        xs: '1.8em', // Add top padding on extra small screens
                                        md: 0, // Remove top padding on medium screens and up
                                    },
                                }}
                                fontWeight='600'
                            >
                                About Me, I&apos;m Peter Juma Mutiso
                            </Typography>
                            <Typography
                                variant='h2'
                                sx={{
                                    maxWidth: '570px',
                                    fontSize: {
                                        xs: '.8em',
                                        sm: '1em',
                                    },
                                    pb: '.5em',
                                    margin: { xs: '0 auto', md: '0' } // Center text on small screens, remove margin auto on md+
                                }}
                            >
                                A 20-year-old Kenya-based software developer. I first started developing web pages using HTML and JavaScript, and now I&apos;ve realized I have a lot of passion in web and mobile app development, and I&apos;ve been building and working on that for the past 3 years now.
                            </Typography>
                        </Box>
                        <Typography
                            variant='h2'
                            sx={{
                                maxWidth: '570px',
                                fontSize: {
                                    xs: '.8em',
                                    sm: '1em',
                                },
                                pb: '.5em',
                                margin: { xs: '0 auto', md: '0' } // Center text on small screens, remove margin auto on md+
                            }}
                        >
                            Being a computer science student at Multimedia University of Kenya has made me appreciate technology; thus, I&apos;m simultaneously studying various software development frameworks, mainly for Information Systems. Business and technology are both my passions.
                        </Typography>
                        <ReadMore>
                            Aside from working hard, I tend to enjoy simple things like reading, gaming, sports, and many more extra-curricular activities. Finally, I&apos;m a teamwork enthusiast and enjoy learning new things from friends and other experts. Therefore, if you&apos;re interested in working with me, please don&apos;t hesitate to send me a message here.
                        </ReadMore>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default About;