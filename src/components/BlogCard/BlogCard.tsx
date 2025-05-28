// src/components/BlogCard/BlogCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { IBlogPost } from '../../Types/Types'; // Adjust the import path as necessary
import styles from './BlogCard.module.css'; // Import the CSS module

const BlogCard = ({ post }: { post: IBlogPost }) => {
  return (
    <div className={styles.blogCard}>
      {/* Remove the <a> tag directly inside <Link> */}
      <Link href={`/blog/${post.slug}`} passHref>
        {/* The content that you want to be clickable should be directly inside <Link> */}
        {/* If you need to style the clickable area, apply classes/styles to the container directly */}
        <div className={styles.blogCardContent}>
          <div className={styles.blogImageContainer}>
            {post.featuredImage && (
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                
                fill // Use fill instead of layout="responsive"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
          <div className={styles.blogTextContent}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <small>{new Date(post.publishDate).toLocaleDateString()}</small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;