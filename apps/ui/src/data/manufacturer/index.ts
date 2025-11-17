import { faker } from '@faker-js/faker';

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


function createRandomManufacturer():any {
  return {
    id: faker.string.uuid(),
    name: faker.company.buzzNoun(),
    description: faker.company.buzzPhrase(),
    email: faker.internet.email(),
    avatar: faker.image.url(),
    location: faker.location.city(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    interestedInPCDMonopoly: faker.datatype.boolean(),
    interestedInPCD: faker.datatype.boolean(),
    interestedInThirdPartyProducts: faker.datatype.boolean(),
    interetedInPrivateLabels: faker.datatype.boolean(),
    compositionAvailable: faker.helpers.multiple(createCompositions, {
      count: Math.floor(Math.random() * 50),
    }),
  };
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