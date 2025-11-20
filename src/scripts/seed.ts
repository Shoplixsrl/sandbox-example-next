import { db } from '../db';
import { categories, skills } from '../db/schema';

const categoriesData = [
  { name: 'Web Development', description: 'Web development and programming', slug: 'web-development' },
  { name: 'Mobile Development', description: 'Mobile app development', slug: 'mobile-development' },
  { name: 'Design', description: 'Graphic design and UI/UX', slug: 'design' },
  { name: 'Writing', description: 'Content writing and copywriting', slug: 'writing' },
  { name: 'Marketing', description: 'Digital marketing and SEO', slug: 'marketing' },
  { name: 'Data Science', description: 'Data analysis and machine learning', slug: 'data-science' },
];

const skillsData = [
  // Web Development
  { name: 'JavaScript', categorySlug: 'web-development' },
  { name: 'TypeScript', categorySlug: 'web-development' },
  { name: 'React', categorySlug: 'web-development' },
  { name: 'Next.js', categorySlug: 'web-development' },
  { name: 'Vue.js', categorySlug: 'web-development' },
  { name: 'Node.js', categorySlug: 'web-development' },
  { name: 'Python', categorySlug: 'web-development' },
  { name: 'PHP', categorySlug: 'web-development' },
  { name: 'Ruby on Rails', categorySlug: 'web-development' },

  // Mobile Development
  { name: 'React Native', categorySlug: 'mobile-development' },
  { name: 'Flutter', categorySlug: 'mobile-development' },
  { name: 'Swift', categorySlug: 'mobile-development' },
  { name: 'Kotlin', categorySlug: 'mobile-development' },
  { name: 'iOS Development', categorySlug: 'mobile-development' },
  { name: 'Android Development', categorySlug: 'mobile-development' },

  // Design
  { name: 'UI/UX Design', categorySlug: 'design' },
  { name: 'Figma', categorySlug: 'design' },
  { name: 'Adobe Photoshop', categorySlug: 'design' },
  { name: 'Adobe Illustrator', categorySlug: 'design' },
  { name: 'Sketch', categorySlug: 'design' },
  { name: 'Logo Design', categorySlug: 'design' },

  // Writing
  { name: 'Content Writing', categorySlug: 'writing' },
  { name: 'Copywriting', categorySlug: 'writing' },
  { name: 'Technical Writing', categorySlug: 'writing' },
  { name: 'Blog Writing', categorySlug: 'writing' },
  { name: 'SEO Writing', categorySlug: 'writing' },

  // Marketing
  { name: 'Digital Marketing', categorySlug: 'marketing' },
  { name: 'SEO', categorySlug: 'marketing' },
  { name: 'Social Media Marketing', categorySlug: 'marketing' },
  { name: 'Email Marketing', categorySlug: 'marketing' },
  { name: 'Content Marketing', categorySlug: 'marketing' },

  // Data Science
  { name: 'Machine Learning', categorySlug: 'data-science' },
  { name: 'Data Analysis', categorySlug: 'data-science' },
  { name: 'Python', categorySlug: 'data-science' },
  { name: 'R', categorySlug: 'data-science' },
  { name: 'SQL', categorySlug: 'data-science' },
  { name: 'TensorFlow', categorySlug: 'data-science' },
];

async function seed() {
  console.log('Starting seed...');

  try {
    // Insert categories
    console.log('Inserting categories...');
    const insertedCategories = await db.insert(categories).values(categoriesData).returning();
    console.log(`Inserted ${insertedCategories.length} categories`);

    // Create a map of category slug to ID
    const categoryMap = new Map(insertedCategories.map(cat => [cat.slug, cat.id]));

    // Insert skills
    console.log('Inserting skills...');
    const skillsWithCategoryIds = skillsData.map(skill => ({
      name: skill.name,
      categoryId: categoryMap.get(skill.categorySlug)!,
    }));

    const insertedSkills = await db.insert(skills).values(skillsWithCategoryIds).returning();
    console.log(`Inserted ${insertedSkills.length} skills`);

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
