import { Center, Button, Grid, GridItem, Card, SimpleGrid, Heading } from "@chakra-ui/react";
import { useState } from 'react';
import Order, { OrderProps } from "./order";
import AddNewOrderModal from "./add_new_order_modal";

export default function ActiveOrders() {

    const initial_order_data: OrderProps[]= [];

    const [orderData, setOrderData] = useState(initial_order_data);

    const handleAdd = (newOrder: OrderProps) => {
        setOrderData([...orderData, newOrder]) 
    }

    const handleRemove = (key: string) => {
        setOrderData((current) => current.filter((order) => (order.roomNum + order.guestName) !== key))
    }

    const [showModal, setShowModal] = useState(false);
    return (
        <Grid width={'90%'} templateColumns={"1fr"}>
            <GridItem colSpan={1}>
                <Grid templateColumns="1fr 1fr" gap={4}>
                    <GridItem colSpan={1}>
                        <Heading>Active Orders ({orderData.length})</Heading>
                    </GridItem>

                    <GridItem colSpan={1} textAlign="right">
                        <Button colorScheme="teal" onClick={() => setShowModal(true)}>Add Order</Button>
                    </GridItem>
                </Grid>
            </GridItem>
            <GridItem colSpan={1}>
                <Card height={'600px'} overflowY={'auto'} maxHeight={'600px'} margin={'5px'}padding={'15px'} variant={'filled'}>
                    <SimpleGrid margin="5px" columns={orderData.length === 0 ? 1 : 5} spacing={5}>
                        {orderData.length  === 0 ? <Center marginTop={'20%'}>No Active Orders</Center> : orderData.map((object, i) => <Order remove={handleRemove} key={object.roomNum+object.guestName} timeIn={object.timeIn} timerLen={object.timerLen * 60} guestName={object.guestName} roomNum={object.roomNum} means={object.means} serverName={object.serverName}/>)}
                    </SimpleGrid>
                </Card>
            </GridItem>
            <AddNewOrderModal add={handleAdd} isOpen={showModal} close={() => setShowModal(false)}/>
        </Grid>
    )
}