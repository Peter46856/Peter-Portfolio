

// pages/blog/index.tsx
import { GetStaticProps } from 'next';
import { request } from 'graphql-request';
import BlogCard from '../../src/components/BlogCard/BlogCard';
import { IBlogPost } from '../../src/Types/Types';
import { Typography, Box } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../_app';
import Layout from '../../Layout/Layout'; // Correctly import your Layout component

const AllBlogPosts = `
query {
  blogPostCollection(order: publishDate_DESC) {
    items {
      sys {
        id
      }
      title
      slug
      description
      publishDate
      featuredImage {
        url
        width
        height
      }
    }
  }
}
`;

interface AllBlogPostsResponse {
  blogPostCollection: {
    items: IBlogPost[];
  };
}

interface BlogPageProps {
    posts: IBlogPost[];
}

const BlogPage = ({ posts }: BlogPageProps) => {
    const colorMode = useContext(ColorModeContext);
    const textColor = colorMode.mode === 'light' ? 'black' : 'white';
    const bgColor = colorMode.mode === 'light' ? 'white' : 'grey';

    return (
        <Layout
            desc={`Mutiso Juma, A Kenyan professional software engineer in Nairobi, Can develop all kinds of websites and web/mobile applications according to your needs`}
            title='Mutiso Juma Fullstack Developer Personal Portfolio Website'>
            <Box
                sx={{
                    minHeight: '100vh',
                    py: 4,
                    bgcolor: bgColor,
                    color: textColor,
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        textAlign: 'center',
                        color: textColor,
                        mb: 4,
                        fontSize: { xs: '2.5em', sm: '3.5em', md: '4em' },
                        fontWeight: 'bold',
                    }}
                >
                    My Blog
                </Typography>
                {/* THIS IS THE CONTAINER THAT WRAPS ALL BLOG CARDS */}
                {/* It will just be a block container with padding, causing cards to stack */}
                <Box
                    sx={{
                        // Overall page horizontal padding to control card width
                        px: { xs: '1rem', sm: '1rem', md: '1rem', lg: '2rem' }, // Adjust these values for desired max width
                        maxWidth: '1200px', // Max width of the content area
                        margin: '0 auto', // Center the entire content block
                        display: 'flex', // Use flex to allow vertical stacking
                        flexDirection: 'column', // Stack cards vertically
                        gap: '1.5rem', // Space between cards
                    }}
                >
                    {posts.map((post) => (
                        <BlogCard key={post.sys.id} post={post} />
                    ))}
                </Box>
            </Box>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
    const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

    if (!spaceId || !accessToken) {
        console.error("Contentful environment variables not set.");
        return {
            props: { posts: [] },
            revalidate: 60,
        };
    }

    const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master?access_token=${accessToken}`;

    try {
        const data = await request<AllBlogPostsResponse>(endpoint, AllBlogPosts);
        const posts = data.blogPostCollection.items;

        return {
            props: { posts },
            revalidate: 60,
        };
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return {
            props: { posts: [] },
            revalidate: 60,
        };
    }
};

export default BlogPage;