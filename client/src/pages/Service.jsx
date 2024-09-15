import React from 'react'
import { useAuth } from '../store/auth';


const Service = () => {
const {services} = useAuth();
console.log(services)
  return (
    <div>
      <h1>services</h1>
      {services.map((curEle,index)=>{
        return(
          <div className='card' key={index}>
            <div className="card-img">
              <img src="/images/design.png" width="200"/>
            </div>
            <div>
              <div className='card-details'>
                <div className='grid grid-two-col'>
                  <p>{curEle.provider}</p>
                  <p>{curEle.price}</p>
                </div>
                <h2>{curEle.service}</h2>
                <p>{curEle.description}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Service;
