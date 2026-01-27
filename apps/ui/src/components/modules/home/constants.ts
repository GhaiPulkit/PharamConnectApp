export enum PHARMA_CATEGORIES {
    PCD = 'PCD/Pharma_Franchise',
    THIRD_PARTY = 'Third_Party Manufacturing',
    PRIVATE_LABEL = 'Private_Label Manufacturing',
}

export const PHARMA_CATEGORY_LIST = Object.entries(PHARMA_CATEGORIES);

export enum SEARCH_OPTIONS {
    franchise = 'franchise',
    medicine = 'medicine'
}

export const SEARCH_OPTIONS_LIST = Object.entries(SEARCH_OPTIONS);
