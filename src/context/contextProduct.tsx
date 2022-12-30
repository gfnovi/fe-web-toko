import axios from "axios";
import {API_URL} from '../utils/constant'
import {createContext, useState, useEffect} from 'react'


export type productContent = {
  listValue: [{}]
  setListValue:(c: []) => void
}
export const productContext = createContext<productContent>({
  listValue:[{}],
  setListValue:()=>[]
})

export type basketContent = {
    values: number
    setvalues:(c: number) => void
  }
  
export const basketContext = createContext<basketContent>({
values: 0, // set a default value
setvalues: () => {},
})



