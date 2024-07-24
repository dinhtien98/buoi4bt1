import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function API1() {
    const [data,setData]=useState([])
    const fetchAPI=()=>{
        const url="https://66a07bbb7053166bcabb8e6d.mockapi.io/Student"
        axios.get(url)
        .then(function(res)
            {
                setData(res.data)
            }
        )
        .catch(function(error){
            console.log(error)
        })
    }
    useEffect(()=>{
        fetchAPI();
    },[])
  return (
    <div>
        API1
        {
            data.map((item,index)=>(<h1 key={index}>id: {item.id}<br/>name: {item.name}<br/>age: {item.age}</h1>))
        }
    </div>
  )
}
