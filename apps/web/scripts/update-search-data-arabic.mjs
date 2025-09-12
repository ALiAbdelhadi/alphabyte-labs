import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// الحصول على __dirname في ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const searchDataPath = join(__dirname, '../public/search-data/documents.json');
const searchData = JSON.parse(readFileSync(searchDataPath, 'utf8'));
const arabicContentPath = join(__dirname, '../contents/ar/docs');

function readArabicContent() {
  const arabicData = [];

  function processDirectory(dirPath, relativePath = '') {
    const items = readdirSync(dirPath);

    for (const item of items) {
      const itemPath = join(dirPath, item);
      const stat = statSync(itemPath);

      if (stat.isDirectory()) {
        processDirectory(itemPath, join(relativePath, item));
      } else if (item.endsWith('.mdx')) {
        const content = readFileSync(itemPath, 'utf8');
        const frontmatter = extractFrontmatter(content);
        const mdxContent = extractMdxContent(content);
        const baseName = item.replace(/\.mdx$/, '');
        const normalizedRel = relativePath ? relativePath.replace(/\\/g, '/') : '';
        const lastSegment = normalizedRel.split('/').filter(Boolean).slice(-1)[0];
        let slugPath = '';
        if (!normalizedRel) {
          slugPath = baseName === 'index' ? '' : baseName;
        } else if (baseName === 'index' || baseName === lastSegment) {
          slugPath = normalizedRel;
        } else {
          slugPath = `${normalizedRel}/${baseName}`;
        }
        slugPath = slugPath.replace(/\/+$/, '');

        if (frontmatter.title) {
          arabicData.push({
            slug: `${slugPath}`,
            title: frontmatter.title,
            description: frontmatter.description || '',
            content: mdxContent,
            keywords: Array.isArray(frontmatter.keywords)
              ? frontmatter.keywords
              : (frontmatter.keywords ? String(frontmatter.keywords).split(',').map(s => s.trim()) : []),
            isArabic: true
          });
        }
      }
    }
  }

  processDirectory(arabicContentPath);
  return arabicData;
}

function extractFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) return {};

  const frontmatter = {};
  const lines = frontmatterMatch[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // معالجة المصفوفات
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
      }

      frontmatter[key] = value;
    }
  }

  return frontmatter;
}

function extractMdxContent(content) {
  // إزالة frontmatter
  const withoutFrontmatter = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

  // إزالة علامات MDX
  const withoutMdx = withoutFrontmatter
    .replace(/<[^>]+>/g, '') // إزالة HTML tags
    .replace(/\{[^}]+\}/g, '') // إزالة JSX expressions
    .replace(/#{1,6}\s/g, '') // إزالة headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // إزالة bold
    .replace(/\*([^*]+)\*/g, '$1') // إزالة italic
    .replace(/`([^`]+)`/g, '$1') // إزالة code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // إزالة links
    .replace(/\n+/g, ' ') // استبدال newlines بمسافات
    .trim();

  return withoutMdx;
}

// Add error handling to ensure directories and files exist
try {
  // Check if base data file exists
  if (!readFileSync(searchDataPath, 'utf8')) {
    console.error('Base data file not found:', searchDataPath);
    process.exit(1);
  }

  // Check if Arabic content directory exists
  if (!statSync(arabicContentPath).isDirectory()) {
    console.error('Arabic content directory not found:', arabicContentPath);
    process.exit(1);
  }

  // Read Arabic content
  const arabicData = readArabicContent();

  // Merge Arabic data with existing data (replace previous Arabic entries)
  const nonArabicData = Array.isArray(searchData)
    ? searchData.filter(item => !item?.isArabic)
    : [];
  const updatedSearchData = [...nonArabicData, ...arabicData];

  // Write updated data
  writeFileSync(searchDataPath, JSON.stringify(updatedSearchData, null, 2));

  console.log(`Data file updated successfully!`);
  console.log(`Total items: ${updatedSearchData.length}`);
  console.log(`New Arabic items: ${arabicData.length}`);

} catch (error) {
  console.error('Error occurred while running the script:', error.message);
  process.exit(1);
}