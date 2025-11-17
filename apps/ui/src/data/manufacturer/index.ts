import { faker } from '@faker-js/faker';

/** COMPOSITIONS */
function createCompositions() {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    composition: faker.science.chemicalElement().name,
    category: faker.helpers.arrayElement([
      "Pain Relief",
      "Antibiotic",
      "Blood Pressure",
      "Diabetes",
      "Cholesterol",
      "Acid Reflux",
      "Allergy",
      "Cardiovascular",
      "Respiratory",
      "Anti-inflammatory",
      "Blood Thinner",
      "Thyroid",
      "Urology",
      "Neuropathic Pain",
      "Seizure Control",
    ]),
  };
}


// ** PRODUCT
function createProduct() {
  return {
    p_id: faker.string.uuid(),
    p_name: faker.company.buzzNoun(),
    composition: faker.helpers.multiple(createCompositions, {
      count: Math.floor(Math.random() * 1),
    }),
    p_category: category.AYURVEDIC,
    price: 150,
    minOrderRequired: 12,
    packageType: "BOTTLE", // BOTTLE / CAPSULE,
    packageSize: "200ml" // 1L / 10 tabs /2 tabs
  }
}

/**Manufacturer */
function createRandomManufacturer():any {
  return {
    id: faker.string.uuid(),
    name: faker.company.buzzNoun(),
    description: faker.company.buzzPhrase(),
    email: faker.internet.email(),
    avatar: faker.image.url(),
    location: faker.location.city(),
    registeredAt: faker.date.past(),
    interestedInPCDMonopoly: faker.datatype.boolean(),
    interestedInPCD: faker.datatype.boolean(),
    interestedInThirdPartyProducts: faker.datatype.boolean(),
    interetedInPrivateLabels: faker.datatype.boolean(),
    compositionAvailable: faker.helpers.multiple(createCompositions, {
      count: Math.floor(Math.random() * 50),
    }),

    // PRODUCTS
    products: faker.helpers.multiple(createProduct, {
      count: Math.floor(Math.random() * 50),
    }),
    productCategoriesSupported: [category.ALOPATHY, category.AYURVEDIC],
    sponsored: faker.datatype.boolean(),
  };
}

enum category {
  ALOPATHY, AYURVEDIC /// DETAILS NOT AVAILABLE
}

export const getManufacturers = faker.helpers.multiple(createRandomManufacturer, {
  count: 100,
});


export interface Manufacturer {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  products?: Array<{
    id: number;
    composition: string;
    category: string;
  }>;
  productsCount: number;
  successfulDeliveries: number;
  interestedInPCD?: boolean;
  interestedInPCDMonopoly?: boolean;
}