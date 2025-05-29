// pages/blog/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { request } from 'graphql-request';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Image from 'next/image';
import { Typography, Box, Container } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../_app';
import Layout from '../../Layout/Layout'; // Import your Layout component

// --- NEW INTERFACES FOR GRAPHQL RESPONSES ---
interface AllBlogSlugsResponse {
  blogPostCollection: {
    items: {
      slug: string;
    }[];
  };
}

interface SingleBlogPostResponse {
  blogPostCollection: {
    items: SingleBlogPost[];
  };
}
// --- END NEW INTERFACES ---

// GraphQL query for a single blog post by slug
const SINGLE_BLOG_POST_QUERY = `
query BlogPostBySlug($slug: String!) {
  blogPostCollection(where: { slug: $slug }, limit: 1) {
    items {
      sys {
        id
      }
      title
      slug
      publishDate
      featuredImage {
        url
        width
        height
      }
      content {
        json
        links {
          assets {
            block {
              sys {
                id
              }
              url
              width
              height
              description
            }
          }
        }
      }
    }
  }
}
`;

// GraphQL query for all slugs (for getStaticPaths)
const ALL_BLOG_SLUGS_QUERY = `
query {
  blogPostCollection {
    items {
      slug
    }
  }
}
`;

interface SingleBlogPost {
  sys: { id: string };
  title: string;
  slug: string;
  publishDate: string;
  featuredImage: { url: string; width: number; height: number; };
  content: {
    json: any;
    links: {
      assets: {
        block: {
          sys: {
            id: string;
          };
          url: string;
          width: number;
          height: number;
          description: string;
        }[];
      };
    };
  };
}

interface SingleBlogPostPageProps {
  post: SingleBlogPost | null;
}

const BlogPage = ({ post }: SingleBlogPostPageProps) => {
  const colorMode = useContext(ColorModeContext);
  const textColor = colorMode.mode === 'light' ? 'black' : 'white';
  const bgColor = colorMode.mode === 'light' ? 'white' : 'dark';
  const mutedTextColor = colorMode.mode === 'light' ? 'textSecondary' : '#bbb';

  // Handle loading or post not found *within* the Layout
  if (!post) {
    return (
      <Layout title="Post Not Found"> {/* Provide a fallback title for the Layout */}
        <Box sx={{ minHeight: '100vh', py: 4, bgcolor: bgColor, color: textColor, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ color: textColor }}>Loading or Post not found...</Typography>
        </Box>
      </Layout>
    );
  }

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = post.content.links?.assets?.block?.find(
          (item: any) => item.sys.id === node.data.target.sys.id
        );
        if (asset) {
          return (
            <Box sx={{ my: 2 }}>
              <Image
                src={`https:${asset.url}`}
                alt={asset.description || post.title}
                width={asset.width}
                height={asset.height}
                layout="responsive"
                objectFit="contain"
              />
            </Box>
          );
        }
        return null;
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer" style={{ color: colorMode.mode === 'light' ? '#0092ff' : '#64b5f6' }}>
          {children}
        </a>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <Typography variant="body1" sx={{ mb: 1, color: textColor }}>{children}</Typography>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: any) => (
        <Typography variant="h3" sx={{ mt: 3, mb: 1, fontWeight: 'bold', color: textColor }}>{children}</Typography>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: textColor }}>{children}</Typography>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul style={{ marginLeft: '20px', marginBottom: '10px', color: textColor }}>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: any) => (
        <ol style={{ marginLeft: '20px', marginBottom: '10px', color: textColor }}>{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
        <li style={{ marginBottom: '5px', color: textColor }}>{children}</li>
      ),
    },
  };

  return (
    // Wrap the entire content with the Layout component, passing the post's title
    <Layout title={post.title}>
      <Container
          maxWidth="md"
          sx={{
              pt: { xs: '7.5em', sm: '8.5em' },
              pb: '4em',
              bgcolor: bgColor,
              color: textColor,
              transition: 'background-color 0.3s ease, color 0.3s ease',
              minHeight: '100vh',
              boxSizing: 'border-box',
          }}
      >
        <Typography variant="h2" component="h1" gutterBottom
            sx={{
                fontWeight: 'bold',
                fontSize: { xs: '2em', sm: '3em' },
                color: textColor,
            }}
        >
          {post.title}
        </Typography>
        {post.featuredImage && (
          <Box sx={{ mb: 4 }}>
            <Image
              src={`${post.featuredImage.url}`}
              alt={post.title}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              layout="responsive"
              objectFit="cover"
              priority
            />
          </Box>
        )}

        <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
                mb: 3,
                color: mutedTextColor,
            }}
        >
          Published on {new Date(post.publishDate).toLocaleDateString()}
        </Typography>
        <Box className="blog-content">
          {documentToReactComponents(post.content.json, options)}
        </Box>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId || !accessToken) {
    console.error("Contentful environment variables not set for getStaticPaths.");
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master?access_token=${accessToken}`;

  try {
    const data = await request<AllBlogSlugsResponse>(endpoint, ALL_BLOG_SLUGS_QUERY);
    const slugs = data.blogPostCollection.items.map((item) => item.slug);

    const paths = slugs.map((slug: string) => ({
      params: { slug },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error("Error fetching blog slugs for getStaticPaths:", error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<SingleBlogPostPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  if (!slug || !spaceId || !accessToken) {
    console.error("Missing slug or Contentful environment variables for getStaticProps.");
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master?access_token=${accessToken}`;

  try {
    const data = await request<SingleBlogPostResponse>(endpoint, SINGLE_BLOG_POST_QUERY, { slug });
    const post = data.blogPostCollection.items[0] || null;

    if (!post) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }

    return {
      props: { post },
      revalidate: 60,
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};

export default BlogPage;