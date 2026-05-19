export function normalizeTagValue(value: string) {
  return value.trim().replace(/\s+/g, "-").toLowerCase();
}

export function getCreatableTagOptions(
  availableTags: string[],
  selectedTags: string[],
  query: string,
) {
  const normalizedQuery = normalizeTagValue(query);
  const selected = new Set(selectedTags);
  const matchingTags = availableTags.filter((tag) => {
    if (selected.has(tag)) return false;
    if (!normalizedQuery) return true;

    return tag.includes(normalizedQuery);
  });

  return {
    canCreate:
      normalizedQuery.length > 0 &&
      !selected.has(normalizedQuery) &&
      !availableTags.includes(normalizedQuery),
    matchingTags,
    normalizedQuery,
  };
}
