import React from 'react';
import { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import './cards.css';
import instance from './axios';
const Card = () => {

    const [people, setPeople] = useState([ ]);


    useEffect(() => {
        async function fetchData() {
            const req = await instance.get('/tinder/cards');
            setPeople(req.data);
        }
        fetchData();
    }, []);

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete);
        setLastDirection(direction);
    }

    const outOfFrame = (name) => {  
        console.log(name + ' left the screen!')
    }

    return (
        <>
        <div className="cards">
            <div className="cardContainer"> 
            {people.map((person) => {
                const {name, age, imageUrl} = person;
                return (

                    <TinderCard
                    className='swipe absolute'
                    key={name}
                    onSwipe={(dir) => swiped(dir, name)}
                    onCardLeftScreen={() => outOfFrame(name)}
                    >
                    <div
                        style={{ backgroundImage: `url(${imageUrl})` }}
                        className='card'>
                    
                        <h3>{name}</h3>
                        
                    </div>

                    </TinderCard>
                )
            })}
            </div>

        </div>
        </>              
    )
}


export default Card;