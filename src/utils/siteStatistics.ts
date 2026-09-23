export type SiteStatistic = { label: string; value: string; suffix?: string };

const EXCLUDED_LABEL_PATTERNS = [
  /projects?\s*completed/i,
  /satisfied\s*clients?/i,
  /clients?\s*(worldwide|supported)/i,
];

export function isExcludedSiteStatistic(label: string): boolean {
  return EXCLUDED_LABEL_PATTERNS.some((re) => re.test(label.trim()));
}

export function filterSiteStatistics(stats: SiteStatistic[] | undefined): SiteStatistic[] {
  if (!stats?.length) return [];
  return stats.filter((s) => !isExcludedSiteStatistic(s.label));
}

export const FALLBACK_SITE_STATISTICS: SiteStatistic[] = [
  { label: 'Years of Excellence', value: '20', suffix: '+' },
  { label: 'Parts in Stock', value: '50000', suffix: '+' },
  { label: 'On-Time Delivery', value: '99.8', suffix: '%' },
  { label: 'AOG Support', value: '24', suffix: '/7' },
];

export function resolveSiteStatistics(apiStats: SiteStatistic[] | undefined, max = 4): SiteStatistic[] {
  const filtered = filterSiteStatistics(apiStats);
  const base = filtered.length ? filtered : FALLBACK_SITE_STATISTICS;
  const merged = [...base];
  for (const fb of FALLBACK_SITE_STATISTICS) {
    if (merged.length >= max) break;
    if (!merged.some((s) => s.label === fb.label)) merged.push(fb);
  }
  return merged.slice(0, max);
}
