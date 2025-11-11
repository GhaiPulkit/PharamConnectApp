'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type OTPModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCloseCallback: () => void;
};

const schema = yup.object({
  firstName: yup.string().required("First name required"),
  lastName: yup.string().required("Last name required"),
  email: yup.string().email("Invalid email").required("Email required"),
  phone: yup.string().required("Phone required"),
  company: yup.string().required(),
  otp: yup.string().length(6, "OTP must be 6 digits").required("OTP required"),
});


type FormData = yup.InferType<typeof schema>;

async function verifyOTP(otp: string) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(otp === "123456"), 800);
  });
}

export default function OTPModal({ isOpen, onClose, onCloseCallback }: OTPModalProps) {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "Pulkit",
      lastName: "Ghai",
      email: "example@gmail.com",
      phone: "999009900",
      company: "Hey",
      otp: "123456",
    },
  });

  const otpValue = watch("otp");

  const onSubmit = async (values: FormData) => {
    const ok = await verifyOTP(values.otp || "");

    if (!ok) {
      toast({
        title: "Invalid OTP",
        description: "Please enter 123456",
        status: "error",
      });
      return;
    }

    onCloseCallback();
    toast({
      title: "Success!",
      description: "OTP verified and form submitted.",
      status: "success",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please submit your details to proceed</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          
            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

                <FormControl isInvalid={!!errors.firstName}>
                  <FormLabel>First Name</FormLabel>
                  <Input {...register("firstName")} />
                  <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.lastName}>
                  <FormLabel>Last Name</FormLabel>
                  <Input {...register("lastName")} />
                  <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                </FormControl>
              </div>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input type="email" {...register("email")} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.phone}>
                <FormLabel>Phone Number</FormLabel>
                <Input type="tel" {...register("phone")} />
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Company</FormLabel>
                <Input {...register("company")} />
              </FormControl>

              <div style={{ height: 1, background: "#eee", margin: "8px 0" }} />

              <FormControl isInvalid={!!errors.otp}>
                <FormLabel>OTP (6 digits)</FormLabel>
                <Input maxLength={6} inputMode="numeric" {...register("otp")} />
                <FormErrorMessage>{errors.otp?.message}</FormErrorMessage>
              </FormControl>

            </div>

        </ModalBody>

        <ModalFooter className="flex gap-4">
          <Button
            type="button"
            onClick={() =>
              toast({
                title: "OTP Sent",
                description: "Use 123456 as OTP (mocked).",
                status: "info",
              })
            }
          >
            Request OTP
          </Button>

          <Button type="submit" colorScheme="blue" isLoading={isSubmitting} isDisabled={!otpValue}>
            Verify & Submit
          </Button>
        </ModalFooter>
                  </form>
      </ModalContent>
    </Modal>
  );
}
