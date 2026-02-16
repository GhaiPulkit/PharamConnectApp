import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react";

const Banner = () => {
  return (
    <Box
      bgGradient="linear(to-r, gray.200, white, orange.100, gray.200)"
      color="grey"
      py={{ base: 16, md: 24 }}
      px={{ base: 6, md: 16 }}
      textAlign="center"
      borderRadius="2xl"
      boxShadow="2xl"
    >
      <Stack spacing={6} align="center">
        <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
          Welcome to Our Platform 🚀
        </Heading>

        <Text color="grey" fontSize={{ base: "md", md: "lg" }} maxW="600px">
          Experience next-level productivity and design. Join thousands of users
          who are transforming their workflow with our powerful tools.
        </Text>

        <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
          <Button
            colorScheme="teal"
            bg="white"
            color="blue.600"
            _hover={{ bg: "gray.100" }}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            color="white"
            borderColor="whiteAlpha.700"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            Learn More
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Banner;
