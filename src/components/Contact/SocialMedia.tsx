/*

import {Box} from "@mui/material"
import SocialMediaIcon from './SocialMediaIcon';

export const SocialMediaArray = [
    {
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/in/peter-juma-244967263',
        color: '#0e76a8',
        svg: 'https://www.svgrepo.com/show/138936/linkedin.svg'

    }, {
        color: '#171515',
        title: 'Github',
        href: 'https://github.com/Peter46856',
        svg: 'https://www.svgrepo.com/show/343674/github.svg'
    }, {
        title: 'Facebook',
        href: "https://www.facebook.com/vito.medlej.5/",
        color: '#4267B2',
        svg: 'https://www.svgrepo.com/show/158427/facebook.svg'
    }
]

const SocialMedia = () => {

    return (
        <Box sx={{
            pt: '1em',
            pb:'3em',
            display: 'flex'
        }}>
            {SocialMediaArray.map(icon => {

                return <SocialMediaIcon
                    svg={icon.svg}
                    key={icon.href}
                    title={icon.title}
                    href={icon.href}
                    color={icon.color}/>
            })}
        </Box>

    )
}

export default SocialMedia
*/

// src/components/SocialMedia.tsx

import {Box} from "@mui/material"
import SocialMediaIcon from './SocialMediaIcon'; // Make sure path is correct

export const SocialMediaArray = [
    {
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/in/peter-juma-244967263',
        color: '#0e76a8',
        svg: 'https://www.svgrepo.com/show/138936/linkedin.svg'
    }, {
        color: '#171515',
        title: 'Github',
        href: 'https://github.com/Peter46856',
        svg: 'https://www.svgrepo.com/show/343674/github.svg'
    }, {
        title: 'Facebook',
        href: "https://www.facebook.com/",
        color: '#4267B2',
        svg: 'https://www.svgrepo.com/show/158427/facebook.svg'
    }
]

const SocialMedia = () => {
    return (
        <Box sx={{
            pt: '1em',
            pb:'3em',
            display: 'flex',
            justifyContent: 'center', // Centers the group of icons
            alignItems: 'center', // Aligns them vertically (if they had different heights)
            gap: '1.5em', // Spacing between each icon
            flexWrap: 'wrap', // Allow icons to wrap on smaller screens if they become too wide
        }}>
            {SocialMediaArray.map(icon => {
                return <SocialMediaIcon
                    svg={icon.svg}
                    key={icon.href}
                    title={icon.title}
                    href={icon.href}
                    color={icon.color}
                    size="3.5em" // <--- START WITH THIS SIZE. Adjust as needed.
                                 // "3.5em" (approx 56px) is usually a good size for social icons.
                />
            })}
        </Box>
    )
}

export default SocialMedia