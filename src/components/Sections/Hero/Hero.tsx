import { Box, Button, Container, Tooltip, Typography } from '@mui/material'; // Removed Grid
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import HeroSectionAnimation from '../../../gsap/HeroSectionAnimation';
import Image from 'next/image';

export const btnStyles = {
    padding: '.77em 1.5em',
    borderRadius: '3px'
};

const Hero = () => {
    const ref = useRef();
    const q = gsap.utils.selector(ref);

    gsap.registerPlugin(ScrollToPlugin);

    useEffect(() => {
        HeroSectionAnimation(q);
    }, [q]);

    return (
        <Container
            id='hero'
            maxWidth='lg'
            sx={{
                margin: '0 auto',
                py: {
                    xs: '7.5em',
                    sm: '8.5em'
                },
                // Flex container for the main layout
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // Column on small, row on medium and up
                alignItems: { xs: 'center', md: 'flex-start' }, // Center items vertically on small, align to start on medium+
                justifyContent: 'space-between', // Distribute space between text and image
                gap: { xs: '3em', md: '2em' } // Gap between the two main content blocks
            }}
        >
            {/* Text Content Section */}
            <Box
                ref={ref}
                sx={{
                    flexShrink: 1, // Allow this box to shrink
                    width: { xs: '100%', sm: 'auto' }, // Take full width on xs, auto on sm+
                    maxWidth: { md: '60%', lg: '50%' }, // Control width on medium and large screens
                    textAlign: { xs: 'center', md: 'left' } // Adjust text alignment based on breakpoint
                }}
            >
                <Typography
                    className='t1'
                    variant='h1'
                    sx={{
                        fontSize: {
                            xs: '2.4em',
                            sm: '3.4em',
                            md: '3.8em'
                        },
                        transform: 'translateY(40px)',
                        opacity: 0,
                        pt: '0',
                        fontWeight: '550'
                    }}
                >
                    Let&apos;s build something great together,
                    The place where your business expands
                </Typography>
                <Typography
                    variant='h2'
                    className='secondary t2 t25o0'
                    sx={{
                        pt: '1.5em',
                        fontSize: {
                            xs: '.9em',
                            sm: '1em'
                        },
                        maxWidth: '570px',
                        fontWeight: '300',
                        margin: { xs: '0 auto', md: '0' } // Center text on small screens, left-align on medium+
                    }}
                >
                    Hi, I&apos;m Peter Juma Mutiso, a Computer Science student at Multimedia University of Kenya.
                    Together with my talented team, I build robust websites and intuitive web/mobile apps that help businesses grow and thrive in the digital world.
                    Our goal is to translate your unique needs and desires into clean, modern, and effective digital experiences using cutting-edge tech.
                </Typography>

                {/* This is the image box, moved here to appear before buttons for smaller screens */}
                <Box
                    sx={{
                        display: { xs: 'block', md: 'none' }, // Only show this image on extra small and small screens
                        borderRadius: '6px',
                        width: {
                            xs: '100%',
                            sm: '350px'
                        },
                        height: '460px',
                        position: 'relative',
                        boxShadow: {
                            xs: '.5em 3em 0 #313131 ',
                            sm: '2em 3em 0px #313131'
                        },
                        margin: '3em auto 0 auto' // Add top margin and center on small screens
                    }}
                >
                    <Image
                        width={400}
                        height={400}
                        style={{
                            opacity: 0,
                            borderRadius: '50%',
                            zIndex: '2',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            width: '100%',
                            height: '100%',
                            maxWidth: '350px',
                            maxHeight: '350px',
                        }}
                        className='img1'
                        src={`https://res.cloudinary.com/dqbo6glmn/image/upload/c_crop,w_960,h_979,x_0,y_0/v1748205203/portfolio-profile_ku070e.jpg`}
                        alt="Personal Image"
                    />
                    <Box
                        className='gradientBg'
                        sx={{
                            width: '100px',
                            height: '100px',
                            zIndex: '0',
                            position: 'absolute',
                            right: {
                                xs: '-1%',
                                sm: '-5%'
                            },
                            opacity: 0,
                            bottom: '-5%',
                            background: 'transparent',
                            backgroundImage: 'radial-gradient(white 2px, transparent 0)',
                            backgroundSize: '15px 13px'
                        }}
                    />
                    <Box
                        className='quoteBox'
                        sx={{
                            zIndex: '2',
                            position: 'absolute',
                            bottom: {
                                xs: '0%',
                                lg: '-5%'
                            },
                            width: '100%',
                            right: {
                                sm: '25%'
                            },
                            top: '105%',
                            overflow: 'hidden',
                            opacity: 0,
                            background: '#0092ff'
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: '300',
                                fontSize: '.85em',
                                padding: '1em'
                            }}
                        >
                            {`"Many ideas grow better when transplanted into another mind than the one where they sprang up."
                            – Oliver Wendell Holmes`}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        my: '2.5em',
                        gap: '.8em',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', md: 'flex-start' } // Center buttons on small, left-align on medium+
                    }}
                >
                    <Button
                        className="b1 explore offset"
                        sx={{
                            opacity: 0,
                            borderRadius: 0,
                            padding: '.75em 2.5em',
                            flex: { xs: 1, sm: 'inherit' },
                        }}
                        onClick={() => gsap.to(window, {
                            duration: 2,
                            scrollTo: `#ProjectSection`
                        })}
                    >
                        View Projects
                    </Button>
                    <a href={`https://drive.google.com/drive/u/0/my-drive`} rel="noreferrer" target='_blank'>
                        <Button
                            className='b2'
                            sx={{
                                ...btnStyles,
                                opacity: 0,
                                height: 'max-content',
                                padding: '1em 1.5em',
                                width: { xs: '100%', sm: 'auto' },
                                ":hover": {
                                    color: '#0092ff'
                                }
                            }}
                            variant='text'
                        >
                            <Typography fontSize='14px'>
                                View Resume
                            </Typography>
                        </Button>
                    </a>
                </Box>
            </Box>

            {/* Image Content Section (shown only on medium and larger screens) */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' }, // Hide on extra small/small, show on medium and up
                    flexShrink: 0,
                    width: {
                        md: '400px',
                        lg: '400px'
                    },
                    height: '460px',
                    position: 'relative',
                    borderRadius: '6px',
                    boxShadow: {
                        xs: '.5em 3em 0 #313131 ',
                        sm: '2em 3em 0px #313131'
                    },
                    justifyContent: 'center',
                    alignItems: 'center',
                    // No margin auto needed here because parent flex container handles distribution
                }}
            >
                <Image
                    width={400}
                    height={400}
                    style={{
                        opacity: 0,
                        borderRadius: '50%',
                        zIndex: '2',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        width: '100%',
                        height: '100%',
                        maxWidth: '350px',
                        maxHeight: '350px',
                    }}
                    className='img1'
                    src={`https://res.cloudinary.com/dqbo6glmn/image/upload/c_crop,w_960,h_979,x_0,y_0/v1748205203/portfolio-profile_ku070e.jpg`}
                    alt="Personal Image"
                />
                <Box
                    className='gradientBg'
                    sx={{
                        width: '100px',
                        height: '100px',
                        zIndex: '0',
                        position: 'absolute',
                        right: {
                            xs: '-1%',
                            sm: '-5%'
                        },
                        opacity: 0,
                        bottom: '-5%',
                        background: 'transparent',
                        backgroundImage: 'radial-gradient(white 2px, transparent 0)',
                        backgroundSize: '15px 13px'
                    }}
                />
                <Box
                    className='quoteBox'
                    sx={{
                        zIndex: '2',
                        position: 'absolute',
                        bottom: {
                            xs: '0%',
                            lg: '-5%'
                        },
                        width: '100%',
                        right: {
                            sm: '25%'
                        },
                        top: '105%',
                        overflow: 'hidden',
                        opacity: 0,
                        background: '#0092ff'
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: '300',
                            fontSize: '.85em',
                            padding: '1em'
                        }}
                    >
                        {`"Many ideas grow better when transplanted into another mind than the one where they sprang up."
                        – Oliver Wendell Holmes`}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Hero;