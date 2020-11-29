import React from 'react'
import {API} from '../config'

const CartImage = ({item, url}) => (
    <div className="product-img">
        <img src={`${API}${url}/photo/${item._id}`} alt={item.name} className="mb-3" style={{maxHeight: '80px',minHeight: '80px', maxWidth: '100%',minWidth: '100%'}} />
       
    </div>
)


export default CartImage;