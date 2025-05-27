import {Box} from '@mui/material'
import CustomLink from '../Mui/CustomLink'
import {useRouter} from 'next/router';
import gsap from 'gsap';
import Image from 'next/image'


const Logo = ({toggleDrawer, colorMode, color} : any) => {
    const router = useRouter()
    return (
        <Box
            onClick={() => {
            toggleDrawer(false);
            if (router.pathname !== '/') 
         {   console.log('pathname: ', router);
         router.push('/');
        }
                gsap.to(window, {
                    duration: 1,
                    scrollTo: `#hero`
                });
            }}
            sx={{
                flex:1,
                cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
        }}>

            <Image
                className={`${colorMode.mode === 'dark'
                ? 'logoImg '
                : ''}small`}
               
                src="https://res.cloudinary.com/dr4ssexud/image/upload/v1747987472/default_hjvzpb.png"
                alt="logo"
                 width='30' 
                 height='30'/>
                 
            <CustomLink color={color} fontWeight='600' text='Mutiso Juma Peter' href='/'/>
        </Box>
    )
}

export default Logo