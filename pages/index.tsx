import {Box, Backdrop, CircularProgress, Typography} from '@mui/material';
import type {NextPage} from 'next';
import Experience from '../src/components/Sections/TechTools/TechTools';
import Hero from '../src/components/Sections/Hero/Hero';
import Perks from '../src/components/Sections/Perks/Perks';
import Projects from '../src/components/Sections/Projects/Projects';
import CTA from '../src/components/Sections/CallToAction/CTA';
import {useEffect, useRef, useState} from 'react';
import CursorAnimation from '../src/gsap/CursorAnimation';
import About from '../src/components/Sections/About/About';
import Layout from '../Layout/Layout';
import Head from 'next/head';

interface HomeProps {
    projectsArray: any[];
    iconsArray: any[];
}

const Home: NextPage<HomeProps> = ({projectsArray, iconsArray}) => {
    const ball = useRef<HTMLDivElement>(null);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        // Dynamically import AOS to avoid SSR issues if not handled globally in _app.tsx
        // Ensure AOS is installed: npm install aos OR yarn add aos
        try {
            const AOS = require('aos');
            AOS.init({ once: true });
        } catch (error) {
            console.warn("AOS not found. Please install with 'npm install aos' or 'yarn add aos'.");
        }

        if (ball.current) {
            CursorAnimation(ball.current);
        }

        setPageLoading(false);
    }, []);

    // Show a loading spinner if data isn't available yet (mostly for dev mode initial load)
    if (pageLoading && (iconsArray.length === 0 && projectsArray.length === 0)) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
                <Typography sx={{ ml: 2 }}>Loading your portfolio data...</Typography>
            </Backdrop>
        );
    }

    return (
        <Layout
            desc={`Mutiso Juma, A Kenyan professional software engineer in Nairobi, Can develop all kinds of websites and web/mobile applications according to your needs`}
            title='Mutiso Juma Fullstack Developer Personal Portfolio Website'
        >
            <Head>
                {/* Ensure your favicon is correctly linked from the public directory */}
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box
                sx={{
                    margin: '0 auto',
                    color: 'white'
                }}
            >
                <Hero/>
                <Perks/>
                {/* Always pass arrays to prevent issues */}
                <Experience iconsArray={iconsArray} />
                <Projects projectsArray={projectsArray} />
                <About/>
                <CTA/>
                

                <Box
                    ref={ball}
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'block'
                        }
                    }}
                    className="ball"
                ></Box>
            </Box>
        </Layout>
    );
};

export default Home;

export async function getStaticProps() {
    function removeEmpty(obj: any) {
        return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v !== false));
    }

    let projectsArray: any[] = [];
    let iconsArray: any[] = [];

    try {
        const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
        const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

        if (!space || !accessToken) {
            console.error("ENVIRONMENT VARIABLE ERROR: Contentful SPACE_ID or ACCESS_TOKEN are not defined.");
            console.error("Please ensure you have a .env.local file in your project root with:");
            console.error("NEXT_PUBLIC_CONTENTFUL_SPACE_ID=YOUR_SPACE_ID");
            console.error("NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=YOUR_ACCESS_TOKEN");
            return {
                props: {
                    projectsArray: [],
                    iconsArray: []
                },
                revalidate: 60
            };
        }

        const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${space}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                // THIS IS THE GRAPHQL QUERY STRING - IT MUST BE EXACT
                query: `
                {
                  projectsCollection {
                    items {
                      title
                      repoUrl
                      siteUrl
                      description
                      img {
                        url
                      }
                    }
                  }
                  iconCollection {
                    items {
                      filter
                      svg
                      title
                      isBackend
                    }
                  }
                }`
            })
        });
    

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`CONTENTFUL FETCH ERROR: HTTP Status ${res.status} - ${res.statusText}`);
            console.error(`Response body: ${errorText}`);
            throw new Error(`Contentful API responded with status ${res.status}`);
        }

        const { data, errors } = await res.json();

        if (errors && errors.length > 0) {
            console.error('CONTENTFUL GRAPHQL ERROR:', errors);
            throw new Error('GraphQL errors found in Contentful response.');
        }

        if (!data || !data.projectsCollection || !data.projectsCollection.items ||
            !data.iconCollection || !data.iconCollection.items) {
            console.warn('CONTENTFUL DATA MISSING: Expected collections or items are missing from Contentful response.');
            return {
                props: {
                    projectsArray: [],
                    iconsArray: []
                },
                revalidate: 60
            };
        }

       // projectsArray = data.projectsCollection.items;

       // === CHANGE STARTS HERE ===
        // Map over the items to transform the 'img' object into just its 'url'
        projectsArray = data.projectsCollection.items.map((projectItem: any) => ({
            title: projectItem.title,
            repoUrl: projectItem.repoUrl,
            siteUrl: projectItem.siteUrl,
            description: projectItem.description,
            // Ensure projectItem.img exists before trying to access .url
            img: projectItem.img ? projectItem.img.url : null // Set to null if img is missing
        }));
        // === CHANGE ENDS HERE ===

        for (let i = 0; i < data.iconCollection.items.length; i++) {
            let clearedIcon = removeEmpty(data.iconCollection.items[i]);
            iconsArray.push(clearedIcon);
        }

        return {
            props: {
                projectsArray,
                iconsArray
            },
            revalidate: 60
        };

    } catch (err: any) {
        console.error('FINAL GETSTATICPROPS ERROR:', err);

        if (err instanceof Error) {
            console.error('Error message:', err.message);
        } else if (typeof err === 'string') {
            console.error('Error string:', err);
        } else {
            console.error('Unknown error object caught:', err);
        }

        return {
            props: {
                projectsArray: [],
                iconsArray: []
            },
            revalidate: 60
        };
    }
}

