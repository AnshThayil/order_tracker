import { Grid, GridItem, Box, Table, Thead, Tr, Th, Td, Tbody, Heading } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { OrderProps } from "./order";
import AddNewOrderModal from "./add_new_order_modal";

type CompletedOrderProps = {
    newCompletedOrder: OrderProps,
    resetCompletedOrder: () => void
}

export default function CompletedOrders({newCompletedOrder, resetCompletedOrder}: CompletedOrderProps) {

    const initial_order_data: OrderProps[]= [];

    const [orderData, setOrderData] = useState(initial_order_data);

    const handleAdd = (newOrder: OrderProps) => {
        setOrderData([...orderData, newOrder]) 
    }

    useEffect(() => {
        if (newCompletedOrder.completed){
            setOrderData([...orderData, newCompletedOrder])
            resetCompletedOrder();
        }
    })

    const [showModal, setShowModal] = useState(false);
    return (
        <Grid width={'90%'} templateColumns={"1fr"}>
            <GridItem colSpan={1}>
                <Grid templateColumns="1fr">
                    <GridItem colSpan={1}>
                        <Heading>Completed Orders</Heading>
                    </GridItem>
                </Grid>
            </GridItem>
            <GridItem colSpan={1}>
                <Box overflowY="auto" height={"600px"} maxHeight="600px" bgColor={"#E2E8F0"}>
                    <Table variant="striped" colorScheme="teal">
                        <Thead position="sticky" top={0}>
                        <Tr>
                            <Th>Room Number</Th>
                            <Th>Guest Name</Th>
                            <Th>Means</Th>
                            <Th>Time In</Th>
                            <Th>Time Out</Th>
                            <Th>Timer Length</Th>
                            <Th>Server</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {orderData.map(({ roomNum, guestName, means, timeIn, timeOut, timerLen, serverName }) => (
                            <Tr>
                            <Td>{roomNum}</Td>
                            <Td>{guestName}</Td>
                            <Td>{means}</Td>
                            <Td>{timeIn.toLocaleDateString()} {timeIn.toLocaleTimeString()}</Td>
                            <Td>{timeOut ? timeOut.toLocaleDateString() : ''} {timeOut ? timeOut.toLocaleTimeString() : ''}</Td>
                            <Td>{String(Math.floor(timerLen / 60)).padStart(2, '0')}:{String(timerLen % 60).padStart(2, '0')}</Td>
                            <Td>{serverName}</Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                </Box>
            </GridItem>
            <AddNewOrderModal add={handleAdd} isOpen={showModal} close={() => setShowModal(false)}/>
        </Grid>
    )
}