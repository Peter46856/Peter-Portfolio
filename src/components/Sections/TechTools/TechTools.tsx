import { Container, Typography, Box, Divider } from '@mui/material'; // Removed Grid, added Box
import { useContext, useEffect } from 'react';
import { ColorModeContext } from '../../../../pages/_app';
import MainTitleAnimation from '../../../gsap/MainTitleAnimation';
import { centeredStyles } from '../Perks/Perks';
import ToolCard from './ToolCard';
import gsap from 'gsap';

const TechTools = ({ iconsArray }: any) => {
    let FrontendTools = iconsArray && iconsArray.filter((icon: any) => !icon.isBackend)
    let OtherTools = iconsArray && iconsArray.filter((icon: any) => icon.isBackend)

    const colorMode = useContext(ColorModeContext)
    // turn off "filter" mode when the theme is set to dark mode
    const isfilterMode = (item: any) => colorMode
        ?.mode === 'light'
        ? false
        : item
        ?.filter

    useEffect(() => {
        MainTitleAnimation('.title1', '.title2')
        gsap.to('.secondTitle', {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: '.secondTitle',
                start: 'top 70%'
            }
        })
    }, [])

    return (
        <>
            <Container
                maxWidth='lg'
                sx={{
                    margin: '0 auto',
                    py: {
                        xs: '6em'
                    },
                    display: 'flex', // Enable flexbox for the container
                    flexDirection: 'column', // Stack children vertically
                    alignItems: 'center', // Center items horizontally
                    gap: '3em' // Space between sections (title, frontend tools, other tools)
                }}>

                {/* Replaced Grid container and Grid item with Box */}
                <Box sx={centeredStyles}>
                    <Typography
                        className=' title1 t25o0'
                        variant='h1'
                        sx={{
                            fontSize: {
                                xs: '2.2em',
                                sm: '2.5em',
                                md: '3em'
                            }
                        }}
                        fontWeight='600'>
                        Tools Of The Present And Future
                    </Typography>
                    <Typography
                        variant='h2'
                        className='secondary title2 t25o0'
                        sx={{
                            pt: '1.5em',
                            maxWidth: '570px',
                            fontSize: {
                                xs: '.8em',
                                sm: '1em'
                            }
                        }}>
                        Frontend technologies I prefer using
                    </Typography>
                </Box>

                {/* Replaced Grid item for FrontendTools with Box */}
                <Box
                    sx={{
                        ...centeredStyles, // Inherit centering for its content
                        flexDirection: 'row', // Arrange children in a row
                        justifyContent: {
                            xs: "center"
                        },
                        mt: '1em', // Adjusted margin-top, was '3em' previously, but now container has gap
                        flexWrap: 'wrap', // Allow tools to wrap to the next line
                        gap: '2em', // Space between individual tool cards
                        width: '100%' // Ensure it takes full available width
                    }}
                >
                    {FrontendTools && FrontendTools.map((item: any) => {
                        return <ToolCard
                            className='toolCard1'
                            filter={isfilterMode(item)}
                            svg={item.svg}
                            title={item.title}
                            key={item.title} />
                    })}
                </Box>

                {/*
                 
                {OtherTools && OtherTools.length > 0 ? (
                    <>
                       
                        <Box sx={centeredStyles}>
                            <Typography
                                variant='h2'
                                className='secondary secondTitle t25o0'
                                sx={{
                                    pt: '3.5em',
                                    opacity: 0,
                                    fontSize: {
                                        xs: '.8em',
                                        sm: '1em'
                                    }
                                }}>
                                Other technologies
                            </Typography>
                        </Box>
                        
                        <Box
                            sx={{
                                ...centeredStyles, // Inherit centering for its content
                                flexDirection: 'row', // Arrange children in a row
                                justifyContent: {
                                    xs: "center"
                                },
                                mt: '1em', // Adjusted margin-top
                                flexWrap: 'wrap', // Allow tools to wrap to the next line
                                gap: '2em', // Space between individual tool cards
                                width: '100%' // Ensure it takes full available width
                            }}
                        >
                            {OtherTools.map((tool: any) => {
                                return <ToolCard
                                    className='toolCard2'
                                    filter={isfilterMode(tool)}
                                    svg={tool.svg}
                                    title={tool.title}
                                    key={tool.title} />
                            })}
                        </Box>
                    </>
                ) : (
                    <Typography sx={{ margin: '0 auto', fontSize: '1em', fontWeight: '500', color: 'red' }} variant='h1'>There was an error loading the items.</Typography>
                )}
                */}

            </Container>
            <Divider />
        </>
    )
}

export default TechTools;