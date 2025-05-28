/*

import { Box } from "@mui/material";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ISocialMedia {
    title: string;
    svg: string;
    href: string;
    color: string;
}

interface SocialMediaIconProps extends ISocialMedia {
    size?: string; // e.g., "2.5em", "40px" - this will control the overall icon size
}

const SocialMediaIcon = ({ title, svg, href, color, size = '2.5em' }: SocialMediaIconProps) => {

    // Convert size to a number for Next.js Image component width/height
    // Assuming 1em = 16px. Adjust if your root font size is different.
    const numericSize = parseFloat(size) * (size.includes('em') ? 16 : 1);

    return (
        <Link href={href} passHref legacyBehavior>
            <Box
                component="a" // This Box renders as an anchor <a> tag
                target="_blank"
                rel="noreferrer"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // Set the overall size of the clickable circular area
                    width: size,
                    height: size,
                    borderRadius: '50%', // Makes it circular
                    bgcolor: color,
                    overflow: 'hidden', // Crucial to clip any overflowing SVG content (like embedded text)
                    transition: 'transform 0.2s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                    // Add some margin for spacing between icons if SocialMedia.tsx doesn't use gap
                    // mr: '1em', // Optional: if parent uses flex but not gap
                }}
            >
                <Image
                    alt={title} // Good for accessibility
                    src={svg || ''}
                    // Set the size of the *actual SVG graphic* within the circular background
                    // This makes the icon fit well inside the circle. Adjust 0.7 as needed.
                    width={numericSize * 0.7}
                    height={numericSize * 0.7}
                    objectFit="contain" // Ensures the SVG scales correctly within its bounds
                    // This filter converts any color SVG to white, useful for colored backgrounds
                    style={{ filter: 'brightness(0) invert(1)' }}
                />
            </Box>
           
           
        </Link>
    );
};

export default SocialMediaIcon;

*/

// src/components/Contact/SocialMediaIcon.tsx

import { Box } from "@mui/material";
// import Image from 'next/image'; // NO LONGER NEEDED
import Link from 'next/link';
import React from 'react';

interface ISocialMedia {
    title: string;
    svg: string; // The URL to the SVG
    href: string;
    color: string;
}

interface SocialMediaIconProps extends ISocialMedia {
    size?: string; // e.g., "2.5em", "40px"
}

const SocialMediaIcon = ({ title, svg, href, color, size = '3.5em' }: SocialMediaIconProps) => { // Increased default size slightly

    // Numeric size for applying directly to img width/height
    const numericSize = parseFloat(size) * (size.includes('em') ? 16 : 1);

    return (
        <Link href={href} passHref legacyBehavior>
            <Box
                component="a"
                target="_blank"
                rel="noreferrer"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: size,   // Overall size of the circular background
                    height: size,
                    borderRadius: '50%',
                    bgcolor: color,
                    overflow: 'hidden', // Still important to clip any excess content
                    transition: 'transform 0.2s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Optional: subtle shadow for depth
                }}
            >
                {/* Use a regular <img> tag instead of next/image */}
                <img
                    src={svg || ''}
                    alt={title}
                    // Apply exact numeric dimensions derived from 'size' prop
                    // Make the image slightly smaller than the container for padding, e.g., 90% of the circle
                    width={numericSize * 0.7} // <--- Adjust this factor (0.7 to 1.0) for icon size within circle
                    height={numericSize * 0.7} // <--- Adjust this factor for height
                    style={{
                        display: 'block', // Helps remove any extra space around the image
                        maxWidth: '100%', // Ensure it doesn't overflow its explicit width
                        maxHeight: '100%', // Ensure it doesn't overflow its explicit height
                        objectFit: 'contain', // Keep aspect ratio and fit within bounds
                        filter: 'brightness(0.5) invert(1)', // Still convert to white
                    }}
                />
            </Box>
        </Link>
    );
};

export default SocialMediaIcon;