export const PRODUCT_TYPES = [
    'capsule',
    'tablet',
    'syrup',
    'suspension',
    'ointment',
    'cream',
    'gel',
    'injectable',
    'injection',
    'drop',
    'inhaler',
    'patch',
    'suppository',
    'powder',
    'granules',
    'solution',
    'emulsion',
    'spray',
    'other',
] as const;

export type ProductType = typeof PRODUCT_TYPES[number];

export const isProductType = (value: unknown): value is ProductType =>
    typeof value === 'string' && (PRODUCT_TYPES as readonly string[]).includes(value);