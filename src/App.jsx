import { useEffect, useState } from 'react'
import './App.css'
import useGetBrasileirão from './hooks/useGetBrasileirão'
import useConfronto from './hooks/useConfronto'

function App() {
  const {campeonatoBrasileiro} = useGetBrasileirão()
  let times = []
  const jogosAnteriores=[
    {
    jogo:'Chapecoense x Confiança',
    casa: 'Chapecoense',
    golsCasa: 2,
    golsFora: 3,
    golsPartida:5,
    ambosMarca: true,
    resultado: 'Fora' ,
    },
    {
    jogo:'Confiança x Chapecoense',
    casa: 'Confiança',
    golsCasa: 3 ,
    golsFora: 3 ,
    golsPartida:6,
    ambosMarca: true,
    resultado: 'Empate' ,
      },
    {
    jogo:'Chapecoense x Confiança',
    casa: 'Chapecoense',
    golsCasa: 1 ,
    golsFora: 0 ,
    golsPartida:1,
    ambosMarca: false,
    resultado: 'Casa' ,
      }
  ]
  
  campeonatoBrasileiro && campeonatoBrasileiro.map((time)=>{
    const infoTime = new Object({
      nome:time.time.nome_popular,
      partidas:time.jogos,
      vitorias: time.vitorias,
      derrotas: time.derrotas,
      empates:time.empates,
      golsMarcados:time.gols_pro,
      golsSofridos:time.gols_contra,
      saldoDeGols: time.saldo_gols,
      jogosAnteriores:jogosAnteriores,
      próximosJogos:[],
      posicao:time.posicao
    })
    times.push(infoTime)
  })
  
  

  const partida = {
    casa: 'Chapecoense',
    horario: '18:30'  
  }

  
  // Function para analisar quantos gols sofreu em times do rank que ele vai jogar
  // Function para analisar o historico de partida das 2 equipes
 

  
  useEffect(()=>{
    times.sort((a,b)=> a.posicao - b.posicao)
    times.length>0 && console.log(times)
    times.length>0 && console.log(useConfronto(times[0],times[14],partida,times))
  },[times])


  return (
    <>
      <h1>Ola Mundo</h1>
    </>
  )
}

export default App
