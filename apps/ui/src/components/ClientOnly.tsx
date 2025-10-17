'use client';

import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return <>{children}</>;
};

export default ClientOnly;
