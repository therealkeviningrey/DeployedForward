// SEO utilities for JSON-LD structured data

export interface CourseStructuredData {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  educationalLevel?: string;
  timeRequired?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

export function generateCourseJsonLd(course: CourseStructuredData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.provider.name,
      url: course.provider.url,
    },
    ...(course.educationalLevel && { educationalLevel: course.educationalLevel }),
    ...(course.timeRequired && { timeRequired: course.timeRequired }),
    ...(course.offers && {
      offers: {
        '@type': 'Offer',
        price: course.offers.price,
        priceCurrency: course.offers.priceCurrency,
      },
    }),
  };
}

export interface ArticleStructuredData {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
  };
  publisher: {
    name: string;
    url: string;
  };
  image?: string;
}

export function generateArticleJsonLd(article: ArticleStructuredData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher.name,
      url: article.publisher.url,
    },
    ...(article.image && { image: article.image }),
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQJsonLd(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Deployed Forward',
    url: 'https://deployedforward.com',
    logo: 'https://deployedforward.com/assets/df_lockup_for_dark_bg_transparent.svg',
    description: 'Master AI workflows with field-tested missions. Deploy capability, not experiments.',
    sameAs: [
      // Add social media links when available
    ],
  };
}

