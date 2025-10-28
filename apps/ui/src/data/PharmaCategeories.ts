export type PharmaCategory = {
    id: string; // slug/unique id
    name: string;
    description?: string;
    tags?: string[]; // optional keywords
};

export const PHARMA_CATEGORIES: PharmaCategory[] = [
    {
        id: "analgesics",
        name: "Analgesics / Pain Relievers",
        description: "Medications to reduce pain (opioids, NSAIDs, acetaminophen).",
        tags: ["pain", "nsaid", "opioid", "acetaminophen"],
    },
    {
        id: "antibiotics",
        name: "Antibiotics",
        description: "Drugs used to treat bacterial infections (penicillins, cephalosporins).",
        tags: ["bacterial", "infection", "penicillin", "cephalosporin"],
    },
    {
        id: "antivirals",
        name: "Antivirals",
        description: "Medications to treat viral infections.",
        tags: ["viral", "influenza", "herpes"],
    },
    {
        id: "antifungals",
        name: "Antifungals",
        description: "Topical and systemic drugs for fungal infections.",
        tags: ["fungal", "candida", "dermatology"],
    },
    {
        id: "cardiovascular",
        name: "Cardiovascular",
        description: "Drugs for heart and blood vessel conditions (statins, antiarrhythmics).",
        tags: ["heart", "statin", "antihypertensive"],
    },
    {
        id: "antihypertensives",
        name: "Antihypertensives",
        description: "Medications to control high blood pressure (ACE inhibitors, ARBs).",
        tags: ["bp", "ace-inhibitor", "arb"],
    },
    {
        id: "antidiabetics",
        name: "Antidiabetics",
        description: "Medications for diabetes management (insulins, oral agents).",
        tags: ["diabetes", "insulin", "metformin"],
    },
    {
        id: "gastrointestinal",
        name: "Gastrointestinal",
        description: "Drugs for stomach and intestinal conditions (antacids, PPIs).",
        tags: ["gi", "ppi", "antacid"],
    },
    {
        id: "respiratory",
        name: "Respiratory / Pulmonary",
        description: "Inhalers and medicines for asthma, COPD and other respiratory conditions.",
        tags: ["asthma", "copd", "inhaler"],
    },
    {
        id: "dermatological",
        name: "Dermatological",
        description: "Topical and systemic treatments for skin conditions.",
        tags: ["skin", "topical", "acne"],
    },
    {
        id: "endocrine",
        name: "Hormones & Endocrine",
        description: "Hormonal therapies and endocrine system drugs (thyroid, steroids).",
        tags: ["thyroid", "steroid", "hormone"],
    },
    {
        id: "vitamins_supplements",
        name: "Vitamins & Supplements",
        description: "Nutritional supplements, vitamins and minerals.",
        tags: ["vitamin", "supplement", "nutrient"],
    },
    {
        id: "vaccines",
        name: "Vaccines & Immunizations",
        description: "Preventive vaccines for infectious diseases.",
        tags: ["vaccine", "immunization"],
    },
    {
        id: "oncology",
        name: "Oncology",
        description: "Anticancer drugs and supportive oncology treatments.",
        tags: ["cancer", "chemotherapy", "immunotherapy"],
    },
    {
        id: "immunosuppressants",
        name: "Immunosuppressants",
        description: "Medications reducing immune activity (for transplants, autoimmune diseases).",
        tags: ["autoimmune", "transplant", "immunology"],
    },
    {
        id: "anesthetics",
        name: "Anesthetics",
        description: "Local and general anesthetics used in procedures and surgery.",
        tags: ["anesthesia", "local", "general"],
    },
    {
        id: "ophthalmic",
        name: "Ophthalmic",
        description: "Eye drops and treatments for ocular conditions.",
        tags: ["eye", "ophthalmology"],
    },
    {
        id: "ent",
        name: "ENT / Otolaryngology",
        description: "Medications for ear, nose and throat disorders.",
        tags: ["ear", "nose", "throat"],
    },
    {
        id: "pediatrics",
        name: "Pediatrics",
        description: "Medications commonly used in children (dose/format adaptations).",
        tags: ["children", "pediatric"],
    },
    {
        id: "reproductive",
        name: "Reproductive Health",
        description: "Contraceptives, fertility treatments and gynecologic medications.",
        tags: ["contraception", "fertility", "gynecology"],
    },
];

export const PHARMA_CATEGORY_MAP: Record<string, PharmaCategory> = Object.fromEntries(
    PHARMA_CATEGORIES.map((c) => [c.id, c])
);

export function getPharmaCategoryById(id: string): PharmaCategory | null {
    return PHARMA_CATEGORY_MAP[id] ?? null;
}


export const PHARAM_MANUFACTURERS_CATEGORIED = [
    {
        name:"Ayurverdic Medicine",
        id:"ayurverdic-medicine"
    },
    {
        name:"Veterinary Medicine",
        id:"verterinary-medicine"
    },
    {
        name:"Manufacturing Facilities",
        id:"manufacturing-facilities"
    },
    {
        name:"Active Pharmaceutical Ingredients",
        id:"active-pharmaceutical-ingredients"
    },
    {
        name:"Over The Counter Drugs",
        id:"over-the-counter-drugs"
    },
    {
        name:"Generic Medicines",
        id:"generic-medicines"
    }
]