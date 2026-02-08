import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../styles/BlogArticle.scss';

const BlogArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch(`/blog/${slug}.md`);
        if (response.ok) {
          const content = await response.text();
          
          // Parser le frontmatter (titre, date, etc.)
          const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
          const match = content.match(frontmatterRegex);
          
          if (match) {
            const frontmatter = match[1];
            const body = match[2];
            
            const metadata = {};
            frontmatter.split('\n').forEach(line => {
              const [key, ...valueParts] = line.split(':');
              if (key && valueParts.length) {
                metadata[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
              }
            });
            
            setArticle({
              ...metadata,
              body
            });
          }
        }
      } catch (error) {
        console.error('Erreur chargement article:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-article">
        <div className="article-container">
          <p>Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="blog-article">
        <div className="article-container">
          <h1>Article introuvable</h1>
          <Link to="/blog" className="back-link">← Retour au blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-article">
      <div className="article-container">
        <Link to="/blog" className="back-link">← Retour au blog</Link>
        
        <article>
          <h1>{article.title}</h1>
          
          {article.date && (
            <p className="article-date">
              {new Date(article.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          )}
          
          {article.image && (
            <img src={article.image} alt={article.title} className="article-hero-image" />
          )}
          
          <div className="article-body">
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogArticle;
