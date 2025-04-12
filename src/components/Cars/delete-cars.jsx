import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCars } from "../../store/autozumadminSlice";
import DeleteCars from "../../api/cars/delete-cars.api";

export function DeleteComponent(id) {
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setOverlay(<OverlayTwo />), onOpen();
  }, []);

const {mutate,isLoading} = DeleteCars(id,onClose)
  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => {
          onClose(), dispatch(actionCars(""));
        }}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>Do want delete this cars</ModalHeader>
          <ModalCloseButton />

          <ModalFooter flex={2} gap={5}>
            <Button onClick={() => mutate(id.id)} isLoading={isLoading} loadingText='Deleted'>Yes</Button>
            <Button  colorScheme="red"
              onClick={() => {
                onClose(), dispatch(actionCars(""));
              }}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
