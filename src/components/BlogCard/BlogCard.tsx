// src/components/BlogCard/BlogCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { IBlogPost } from '../../Types/Types';

const BlogCard = ({ post }: { post: IBlogPost }) => {
  return (
    // Outer container for the card itself
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Column on small, Row on medium+
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        mb: '1.5rem', // Margin-bottom for spacing between cards
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        bgcolor: '#fff',
        width: '100%', // Crucial: Always take 100% of the parent's width
        height: { xs: 'auto', md: '250px' }, // Auto height on small, fixed height on medium+ for row layout
        // No horizontal margins here; let the parent handle overall page padding
      }}
    >
      <Link href={`/blog/${post.slug}`} passHref style={{ display: 'flex', width: '100%', height: '100%', textDecoration: 'none', color: 'inherit' }}>
        {/* Inner container for image and text content, responsive flex */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, // Matches outer card's flex direction
            width: '100%',
            height: '100%',
          }}
        >
          {/* Image Container */}
          <Box
            sx={{
              position: 'relative', // CRUCIAL for next/image fill
              width: { xs: '100%', md: '40%' }, // 100% width on small, 40% on medium+
              paddingBottom: { xs: '56.25%', md: '0' }, // 16:9 aspect ratio on small, none on medium+
              height: { xs: 'auto', md: '100%' }, // Auto height on small, 100% of parent on medium+
              overflow: 'hidden',
              borderRadius: { xs: '8px 8px 0 0', md: '8px 0 0 8px' }, // Rounded corners
              flexShrink: 0, // Prevents image from shrinking in flex row layout
            }}
          >
            {post.featuredImage && (
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                fill // Use fill as intended
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </Box>

          {/* Text Content Container */}
          <Box
            sx={{
              p: { xs: '1rem', md: '1.5rem' }, // padding
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: { xs: '100%', md: '60%' }, // 100% width on small, 60% on medium+
            }}
          >
            <Typography variant="h2" sx={{ fontSize: '1.5rem', mb: '0.5rem', color: '#333' }}>
              {post.title}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1rem', color: '#666', flexGrow: 1, mb: '1rem' }}>
              {post.description}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '0.85rem', color: '#999', textAlign: 'right' }}>
              {new Date(post.publishDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default BlogCard;