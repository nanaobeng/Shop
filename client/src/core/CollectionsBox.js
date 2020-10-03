import React, {useState, useEffect} from 'react'
import { getCollections } from './apiCore'


const CollectionsBox = ({collection, handleFilters}) => {

    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {

        const currentCollectionId = checked.indexOf(c)
        const newCheckedCollectionId = [...checked]

        if(currentCollectionId === -1){
            newCheckedCollectionId.push(c)
        }
        else {
            newCheckedCollectionId.splice(currentCollectionId)
        }

        //console.log(newCheckedCollectionId)
        setChecked(newCheckedCollectionId)
        handleFilters(newCheckedCollectionId)


    }

    return collection.map((c,i) => (
    <div className="pl-4">
        <li key={i} className="list-unstyled ">
            <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)}type="checkbox" className="form-check-input "/>
            <label className="form-check-label">{c.name}</label>
        </li>
        </div>

                
    ))



}

export default CollectionsBox