'use client';

import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Link,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Links = ['Home', 'About', 'Services', 'Contact'];

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="white" px={4} boxShadow="sm" position="sticky" top="0" zIndex="1000">
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
        {/* Logo */}
        <HStack spacing={2} alignItems="center">
          <Image src="/logo.svg" alt="Logo" boxSize="32px" />
          <Box fontWeight="bold" fontSize="lg">MyBrand</Box>
        </HStack>

        {/* Desktop Menu */}
        <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }}>
          {Links.map((link) => (
            <Link
              key={link}
              px={2}
              py={1}
              rounded="md"
              _hover={{ textDecoration: 'none', bg: 'gray.100' }}
              href={`#${link.toLowerCase()}`}
            >
              {link}
            </Link>
          ))}
        </HStack>

        {/* Hamburger for Mobile */}
        <IconButton
          size="md"
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={onOpen}
          variant="ghost"
        />

        {/* Drawer Menu for Mobile */}
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <Stack as="nav" spacing={4}>
                {Links.map((link) => (
                  <Link
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={onClose}
                    _hover={{ textDecoration: 'none', color: 'blue.500' }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
}
