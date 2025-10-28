import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'

type OTPModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OTPModal({ isOpen, onClose }: OTPModalProps) {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hey</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = {
                        firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
                        lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
                        email: (form.elements.namedItem('email') as HTMLInputElement).value,
                        phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
                        company: (form.elements.namedItem('company') as HTMLInputElement).value,
                        otp: (form.elements.namedItem('otp') as HTMLInputElement).value,
                    };
                    // TODO: send data to backend / verify OTP
                    console.log('submit', data);
                    onClose();
                }}
            >
                <div style={{ display: 'grid', gap: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                            First name
                            <input name="firstName" required />
                        </label>
                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                            Last name
                            <input name="lastName" required />
                        </label>
                    </div>

                    <label style={{ display: 'flex', flexDirection: 'column' }}>
                        Email
                        <input name="email" type="email" required />
                    </label>

                    <label style={{ display: 'flex', flexDirection: 'column' }}>
                        Phone number
                        <input name="phone" type="tel" inputMode="tel" required />
                    </label>

                    <label style={{ display: 'flex', flexDirection: 'column' }}>
                        Company
                        <input name="company" />
                    </label>

                    <div style={{ height: 1, background: '#eee', margin: '8px 0' }} />

                    <label style={{ display: 'flex', flexDirection: 'column' }}>
                        OTP (6 digits)
                        <input
                            name="otp"
                            inputMode="numeric"
                            pattern="\d{6}"
                            maxLength={6}
                            placeholder="Enter OTP"
                        />
                    </label>

                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <Button
                            type="button"
                            onClick={() => {
                                // TODO: request/send OTP using current form values
                                // e.g. collect form values and call API to send OTP
                                console.log('Request OTP clicked');
                            }}
                        >
                            Request OTP
                        </Button>

                        <Button type="submit" colorScheme="blue">
                            Verify & Submit
                        </Button>
                    </div>
                </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => onClose()}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}