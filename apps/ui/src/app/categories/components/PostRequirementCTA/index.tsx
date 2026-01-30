'use client';

import { useState } from 'react';
import {
  Button, VStack, FormControl, FormLabel, Input, Select, Slider, SliderTrack,
  SliderFilledTrack, SliderThumb, SliderMark, Badge, Flex, Text, useDisclosure,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,
  DrawerCloseButton, Box, HStack, useBreakpointValue, Progress, Tag, SimpleGrid,
  useToast, IconButton, Tooltip, RadioGroup, Radio, CheckboxGroup, Checkbox,
} from '@chakra-ui/react';
import { FiPlusCircle, FiCheckCircle, FiArrowRight, FiClock, FiDollarSign } from 'react-icons/fi';

const BUSINESS_TYPES = ['Retail Chemist', 'Wholesale Distributor', 'Hospital Pharmacy', 'Medical Representative', 'Corporate Chain'];
const EXPERIENCE_ROLES = ['Pharmacy Operations', 'Sales & Distribution', 'Regulatory Compliance', 'Quality Control'];
const PACKAGING_PREFERENCES = ['Blister', 'Strip', 'Alu-Alu', 'Mono Carton'];

export default function PharmaOpportunityForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: '',
    city: '',
    urgency: 2, // 1=ASAP, 2=15days, 3=30days
    contactWindow: 'flexible',
    hasLicenses: 'partial',
    experience: [] as string[],
    volumeTier: 'medium',
    productFocus: [] as string[],
    packaging: [] as string[],
    quantityRange: [1000, 10000],
    budgetTier: '1-5L',
    mobile: '',
    name: '',
  });
  
  const totalSteps = 4;
  const progress = ((step - 1) / (totalSteps - 1)) * 100;
  const toast = useToast();

  const updateField = (updates: any) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const submitOpportunity = () => {
    console.log('🚀 Pharma Opportunity:', formData);
    toast({
      title: '✅ Opportunity Published!',
      description: "Top manufacturers matched. Expect calls within 2 hours.",
      status: 'success',
      duration: 4000,
      position: 'top'
    });
    onClose();
    setStep(1);
  };

  return (
    <>
      {/* Hero CTA */}
      <Box position="fixed" bottom={6} left={6} right={6} zIndex={1000} maxW="container.sm" mx="auto">
        <Button
          onClick={onOpen}
          w="full"
          h={16}
          size="xl"
          colorScheme="purple"
          leftIcon={<FiPlusCircle />}
          boxShadow="2xl"
          borderRadius="3xl"
          fontSize="lg"
          fontWeight="extrabold"
          _hover={{ transform: 'translateY(-2px)', boxShadow: '3xl' }}
        >
          Create Pharma Opportunity
        </Button>
      </Box>

      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom" size="full">
        <DrawerOverlay />
        <DrawerContent borderTopRadius="3xl" bg="gray.50">
          <DrawerHeader p={8} bg="white" borderBottom="1px" borderColor="gray.200">
            <Flex align="center" gap={4} mb={4}>
              <Box bg="purple.500" p={3} borderRadius="full" color="white">
                <FiPlusCircle size={24} />
              </Box>
              <Box>
                <Text fontSize="2xl" fontWeight="black" color="gray.900">
                  Create Opportunity
                </Text>
                <Text fontSize="sm" color="gray.600">Step {step} of {totalSteps}</Text>
              </Box>
            </Flex>
            <Progress value={progress} size="md" borderRadius="full" />
            <DrawerCloseButton size="lg" top={4} right={4} />
          </DrawerHeader>

          <DrawerBody p={8}>
            {step === 1 && (
              <VStack spacing={8} align="stretch">
                <FormControl>
                  <FormLabel fontWeight="bold" fontSize="lg" color="gray.800">
                    Your Business Type
                  </FormLabel>
                  <Select 
                    value={formData.businessType}
                    onChange={e => updateField({ businessType: e.target.value })}
                    size="lg"
                  >
                    <option value="">Choose your business...</option>
                    {BUSINESS_TYPES.map(type => (
                      <option key={type}>{type}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold">Primary Location</FormLabel>
                  <Input 
                    placeholder="Enter city/district" 
                    value={formData.city}
                    onChange={e => updateField({ city: e.target.value })}
                    size="lg"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold">When do you need products?</FormLabel>
                  <Slider 
                    value={formData.urgency}
                    onChange={val => updateField({ urgency: val })}
                    min={1} max={3} step={1}
                    w="full"
                  >
                    <SliderTrack bg="gray.200">
                      <SliderFilledTrack bg="purple.500" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} border="3px solid white" bg="purple.500">
                      <Box fontSize="xs" color="white" fontWeight="bold">
                        {['ASAP', '15 Days', '30 Days'][formData.urgency - 1]}
                      </Box>
                    </SliderThumb>
                  </Slider>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold">Best time to call</FormLabel>
                  <RadioGroup value={formData.contactWindow} onChange={val => updateField({ contactWindow: val })}>
                    <HStack spacing={6}>
                      <Radio value="morning">🌅 9AM-12PM</Radio>
                      <Radio value="afternoon">☀️ 1PM-5PM</Radio>
                      <Radio value="evening">🌙 6PM-9PM</Radio>
                      <Radio value="flexible">⏰ Anytime</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </VStack>
            )}

            {step === 2 && (
              <VStack spacing={8} align="stretch">
                <FormControl>
                  <FormLabel fontWeight="bold" fontSize="lg">
                    Business Readiness
                  </FormLabel>
                  <RadioGroup value={formData.hasLicenses} onChange={val => updateField({ hasLicenses: val })}>
                    <VStack align="start" spacing={3} mt={2}>
                      <Radio value="complete">✅ Complete (GST + Drug License)</Radio>
                      <Radio value="partial">⚠️ Partial (GST or Applied)</Radio>
                      <Radio value="startup">🚀 New Business</Radio>
                    </VStack>
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold">Team Expertise</FormLabel>
                  <CheckboxGroup value={formData.experience} onChange={vals => updateField({ experience: vals as string[] })}>
                    <SimpleGrid columns={{ base: 2, md: 2 }} gap={3} mt={2}>
                      {EXPERIENCE_ROLES.map(role => (
                        <Checkbox key={role} size="lg">{role}</Checkbox>
                      ))}
                    </SimpleGrid>
                  </CheckboxGroup>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold">Current Monthly Volume</FormLabel>
                  <SimpleGrid columns={{ base: 3, md: 4 }} gap={3} mt={2}>
                    {['< ₹1L', '₹1-5L', '₹5-20L', '₹20L+'].map(tier => (
                      <Button
                        key={tier}
                        variant={formData.volumeTier === tier ? 'solid' : 'outline'}
                        colorScheme="purple"
                        size="lg"
                        onClick={() => updateField({ volumeTier: tier })}
                        borderRadius="2xl"
                      >
                        {tier}
                      </Button>
                    ))}
                  </SimpleGrid>
                </FormControl>
              </VStack>
            )}

            {step === 3 && (
              <VStack spacing={8} align="stretch">
                <FormControl>
                  <FormLabel fontWeight="bold" fontSize="lg">Therapy Areas Needed</FormLabel>
                  <CheckboxGroup value={formData.productFocus} onChange={vals => updateField({ productFocus: vals as string[] })}>
                    <SimpleGrid columns={{ base: 2, md: 3 }} gap={3} mt={3}>
                      {['Anti-Infectives', 'Gastro', 'Cardiac', 'Diabetic Care', 'Dermatology', 'Pain Management', 'Vitamins'].map(cat => (
                        <Checkbox key={cat} size="lg" borderRadius="md">{cat}</Checkbox>
                      ))}
                    </SimpleGrid>
                  </CheckboxGroup>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold">Packaging Preferences</FormLabel>
                  <CheckboxGroup value={formData.packaging} onChange={vals => updateField({ packaging: vals as string[] })}>
                    <HStack wrap="wrap" gap={3} mt={3}>
                      {PACKAGING_PREFERENCES.map(pack => (
                        <Tag
                          key={pack}
                          size="lg"
                          colorScheme="purple"
                          borderRadius="full"
                          cursor="pointer"
                          onClick={() => {
                            const newVal = formData.packaging.includes(pack)
                              ? formData.packaging.filter(p => p !== pack)
                              : [...formData.packaging, pack];
                            updateField({ packaging: newVal });
                          }}
                        >
                          <Checkbox size="sm" isChecked={formData.packaging.includes(pack)} /> {pack}
                        </Tag>
                      ))}
                    </HStack>
                  </CheckboxGroup>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold">Target Quantity</FormLabel>
                  <Slider
                    value={formData.urgency} // ✅ single number
                    onChange={(val: number) => updateField({ urgency: val })}
                    min={1} 
                    max={3} 
                    step={1}
                    >
                    <SliderTrack bg="gray.200">
                        <SliderFilledTrack bg="purple.500" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} bg="purple.500">
                        <Box fontSize="xs" color="white" fontWeight="bold">
                        {['ASAP', '15 Days', '30 Days'][formData.urgency - 1]}
                        </Box>
                    </SliderThumb>
                    </Slider>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold">Budget Range</FormLabel>
                  <SimpleGrid columns={{ base: 2, md: 3 }} gap={3} mt={2}>
                    {['₹1-3L', '₹3-10L', '₹10L+', 'Discuss'].map(budget => (
                      <Button
                        key={budget}
                        variant={formData.budgetTier === budget ? 'solid' : 'outline'}
                        colorScheme="green"
                        size="lg"
                        onClick={() => updateField({ budgetTier: budget })}
                        leftIcon={<FiDollarSign />}
                        borderRadius="2xl"
                      >
                        {budget}
                      </Button>
                    ))}
                  </SimpleGrid>
                </FormControl>
              </VStack>
            )}

            {step === 4 && (
              <VStack spacing={6} align="stretch" p={4} bg="white" borderRadius="2xl" boxShadow="lg">
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  Quick Contact Details
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <Input 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={e => updateField({ name: e.target.value })}
                    size="lg"
                  />
                  <Input 
                    type="tel"
                    placeholder="Mobile Number *" 
                    value={formData.mobile}
                    onChange={e => updateField({ mobile: e.target.value })}
                    size="lg"
                  />
                </SimpleGrid>
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter p={8} bg="white" borderTop="1px" borderColor="gray.200">
            <Flex w="full" gap={4}>
              {step > 1 && (
                <Button 
                  flex={1} 
                  onClick={() => setStep(s => s - 1)}
                  variant="ghost" 
                  leftIcon={<FiArrowRight className="rotate-180" />}
                  size="lg"
                >
                  Previous
                </Button>
              )}
              <Button 
                flex={2}
                colorScheme={step === 4 ? "purple" : "blue"}
                size="lg"
                rightIcon={<FiArrowRight />}
                onClick={step === 4 ? submitOpportunity : () => setStep(s => s + 1)}
                boxShadow="xl"
              >
                {step === 4 ? 'Publish Opportunity' : 'Continue'}
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}


//  ------------------------------------------------- pharmahopers look alike form ----------------------------------------------------

// 'use client';

// import { useState } from 'react';
// import {
//   Button, VStack, FormControl, FormLabel, Input, Select, CheckboxGroup,
//   Checkbox, RadioGroup, Radio, Flex, Text, useDisclosure, Drawer,
//   DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,
//   DrawerCloseButton, Box, HStack, useBreakpointValue, Badge, Divider,
//   Progress, Tag, TagLabel, CloseButton, IconButton,
//   SimpleGrid, useToast,
// } from '@chakra-ui/react';
// import { FiPlusCircle, FiX, FiCheckCircle } from 'react-icons/fi';

// const PRODUCT_CATEGORIES = [
//   'Cough Syrup', 'Antacid', 'Antibiotics', 'Eye Drops', 'Derma', 
//   'PCD Pharma', 'Critical Care', 'Cardiac Diabetic', 'Ayurvedic'
// ];

// const PCD_FRANCHISE_TYPES = [
//   'Monopoly Rights', 'Generous Margins', 'Promotional Support',
//   'Marketing Material', 'MR Provided', 'Distribution Support'
// ];

// export default function PostRequirementCTA() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     lookingFor: '',
//     emergency: 'Within 15 Days',
//     callTime: 'Anytime',
//     mobile: '',
//     name: '',
//     email: '',
//     city: '',
//     firmName: '',
//     haveGst: 'NO',
//     haveDrugLicense: 'NO',
//     experience: '',
//     thirdParty: [] as string[],
//     productCategories: [] as string[],
//     orderQuantity: '',
//     orderValue: 'BELOW 1 LAKH',
//   });
//   const toast = useToast();

//   const totalSteps = 4;
//   const isMobile = useBreakpointValue({ base: true, md: false });

//   const updateFormData = (updates: Partial<typeof formData>) => {
//     setFormData(prev => ({ ...prev, ...updates }));
//   };

//   const handleSubmit = () => {
//     console.log('Full form data:', formData);
//     toast({
//       title: 'Requirement Posted Successfully!',
//       description: 'Suppliers will contact you soon.',
//       status: 'success',
//       duration: 3000,
//       isClosable: true,
//     });
//     onClose();
//     setStep(1);
//   };

//   const progress = ((step - 1) / (totalSteps - 1)) * 100;

//   return (
//     <>
//       {/* Fixed CTA Button */}
//       <Box position={{ base: 'fixed', md: 'sticky' }} bottom={4} left={4} right={4} zIndex={50}>
//         <Button
//           onClick={onOpen}
//           size={{ base: 'lg', md: 'xl' }}
//           colorScheme="brand"
//           leftIcon={<FiPlusCircle />}
//           boxShadow="xl"
//           w="full"
//           h={{ base: 14, md: 16 }}
//           borderRadius="2xl"
//           fontSize={{ base: 'md', md: 'lg' }}
//           fontWeight="bold"
//         >
//           📋 Post Your Requirement
//         </Button>
//       </Box>

//       {/* Multi-Step Drawer */}
//       <Drawer isOpen={isOpen} onClose={onClose} placement="bottom" size={isMobile ? 'full' : 'lg'} trapFocus={false}>
//         <DrawerOverlay />
//         <DrawerContent borderRadius="3xl" maxH="95vh">
//           <DrawerHeader p={8}>
//             <Flex align="center" gap={3} mb={4}>
//               <FiPlusCircle size={28} color="brand.500" />
//               <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="black">
//                 Post Requirement
//               </Text>
//             </Flex>
//             <Progress value={progress} size="sm" borderRadius="full" />
//             <Text fontSize="sm" color="gray.500">
//               Step {step} of {totalSteps}
//             </Text>
//             <DrawerCloseButton size="lg" top={4} right={4} />
//           </DrawerHeader>

//           <DrawerBody p={8} pb={2}>
//             <form>
//               {step === 1 && (
//                 <VStack spacing={6} align="stretch">
//                   <FormControl>
//                     <FormLabel fontWeight="bold" fontSize="lg">You are looking for?</FormLabel>
//                     <Select
//                       value={formData.lookingFor}
//                       onChange={(e) => updateFormData({ lookingFor: e.target.value })}
//                       size="lg"
//                     >
//                       <option value="">Select...</option>
//                       <option>3rd Party Manufacturing</option>
//                       <option>PCD Pharma Franchise</option>
//                     </Select>
//                   </FormControl>

//                   <FormControl>
//                     <FormLabel fontWeight="bold">Requirement Emergency</FormLabel>
//                     <RadioGroup value={formData.emergency} onChange={(v) => updateFormData({ emergency: v })}>
//                       <HStack>
//                         <Radio value="Immediate">🚨 Immediate</Radio>
//                         <Radio value="Within 15 Days">⏰ 15 Days</Radio>
//                         <Radio value="Within a Month">📅 1 Month</Radio>
//                       </HStack>
//                     </RadioGroup>
//                   </FormControl>

//                   <FormControl>
//                     <FormLabel fontWeight="bold">Call Time Preference</FormLabel>
//                     <RadioGroup value={formData.callTime} onChange={(v) => updateFormData({ callTime: v })}>
//                       <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
//                         <Radio value="Morning">🌅 Morning</Radio>
//                         <Radio value="Afternoon">☀️ Afternoon</Radio>
//                         <Radio value="Evening">🌙 Evening</Radio>
//                         <Radio value="Anytime">⏰ Anytime</Radio>
//                       </SimpleGrid>
//                     </RadioGroup>
//                   </FormControl>

//                   <FormControl>
//                     <FormLabel fontWeight="bold">Mobile No. <Text as="span" color="red.500">*</Text></FormLabel>
//                     <Input
//                       type="tel"
//                       value={formData.mobile}
//                       onChange={(e) => updateFormData({ mobile: e.target.value })}
//                       placeholder="Enter 10-digit mobile"
//                       size="lg"
//                       maxLength={10}
//                     />
//                   </FormControl>
//                 </VStack>
//               )}

//               {step === 2 && (
//                 <VStack spacing={5} align="stretch">
//                   <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
//                     <FormControl>
//                       <FormLabel>Name</FormLabel>
//                       <Input value={formData.name} onChange={(e) => updateFormData({ name: e.target.value })} size="lg" />
//                     </FormControl>
//                     <FormControl>
//                       <FormLabel>Email</FormLabel>
//                       <Input type="email" value={formData.email} onChange={(e) => updateFormData({ email: e.target.value })} size="lg" />
//                     </FormControl>
//                   </SimpleGrid>

//                   <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
//                     <FormControl>
//                       <FormLabel>City</FormLabel>
//                       <Input value={formData.city} onChange={(e) => updateFormData({ city: e.target.value })} size="lg" />
//                     </FormControl>
//                     <FormControl>
//                       <FormLabel>Firm Name</FormLabel>
//                       <Input value={formData.firmName} onChange={(e) => updateFormData({ firmName: e.target.value })} size="lg" />
//                     </FormControl>
//                   </SimpleGrid>
//                 </VStack>
//               )}

//               {step === 3 && (
//                 <VStack spacing={6} align="stretch">
//                   <FormControl>
//                     <FormLabel fontWeight="bold">Experience</FormLabel>
//                     <Select
//                       value={formData.experience}
//                       onChange={(e) => updateFormData({ experience: e.target.value })}
//                       size="lg"
//                     >
//                       <option value="">Select...</option>
//                       <option>DOCTOR</option>
//                       <option>MR</option>
//                       <option>MANAGER</option>
//                       <option>CHEMIST</option>
//                       <option>DISTRIBUTOR</option>
//                       <option>STOCKIST</option>
//                     </Select>
//                   </FormControl>

//                   <FormControl>
//                     <FormLabel fontWeight="bold">Have GST?</FormLabel>
//                     <RadioGroup value={formData.haveGst} onChange={(v) => updateFormData({ haveGst: v })}>
//                       <HStack><Radio value="YES">✅ Yes</Radio> <Radio value="NO">❌ No</Radio> <Radio value="APPLIED">⏳ Applied</Radio></HStack>
//                     </RadioGroup>
//                   </FormControl>

//                   <FormControl>
//                     <FormLabel fontWeight="bold">Have Drug License?</FormLabel>
//                     <RadioGroup value={formData.haveDrugLicense} onChange={(v) => updateFormData({ haveDrugLicense: v })}>
//                       <HStack><Radio value="YES">✅ Yes</Radio> <Radio value="NO">❌ No</Radio> <Radio value="APPLIED">⏳ Applied</Radio></HStack>
//                     </RadioGroup>
//                   </FormControl>
//                 </VStack>
//               )}

//               {step === 4 && (
//                 <VStack spacing={6} align="stretch">
//                   {formData.lookingFor.includes('3rd Party') && (
//                     <FormControl>
//                       <FormLabel fontWeight="bold">Third Party Manufacturing</FormLabel>
//                       <CheckboxGroup value={formData.thirdParty} onChange={(v) => updateFormData({ thirdParty: v as string[] })}>
//                         <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
//                           {PCD_FRANCHISE_TYPES.map(type => (
//                             <Checkbox key={type} size="lg">{type}</Checkbox>
//                           ))}
//                         </SimpleGrid>
//                       </CheckboxGroup>
//                     </FormControl>
//                   )}

//                   <FormControl>
//                     <FormLabel fontWeight="bold">Product Categories (Multi-select)</FormLabel>
//                     <CheckboxGroup value={formData.productCategories} onChange={(v) => updateFormData({ productCategories: v as string[] })}>
//                       <SimpleGrid columns={{ base: 2, md: 3 }} gap={2}>
//                         {PRODUCT_CATEGORIES.map(cat => (
//                           <Checkbox key={cat} size="md">{cat}</Checkbox>
//                         ))}
//                       </SimpleGrid>
//                     </CheckboxGroup>
//                   </FormControl>

//                   <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
//                     <FormControl>
//                       <FormLabel>Order Quantity</FormLabel>
//                       <Input value={formData.orderQuantity} onChange={(e) => updateFormData({ orderQuantity: e.target.value })} size="lg" />
//                     </FormControl>
//                     <FormControl>
//                       <FormLabel>Order Value</FormLabel>
//                       <RadioGroup value={formData.orderValue} onChange={(v) => updateFormData({ orderValue: v })}>
//                         <VStack align="start">
//                           <Radio value="BELOW 1 LAKH">💰 Below 1 Lakh</Radio>
//                           <Radio value="ABOVE 1 LAKH">💎 Above 1 Lakh</Radio>
//                         </VStack>
//                       </RadioGroup>
//                     </FormControl>
//                   </SimpleGrid>
//                 </VStack>
//               )}
//             </form>
//           </DrawerBody>

//           <DrawerFooter p={8}>
//             <Flex w="full" justify="space-between" align="center">
//               {step > 1 && (
//                 <Button
//                   onClick={() => setStep(prev => prev - 1)}
//                   variant="ghost"
//                   size="lg"
//                   leftIcon={<FiX />}
//                 >
//                   Previous
//                 </Button>
//               )}
              
//               <HStack spacing={3}>
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   onClick={onClose}
//                 >
//                   Cancel
//                 </Button>
//                 {step === totalSteps ? (
//                   <Button
//                     colorScheme="brand"
//                     size="lg"
//                     onClick={handleSubmit}
//                     rightIcon={<FiCheckCircle />}
//                     boxShadow="lg"
//                   >
//                     Post Requirement
//                   </Button>
//                 ) : (
//                   <Button
//                     colorScheme="brand"
//                     size="lg"
//                     onClick={() => setStep(prev => prev + 1)}
//                     rightIcon={<FiPlusCircle />}
//                   >
//                     Next Step
//                   </Button>
//                 )}
//               </HStack>
//             </Flex>
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// }



// ----------------------------------- options --------------------------------------------------------------------



// 'use client';

// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
//   VStack,
//   Input,
//   FormControl,
//   FormLabel,
//   Select,
//   Checkbox,
//   useToast,
//   HStack,
//   RadioGroup,
//   Radio,
// } from "@chakra-ui/react";

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// import PrimaryButton from "@/components/common/PrimaryButton";
// import { PCD_FRANCHISE_TYPES } from "@/data/PharmaCategeories";

// // ----------------------- TYPES -----------------------

// // Keep all optional fields optional in the schema
// export type RequirementFormData = {
//   manufacturerName?: string;
//   productName: string;
//   quantity: string;
//   category: string;
//   city: string;
//   state: string;
//   franchiseType?: string;
//   interestedInPCDMonopoly?: boolean;
//   interestedInPCD?: boolean;
// };


// // Props
// type PostRequirementCTAProps = {
//   manufacturer?: {
//     name: string;
//     city?: string;
//     state?: string;
//     category?: string;
//   };
// };


// // ----------------------- SCHEMA -----------------------

// const requirementSchema: yup.Schema<RequirementFormData> = yup.object({
//   manufacturerName: yup.string().optional(),
//   productName: yup.string().required("Product name is required"),
//   quantity: yup.string().required("Quantity is required"),
//   category: yup.string().required("Category is required"),
//   city: yup.string().required("City is required"),
//   state: yup.string().required("State is required"),
//   franchiseType: yup.string().optional().when("category", (category: unknown, schema) => {
//     return category === "PCD"
//       ? schema.oneOf(PCD_FRANCHISE_TYPES, "Select a valid franchise type").required("Franchise type is required")
//       : schema.optional();
//   }),
//   interestedInPCDMonopoly: yup.boolean().optional().when("category", (category: unknown, schema) => {
//     return category === "PCD" ? schema.required("Please select an option") : schema.optional();
//   }),
//   interestedInPCD: yup.boolean().optional().when("category", (category: unknown, schema) => {
//     return category === "PCD" ? schema.required() : schema.optional();
//   }),
// }).required();

// // ----------------------- COMPONENT -----------------------

// export default function PostRequirementCTA({ manufacturer }: PostRequirementCTAProps) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const toast = useToast();

//   const defaultValues: RequirementFormData = {
//     manufacturerName: manufacturer?.name || "",
//     productName: "",
//     quantity: "",
//     category: manufacturer?.category || "Medicine",
//     city: manufacturer?.city || "",
//     state: manufacturer?.state || "",
//     franchiseType: PCD_FRANCHISE_TYPES[0],
//     interestedInPCDMonopoly: false,
//     interestedInPCD: true,
//   };

//   const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<RequirementFormData>({
//   defaultValues,
//   resolver: yupResolver(requirementSchema),
//   mode: "onChange",
// });


//   const watchCategory = watch("category");

//   const onSubmit = (data: RequirementFormData) => {
//     console.log("Submitted Requirement:", data);

//     toast({
//       title: "Requirement submitted!",
//       description: "Your requirement has been sent successfully.",
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });

//     reset(defaultValues);
//     onClose();
//   };

//   return (
//     <>
//       {/* CTA Button */}
//       <Button
//         colorScheme="teal"
//         size="lg"
//         rounded="full"
//         px={8}
//         py={6}
//         fontSize={{ base: "md", md: "lg" }}
//         shadow="md"
//         _hover={{ transform: "scale(1.05)", shadow: "lg" }}
//         onClick={onOpen}
//       >
//         Post Your Requirement
//       </Button>

//       {/* Modal Form */}
//       <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "xl" }}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Post Your Requirement</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <VStack spacing={4} align="stretch">

//               {/* Manufacturer Field */}
//               {manufacturer?.name && (
//                 <FormControl>
//                   <FormLabel>Manufacturer</FormLabel>
//                   <Input {...register("manufacturerName")} placeholder="Manufacturer" bg="gray.100" />
//                 </FormControl>
//               )}

//               {/* Generic Fields */}
//               <FormControl isInvalid={!!errors.productName}>
//                 <FormLabel>Product Name</FormLabel>
//                 <Input {...register("productName")} placeholder="Enter product name" />
//               </FormControl>

//               <FormControl isInvalid={!!errors.quantity}>
//                 <FormLabel>Quantity</FormLabel>
//                 <Input {...register("quantity")} placeholder="Enter quantity" />
//               </FormControl>

//               <FormControl isInvalid={!!errors.category}>
//                 <FormLabel>Category</FormLabel>
//                 <Select {...register("category")} placeholder="Select category">
//                   <option value="PCD">PCD</option>
//                   <option value="Third Party">Third Party</option>
//                   <option value="Private Label">Private Label</option>
//                   <option value="Medicine">Medicine</option>
//                 </Select>
//               </FormControl>

//               <FormControl isInvalid={!!errors.city}>
//                 <FormLabel>City</FormLabel>
//                 <Input {...register("city")} placeholder="Enter city" />
//               </FormControl>

//               <FormControl isInvalid={!!errors.state}>
//                 <FormLabel>State</FormLabel>
//                 <Input {...register("state")} placeholder="Enter state" />
//               </FormControl>

//               {/* PCD-Specific Fields */}
//               {watchCategory === "PCD" && (
//                 <>
//                   <FormControl isInvalid={!!errors.franchiseType}>
//                     <FormLabel>Franchise Type</FormLabel>
//                     <Select {...register("franchiseType")} placeholder="Select franchise type">
//                       {PCD_FRANCHISE_TYPES.map((c) => (
//                         <option key={c} value={c}>{c}</option>
//                       ))}
//                     </Select>
//                   </FormControl>

//                   <FormControl isInvalid={!!errors.interestedInPCDMonopoly}>
//                     <FormLabel>Monopoly Rights?</FormLabel>
//                     <RadioGroup
//                       value={watch("interestedInPCDMonopoly") ? "true" : "false"}
//                       onChange={(val) => setValue("interestedInPCDMonopoly", val === "true")}
//                     >
//                       <HStack spacing={6}>
//                         <Radio value="true">Yes</Radio>
//                         <Radio value="false">No</Radio>
//                       </HStack>
//                     </RadioGroup>
//                   </FormControl>

//                   <FormControl>
//                     <Checkbox {...register("interestedInPCD")}>Interested in PCD?</Checkbox>
//                   </FormControl>
//                 </>
//               )}

//             </VStack>
//           </ModalBody>
//           <ModalFooter>
//             <PrimaryButton onClick={handleSubmit(onSubmit)} title="Submit Requirement" />
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
