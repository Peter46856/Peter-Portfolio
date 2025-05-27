
// Example BlogCard Component (create this in src/components/BlogCard.tsx)



import Link from 'next/link';
import Image from 'next/image';
import { IBlogPost } from '../../Types/Types'; // Adjust the import path as necessary
import styles from './BlogCard.module.css'; // Import the CSS module

const BlogCard = ({ post }: { post: IBlogPost }) => {
  return (
    <div className={styles.blogCard}>
      <Link href={`/blog/${post.slug}`} passHref>
        <a className={styles.blogCardContent}>
          <div className={styles.blogImageContainer}>
            {post.featuredImage && (
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                width={post.featuredImage.width}
                height={post.featuredImage.height}
                layout="responsive"
                objectFit="cover"
              />
            )}
          </div>
          <div className={styles.blogTextContent}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <small>{new Date(post.publishDate).toLocaleDateString()}</small>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default BlogCard;



