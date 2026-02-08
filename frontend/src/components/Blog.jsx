import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blog.scss';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les articles depuis le dossier public/blog
    const loadArticles = async () => {
      try {
        // On va chercher les fichiers markdown dans le dossier blog
        const response = await fetch('/blog/articles.json');
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch (error) {
        console.log('Aucun article trouvé pour le moment');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="blog">
        <div className="blog-container">
          <h1>Blog - Les Runes et Leur Sagesse</h1>
          <p className="subtitle-seo">Articles et Guides sur la Divination Runique</p>
          <p>Chargement des articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog">
      <div className="blog-container">
        <h1>Blog - Les Runes et Leur Sagesse</h1>
        <p className="subtitle-seo">Articles et Guides sur la Divination Runique</p>

        {articles.length === 0 ? (
          <div className="no-articles">
            <p>📝 Les premiers articles arrivent bientôt !</p>
            <p>Découvrez prochainement des guides sur les runes, leurs significations et comment les interpréter.</p>
          </div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <Link to={`/blog/${article.slug}`} key={article.slug} className="article-card">
                {article.image && (
                  <img src={article.image} alt={article.title} className="article-image" />
                )}
                <div className="article-content">
                  <h2>{article.title}</h2>
                  <p className="article-date">
                    {new Date(article.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                  {article.summary && <p className="article-summary">{article.summary}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
