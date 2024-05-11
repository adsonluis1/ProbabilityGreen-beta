import {useState, useEffect} from 'react'

const useGetBrasileirão = () => {
  const [campeonatoBrasileiro, setCampeonatoBrasileiro] = useState('')
  const API_KEY_TEST= import.meta.env.VITE_UNSPLASH_API_KEY_TESTE
  const API_URL_BRASILEIRO = import.meta.env.VITE_UNSPLASH_API_URL_BRASILEIRO
  
  
  useEffect(()=>{
    const GetCampeonatoBrasileiro = async ()=>{
      const Fetch = await fetch(API_URL_BRASILEIRO,{
        method:'GET',
        headers : {Authorization: 'Bearer '+API_KEY_TEST}
      })
      const data = await Fetch.json()
      setCampeonatoBrasileiro(data)
    }
    GetCampeonatoBrasileiro()
  },[])

  return {campeonatoBrasileiro}
}

export default useGetBrasileirão



