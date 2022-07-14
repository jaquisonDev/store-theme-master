import React, {useState, useEffect} from 'react';
import {useOrderForm} from 'vtex.order-manager/OrderForm';
import './global.css';

const ExibePontos: StorefrontFunctionComponent = () => {
    const {orderForm} = useOrderForm();
    console.log("Resposta: ", orderForm); 
    const userEmail = orderForm?.clientProfileData?.email;
    const [getValuePoints, setGetValuePoints] = useState('');
    useEffect(()=>{
        if(userEmail) {
            fetch(`/api/dataentities/PT/search?_fields=points&email=${userEmail}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                }
        
            }).then(response => response.json())
            .then(response => {
                console.log('Resposta: ',response);
                setGetValuePoints(response[0].points);
            })
        }
        
    },[userEmail])
    return (
        <div><span>Você tem : {getValuePoints} pontos</span></div>
    )
} 

export default ExibePontos;