import React, { useEffect, useState } from 'react'

export default function Hook1() {
    const [count,setCount]=useState(1)
    const [number,setNumber]=useState(1)
    useEffect(()=>{
        console.log("side effect")
    },[count])
    console.log("render hook1")
    useEffect(()=>{
        const timer = setInterval(()=>{
            setCount(preState=>preState+1)
            console.log("a")
        },1000)
        return()=>{
            clearInterval(timer)
            console.log("day la cleanup")
        }
    },[])
  return (
    <div>
        <h1>tim hieu ve useEffect</h1>
        <p>count: {count}</p>
        <button onClick={()=>setCount(count+1)}>count up</button>
        <p>number: {number}</p>
        <button onClick={()=>setNumber(number+1)}>count up</button>
    </div>
  )
}
