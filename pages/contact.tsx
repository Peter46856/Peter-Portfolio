import {
    Box,
    Typography,
    Container,
    Button,
    TextField // Keep TextField for email, it will now be controlled like your custom Input
} from '@mui/material';
import { useRef, useEffect, useState, useContext } from 'react';
import HeroSectionAnimation from '../src/gsap/HeroSectionAnimation';
import gsap from 'gsap';
import { Divider } from '@mui/material';
import Input from '../src/components/Mui/Input'; // Your now-controlled custom Input component
import ContactBox from '../src/components/Contact/ContactBox';
import Layout from '../Layout/Layout';
import SocialMedia from '../src/components/Contact/SocialMedia';
import emailjs from '@emailjs/browser';
import { ColorModeContext } from './_app';

const Contact = () => {
    const colorMode = useContext(ColorModeContext);

    // Ref for the main container for GSAP animations
    const ref = useRef<HTMLDivElement>(null);
    // Ref for the form element, used by EmailJS
    const form = useRef<HTMLFormElement>(null);

    // State for each form field
    const [userName, setUserName] = useState<string>('');
    const [userPhone, setUserPhone] = useState<string>(''); // Keep as string for phone numbers (can have +,-,(), etc.)
    const [userEmail, setUserEmail] = useState<string>(''); // Renamed from 'email' to match 'user_email' name
    const [message, setMessage] = useState<string>('');

    // State for submission status
    const [status, setStatus] = useState<number>(0);

    // Colors for status message and input text
    const statusColor = status === 200 ? 'green' : 'red';
    // Let's rename this to avoid confusion with the input text color directly
    const generalInputColor = colorMode.mode === 'light' ? 'black' : 'white';


    // GSAP selector utility
    const q = gsap.utils.selector(ref);

    useEffect(() => {
        gsap.to('.gradientBg2', {
            opacity: 1,
            duration: '.7',
            delay: '.75'
        });
        if (ref.current) {
            HeroSectionAnimation(q);
        }
    }, [q]);

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Ensure form reference is available
        if (!form.current) {
            console.error("Form reference is not available.");
            setStatus(500); // Indicate an error
            return;
        }

        // Basic email validation using the userEmail state
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!userEmail.match(regexEmail)) {
            setStatus(400); // Bad Request for invalid email
            return;
        }

        // Get environment variables for EmailJS
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateIdContact = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const templateIdAutoReply = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID; // Your auto-reply template ID
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        // Check if all necessary environment variables are defined
        if (!serviceId || !templateIdContact || !templateIdAutoReply || !publicKey) {
            console.error("EmailJS environment variables are not defined. Please check your .env.local file.");
            setStatus(500); // Indicate a server configuration error
            return;
        }

        try {
            // 1. Send the contact form email to yourself
            const resContact = await emailjs.sendForm(serviceId, templateIdContact, form.current, publicKey);

            if (resContact.status === 200) {
                setStatus(200); // Success status

                // Clear all form fields after successful submission
                setUserName('');
                setUserPhone('');
                setUserEmail('');
                setMessage('');

                // 2. Send the auto-reply email to the user
                try {
                    await emailjs.sendForm(serviceId, templateIdAutoReply, form.current, publicKey);
                    console.log("Auto-reply sent successfully!");
                } catch (autoReplyError) {
                    // Log auto-reply error but don't change main status
                    console.error("Failed to send auto-reply:", autoReplyError);
                }

            } else {
                // Set status based on the contact email result if not 200
                setStatus(resContact.status);
            }
        } catch (error) {
            // Catch any general errors during the send process
            console.error("Failed to send contact email:", error);
            setStatus(500); // Indicate a server error
        }
    };

    return (
        <Layout
            title='Mutiso Juma contact page'
            desc='If you have questions or need help you can contact me at pjuma655@gmail.com | Or Send a Message through the form.'>

            <Box sx={{ overflowX: 'hidden' }}>
                <Container
                    id='hero'
                    maxWidth='lg'
                    sx={{
                        margin: '0 auto',
                        pt: { xs: '7.5em', sm: '8.5em' },
                        position: 'relative'
                    }}>
                    {/* Your existing decorative Box elements */}
                    <Box
                        sx={{
                            width: '150px',
                            height: '150px',
                            zIndex: '0',
                            position: 'absolute',
                            top: { xs: '60%', sm: '75%' },
                            transform: 'rotate(15deg)',
                            right: { xs: '80%', sm: '86%' },
                            background: 'transparent',
                            backgroundImage: 'radial-gradient(#0092ff 2px, transparent 0)',
                            backgroundSize: '15px 13px',
                            

                        }}></Box>
                    <Box
                        className='gradientBg2'
                        sx={{
                            width: '90px',
                            height: '90px',
                            zIndex: '0',
                            position: 'absolute',
                            top: { xs: '6%', sm: '5%' },
                            opacity: 0,
                            right: '-4%',
                            background: 'transparent',
                            backgroundImage: 'radial-gradient(#0092ff 2px, transparent 0)',
                            backgroundSize: '15px 13px'
                        }}></Box>

                    <Box ref={ref}>
                        <Typography
                            className='t1'
                            variant='h1'
                            sx={{
                                fontSize: { xs: '2.4em', sm: '3.4em', md: '3.8em' },
                                textAlign: 'center',
                                transform: 'translateY(40px)',
                                opacity: 0,
                                pt: '1em',
                                fontWeight: '600'
                            }}>
                            Let&apos;s achieve the impossible together
                        </Typography>
                        <Typography
                            variant='h2'
                            className='secondary t2 t25o0'
                            sx={{
                                textAlign: 'center',
                                pt: '1.5em',
                                margin: '0 auto',
                                fontSize: { xs: '.9em', sm: '1em' },
                                maxWidth: '570px',
                                fontWeight: '300'
                            }}>
                            If you need help or have some questions, I&apos;ll be there ready and happy to help.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            justifyContent: 'center',
                            display: 'flex',
                            margin: '0 auto',
                            flexDirection: 'column',
                            width: { xs: '100%', md: '600px' }
                                                    }}>

                        <Box
                            ref={form}
                            onSubmit={sendEmail}
                            component='form'
                            sx={{
                                mt: '6em',
                                justifyContent: 'space-between'
                               
                            }}>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    pb: '1em',
                                    color: statusColor // Use statusColor here
                                }}>
                                {status === 200 && 'Message sent. Expect a reply soon!'}
                                {status === 400 && 'Please enter a valid email address.'}
                                {status === 500 && 'There was an error sending your message. Please try again later.'}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '1em' }}>
                                {/* Controlled Input for Name */}
                                <Input 
                                    name="user_name"
                                    label='Name'
                                    value={userName}
                                    
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                {/* Controlled Input for Phone */}
                                <Input
                                    name="user_phone"
                                    type='number'
                                    label='Phone'
                                    value={userPhone}
                                    onChange={(e) => setUserPhone(e.target.value)}
                                />
                            </Box>

                            {/* Controlled TextField for Email */}
                            <TextField
                                name={'user_email'}
                                type={'email'}
                                value={userEmail} // Now tied to userEmail state
                                onChange={(e) => setUserEmail(e.target.value)} // Updates userEmail state
                                sx={{
                                    // Remove 'color' from the root sx, as it can apply to other elements.
                                    // color: generalInputColor, // <-- Remove or comment out this line

                                    input: { color: generalInputColor }, // <-- This directly targets the input text
                                    width: '100%',
                                    mt: '1em',
                                    // Add consistent styling for outline, hover, and focus for TextField too
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: colorMode.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.7)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#0092ff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#0092ff',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: generalInputColor, // Also set label color explicitly for consistency
                                        '&.Mui-focused': {
                                            color: '#0092ff', // Focus color for the label
                                        },
                                    },
                                    // This rule is generally not needed if 'input' selector is used.
                                    // '& .MuiInputBase-input': {
                                    //     color: 'inherit',
                                    // },
                                }}
                                label={'Email'}
                                variant="outlined"
                            />

                            {/* Controlled Input for Message */}
                            <Input
                                name="message"
                                label='Message' // Label changed to 'Message' for clarity based on template
                                mt='1em'
                                multi={true}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <Button
                                type='submit'
                                className='loadMore'
                                variant='contained'
                                sx={{
                                    display: 'flex',
                                    margin: '4em auto ',
                                    padding: '.5em 3.5em',
                                    width: { xs: '100%', sm: '250px' },
                                    background: 'transparent',
                                    border: '1px solid',
                                    color: '#0092ff',
                                    ':hover': {
                                        border: '1px solid transparent'
                                    }
                                }}>
                                Send
                            </Button>

                        </Box>

                        <Divider />
                        <Box sx={{ my: '3em' }}>
                            <ContactBox
                                href='mailto:pjuma655@gmail.com'
                                target='_blank'
                                t1='Get in touch' t2='Email Address' t3='pjuma655@gmail.com' />
                            <ContactBox
                                href={`https://www.google.com/maps/place/Nairobi/@-1.303209,36.8473969,11z/data=!3m1!4b1!4m6!3m5!1s0x182f1172d84d49a7:0xf7cf0254b297924c!8m2!3d-1.2920659!4d36.8219462!16zL20vMDVkNDk?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D`}
                                target='_blank'
                                t1='Location'
                                t2='Currently living in' t3='Nairobi - Kenya' />
                            <ContactBox
                                target='_blank'
                                href={'https://wa.me/254718279984'}
                                t1='Contact Directly ' t2='Phone Number' t3='+254718279984' />
                        </Box>
                    </Box>
                    <SocialMedia />

                </Container>
            </Box>
        </Layout>
    );
};

export default Contact;