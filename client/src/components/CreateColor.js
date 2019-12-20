import React, {useState} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';


const CreateColor = (props) => {
    const [newColor, setIsNewColor] = useState({
        color: '',
        hex: ''
    })

    //handleInputChanges
    const handleInputChanges = (event) => {
        setIsNewColor({
            ...newColor,
            [event.target.name]: event.target.value
        })
    }

    //handleNewColorSubmit
    //axiosWithAuth --> /api/colors
    const handleNewColorSubmit = (event) => {
        event.preventDefault();

        //axiosWithAuth
        axiosWithAuth()
            .post('/api/color', newColor)
            .then(response => {
                console.log(response)

                //set values to empty
                setIsNewColor({
                    color: '',
                    hex: ''
                })

                props.setIsFetching(!props.isFetching)
            })
            .catch(error => {
                console.log('Sorry, new color not made', error)
            })
    } 

    return(
        <div>
            <h3>Add a new color</h3>
            <form >
                <input 
                    type='text'
                    name='color'
                    placeholder='Color'
                    value={newColor.color}
                    onChange={handleInputChanges}
                />
                <input 
                    type='number'
                    name='hex'
                    placeholder='Hex'
                    value={newColor.hex}
                    onChange={handleInputChanges}
                />
                <button type='submit'>Add color</button>
            </form>
        </div>
    )
}

export default CreateColor;