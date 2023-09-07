import { Stack, RadioGroup, Radio, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Grid, GridItem, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useState } from 'react';
import { OrderProps } from './order';


type AddNewOrderModalProps = {
    isOpen: boolean,
    close: () => void,
    add: (newOrder: OrderProps) => void
}
export default function AddNewOrderModal({isOpen, close, add}: AddNewOrderModalProps){

    const [roomNum, setRoomNum] = useState('');
    const [guestName, setGuestName] = useState('');
    const [timeLimit, setTimeLimit] = useState('15');
    const [means, setMeans] = useState('Tray');
    const [serverName, setServerName] = useState('');

    const create = () => {
        const new_order: OrderProps = {'timeIn': new Date(), 'roomNum': roomNum, 'guestName': guestName, 'timerLen': Number(timeLimit), 'means': means, 'serverName': serverName, 'remove': (key) => {}, 'complete': (newOrder) => {}};
        setRoomNum('');
        setGuestName('');
        setTimeLimit('15');
        setMeans('Tray');
        setServerName('');
        add(new_order);
        close();

        
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={close}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add a new order</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4}>
                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel>Room No.</FormLabel>
                                <Input type='text' value={ roomNum } onChange={ e => setRoomNum(e.target.value) }/>
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <FormControl>
                                <FormLabel>Guest Name</FormLabel>
                                <Input type='text' value={ guestName } onChange={ e => setGuestName(e.target.value) }/>
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormLabel>Time</FormLabel>
                            <RadioGroup onChange={setTimeLimit} name="timeLimit" defaultValue={ timeLimit }>
                                <Stack>
                                    <Radio value="15">15 mins</Radio>
                                    <Radio value="20">20 mins</Radio>
                                    <Radio value="30">30 mins</Radio>
                                </Stack>
                            </RadioGroup>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormLabel>Means</FormLabel>
                            <RadioGroup onChange={setMeans} name="means" defaultValue={ means }>
                                <Stack>
                                    <Radio value="Tray">Tray</Radio>
                                    <Radio value="Trolley">Trolley</Radio>
                                    <Radio value="Salvar">Salvar</Radio>
                                </Stack>
                            </RadioGroup>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormControl>
                                <FormLabel>Server</FormLabel>
                                <Input type='text' value={ serverName } onChange={ e => setServerName(e.target.value) }/>
                            </FormControl>
                        </GridItem>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='teal' onClick={create}>Create</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}