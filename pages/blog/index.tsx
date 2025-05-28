/*
// pages/blog/index.tsx
import { GetStaticProps } from 'next';
import { request } from 'graphql-request';
import BlogCard from '../../src/components/BlogCard/BlogCard';
import { IBlogPost } from '../../src/Types/Types'; // Your updated type path



// pages/blog/index.tsx
// ... (other imports)

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

// ... (rest of your index.tsx code)



interface AllBlogPostsResponse {
  blogPostCollection: {
    items: IBlogPost[];
  };
}

interface BlogPageProps {
    posts: IBlogPost[];
}

const BlogPage = ({ posts }: BlogPageProps) => {
    return (
        <div>
            <h1>My Blog</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {posts.map((post) => (
                    <BlogCard key={post.sys.id} post={post} />
                ))}
            </div>
        </div>
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



// pages/blog/index.tsx
import { GetStaticProps } from 'next';
import { request } from 'graphql-request';
import BlogCard from '../../src/components/BlogCard/BlogCard';
import { IBlogPost } from '../../src/Types/Types';
import { Typography, Box } from '@mui/material'; // Import Typography and Box from Material-UI
import { useContext } from 'react'; // Import useContext hook
import { ColorModeContext } from '../_app'; // Assuming _app.tsx is in the parent directory
import Layout from '../../Layout/Layout';

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
    // Access the color mode from the context
    const colorMode = useContext(ColorModeContext);
    // Determine text and background colors based on the current mode
    const textColor = colorMode.mode === 'light' ? 'black' : 'white';
    const bgColor = colorMode.mode === 'light' ? 'white' : 'black';

    return (
        

        // Apply dynamic background color to the main container
        <Box
            sx={{
                minHeight: '100vh', // Ensure it takes at least the full viewport height
                py: 4, // Padding top/bottom
                bgcolor: bgColor, // Dynamic background color
                color: textColor, // Dynamic default text color for the page
                transition: 'background-color 0.3s ease, color 0.3s ease', // Smooth transition for theme change
            }}
        >
            <Typography
                variant="h1" // Use Material-UI Typography for the heading
                sx={{
                    textAlign: 'center',
                    color: textColor, // Ensure the H1 text color adapts
                    mb: 4, // Margin bottom for spacing
                    fontSize: { xs: '2.5em', sm: '3.5em', md: '4em' }, // Responsive font sizes
                    fontWeight: 'bold',
                }}
            >
                My Blog
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                    maxWidth: '100vw', // Limit content width
                    margin: '0 auto', // Center the grid
                    px: { xs: 2, sm: 3, md: 4 }, // Responsive horizontal padding
                }}
            >
                {posts.map((post) => (
                    <BlogCard key={post.sys.id} post={post} />
                ))}
            </Box>
        </Box>
        
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

*/

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
        // Wrap your page content with the Layout component

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
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '20px',
                        maxWidth: '100vw',
                        margin: '0 auto',
                        px: { xs: 2, sm: 3, md: 4 },
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