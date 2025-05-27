/*
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import {IToolCard} from '../../../Types/Types';
import {centeredStyles} from '../Perks/Perks';
import {useEffect} from 'react';
import gsap from 'gsap'
const ToolCard = ({title, svg, filter, className} : IToolCard) => {

    useEffect(() => {

        gsap.to(`.${className}`, {
            opacity: 1,
            stagger: .10,
            scrollTrigger: {
                trigger: `.${className}`,
                start: 'top 70%'
            }
        })
    }, [])
    return (
        <Box
            className={className}
            sx={{
            my: '1em',
            opacity: 0,
            maxWidth: '250px',
            transition: '.2s ease',
            width: {
                xs: '50%',
                sm: '33%'
            }
        }}>
            <Box
                sx={{
                ...centeredStyles,
                width: {
                    xs: '35px',
                    sm: '60px'
                },
                height: {
                    xs: '40px',
                    sm: '60px'
                }
            }}>

                <Image
                    
                    alt='Icon'
                    className={`${filter
                    ? 'filter '
                    : ''} icon`}
                    width='100%'
                    height='100%'
                    src={`${svg}`}/>
            </Box>
            <Typography
                variant='h3'
                sx={{
                fontSize: {
                    xs: '.86em',
                    sm: '1em'
                }
            }}>{title}</Typography>
        </Box>
    )
}

export default ToolCard
*/


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Image from 'next/image' // <--- REMOVE THIS IMPORT for SVGs
import {IToolCard} from '../../../Types/Types'; // Ensure this path is correct
import {centeredStyles} from '../Perks/Perks'; // Ensure this path is correct
import {useEffect} from 'react';
import gsap from 'gsap'

const ToolCard = ({title, svg, filter, className} : IToolCard) => {

    useEffect(() => {
        gsap.to(`.${className}`, {
            opacity: 1,
            stagger: .10,
            scrollTrigger: {
                trigger: `.${className}`,
                start: 'top 70%'
            }
        })
    }, [className]) // Added className to dependency array for useEffect best practice

    return (
        <Box
            className={className}
            sx={{
            my: '1em',
            opacity: 0,
            maxWidth: '250px',
            transition: '.2s ease',
            width: {
                xs: '50%',
                sm: '33%'
            }
        }}>
            <Box
                sx={{
                ...centeredStyles,
                width: {
                    xs: '35px', // Adjusted for explicit SVG rendering
                    sm: '60px' // Adjusted for explicit SVG rendering
                },
                height: {
                    xs: '40px', // Adjusted for explicit SVG rendering
                    sm: '60px' // Adjusted for explicit SVG rendering
                },
                // Add the filter style here based on your 'filter' prop if it applies to the SVG container
                filter: filter ? 'grayscale(100%)' : 'none', // Example: Apply filter style here
            }}>

                {/* --- THIS IS THE KEY CHANGE --- */}
                {/* Conditionally render the SVG using dangerouslySetInnerHTML */}
                {svg && (
                    <Box
                        component="span" // Use a span or div, as you are injecting HTML
                        sx={{
                            display: 'flex', // To center SVG if it doesn't fill its container
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%', // SVG should fill the parent Box
                            height: '100%', // SVG should fill the parent Box
                            // The 'icon' class could be applied directly to the inner SVG if needed
                            // For example, if you have global CSS for .icon
                            '& svg': { // Target the actual SVG element inside this Box
                                width: '100%',
                                height: '100%',
                            }
                        }}
                        // Apply the filter class if it's meant for the SVG itself
                        // className={`${filter ? 'filter ' : ''} icon`} // If 'filter' class applies directly to SVG
                        dangerouslySetInnerHTML={{ __html: svg }}
                    />
                )}
                {/* --- END KEY CHANGE --- */}

            </Box>
            <Typography
                variant='h3'
                sx={{
                fontSize: {
                    xs: '.86em',
                    sm: '1em'
                }
            }}>{title}</Typography>
        </Box>
    )
}

export default ToolCard