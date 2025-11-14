export type OperatorSidebarIcon = 'file' | 'folder' | 'doc' | 'chart' | 'video';

export type OperatorSidebarNode = {
  label: string;
  href: string;
  icon: OperatorSidebarIcon;
  matchPrefix?: boolean;
};

export type OperatorSidebarSection = {
  title: string;
  nodes: OperatorSidebarNode[];
};

const BASE_SECTIONS: OperatorSidebarSection[] = [
  {
    title: 'Workspace',
    nodes: [
      { label: 'home.mdx', href: '/', icon: 'file' },
      { label: 'homepage-v2.mdx', href: '/homepage-v2', icon: 'file' },
      { label: 'product/', href: '/product', icon: 'folder', matchPrefix: true },
      { label: 'pricing.mdx', href: '/pricing', icon: 'doc' },
      { label: 'programs/', href: '/programs', icon: 'folder', matchPrefix: true },
      { label: 'courses/', href: '/courses', icon: 'folder', matchPrefix: true },
      { label: 'tutorials/', href: '/tutorials', icon: 'folder', matchPrefix: true },
    ],
  },
  {
    title: 'Operations',
    nodes: [
      { label: 'company/', href: '/company', icon: 'folder', matchPrefix: true },
      { label: 'checkout/', href: '/checkout', icon: 'folder', matchPrefix: true },
      { label: 'docs/', href: '/docs', icon: 'doc', matchPrefix: true },
      { label: 'changelog.mdx', href: '/changelog', icon: 'doc' },
      { label: 'news/', href: '/news', icon: 'folder', matchPrefix: true },
      { label: 'legal/', href: '/legal', icon: 'doc', matchPrefix: true },
    ],
  },
];

function normalizePath(pathname: string) {
  if (!pathname) return '/';
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function buildOperatorSidebar(activePath: string, sections: OperatorSidebarSection[] = BASE_SECTIONS) {
  const normalizedPath = normalizePath(activePath);

  return sections.map((section) => ({
    ...section,
    nodes: section.nodes.map((node) => {
      const normalizedHref = normalizePath(node.href);
      const isActive = node.matchPrefix
        ? normalizedPath === normalizedHref || normalizedPath.startsWith(`${normalizedHref}/`)
        : normalizedPath === normalizedHref;

      return { ...node, active: isActive };
    }),
  }));
}

export function extendOperatorSidebar(
  overrides: Partial<Record<'workspace' | 'operations', OperatorSidebarNode[]>>
): OperatorSidebarSection[] {
  return BASE_SECTIONS.map((section) => {
    if (section.title === 'Workspace' && overrides.workspace) {
      return { ...section, nodes: overrides.workspace };
    }
    if (section.title === 'Operations' && overrides.operations) {
      return { ...section, nodes: overrides.operations };
    }
    return section;
  });
}

export const operatorSidebarSections = BASE_SECTIONS;

