const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(__dirname, '../public/blog');
const outputFile = path.join(blogDir, 'articles.json');

// Créer le dossier blog s'il n'existe pas
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// Lire tous les fichiers markdown
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

const articles = files.map(file => {
  const filePath = path.join(blogDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);
  
  // Extraire le slug du nom de fichier
  const slug = file.replace('.md', '');
  
  return {
    slug,
    title: data.title || 'Sans titre',
    date: data.date || new Date().toISOString(),
    image: data.image || null,
    summary: data.summary || '',
    keywords: data.keywords || ''
  };
});

// Trier par date décroissante
articles.sort((a, b) => new Date(b.date) - new Date(a.date));

// Écrire le fichier JSON
fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));

console.log(`✅ ${articles.length} article(s) généré(s) dans articles.json`);
