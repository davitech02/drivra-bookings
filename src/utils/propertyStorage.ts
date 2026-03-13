import { allProperties } from '../mocks/properties';

const STORAGE_KEY = 'drivra_properties';

export type StoredProperty = typeof allProperties[number];

export function getStoredProperties(): StoredProperty[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data;
  } catch {
    return [];
  }
}

export function saveStoredProperties(properties: StoredProperty[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
}

export function getAllProperties(): StoredProperty[] {
  const stored = getStoredProperties();
  const storedById = new Map(stored.map((p) => [p.id, p]));

  // Merge: stored overrides mock when IDs match
  const merged = allProperties.map((p) => storedById.get(p.id) ?? p);

  // Add any stored properties that don't exist in mock (new ones)
  stored.forEach((p) => {
    if (!merged.some((m) => m.id === p.id)) {
      merged.push(p);
    }
  });

  return merged;
}

export function getPropertyById(id: string | undefined) {
  if (!id) return undefined;
  return getAllProperties().find((p) => p.id === id);
}

export function upsertProperty(property: StoredProperty) {
  const all = getAllProperties();
  const existingIndex = all.findIndex((p) => p.id === property.id);

  if (existingIndex >= 0) {
    all[existingIndex] = property;
  } else {
    all.unshift(property);
  }

  saveStoredProperties(all);
  return all;
}

export function deleteProperty(id: string) {
  const all = getAllProperties().filter((p) => p.id !== id);
  saveStoredProperties(all);
  return all;
}
