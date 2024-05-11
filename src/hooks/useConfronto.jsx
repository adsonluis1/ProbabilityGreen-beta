import React from 'react'

const useConfronto = (time1,time2,partida,times) => {
    let ponintsTime1 = 0
    let ponintsTime2 = 0
    function getTime(nome){
        return times.filter((time)=> time.nome == nome)
    }

    function pointsMelhorAtaque (time1, time2){
    if(time1.golsMarcados > time2.golsMarcados)
        ponintsTime1+= 10
    else if(time1.golsMarcados < time2.golsMarcados)
        ponintsTime2+= 10
    else{
        ponintsTime1+= 10
        ponintsTime2+= 10
    }
    }

    function pointsMelhorDefesa(time1, time2){
    if(time1.golsSofridos > time2.golsSofridos)
        ponintsTime2+=10
    else if(time1.golsSofridos < time2.golsSofridos)
        ponintsTime1+=10
    else{
        ponintsTime1+= 10
        ponintsTime2+= 10
    }
    }

    function pointsG_A(time1,time2){
    let g_aTime1 = time1.golsMarcados - time1.golsSofridos
    let g_aTime2 = time2.golsMarcados - time2.golsSofridos
    if(g_aTime1 > g_aTime2)
        ponintsTime1+=10
    else if(g_aTime1 < g_aTime2)
        ponintsTime2+=10
    else{
        ponintsTime1+= 10
        ponintsTime2+= 10
    }
    }

    function pointsMandante(time1, partida){
    if(partida.casa == time1.nome)
        ponintsTime1+= 20
    else
    ponintsTime2+= 20
    }

    function pointsChanceVitoria(time1, time2){
    const chanceVitoriaTime1 = (time1.vitorias / time1.partidas).toFixed(2)
    const chanceVitoriaTime2 = (time2.vitorias / time2.partidas).toFixed(2)
    
    if(chanceVitoriaTime1 > chanceVitoriaTime2)
        ponintsTime1+=10
    else if(chanceVitoriaTime1 < chanceVitoriaTime2)
        ponintsTime2+=10
    else{
        ponintsTime1+= 10
        ponintsTime2+= 10
    }
    
    }
    
    function pointsUltimasPartidas (time1, time2){
    let chanceVitoriaTime1 = 0
    let chanceVitoriaTime2 = 0
    time1.jogosAnteriores.map((partida)=>{
        if(partida.casa == time1.nome && partida.resultado == 'Casa')
            chanceVitoriaTime1++
        else if(partida.casa == time1.nome && partida.resultado == 'Casa' && getTime(time1.nome).posicao < getTime(time2.nome).posicao -7)
            chanceVitoriaTime1+=2
        else if(partida.casa != time1.nome && partida.resultado == 'Fora')
        chanceVitoriaTime1+=2
        else if(partida.casa != time1.nome && partida.resultado == 'Fora' && getTime(time1.nome).posicao < getTime(time2.nome).posicao -4)
            chanceVitoriaTime1+=3
        else if(partida.casa != time1.nome && partida.resultado == 'Fora' && getTime(time1.nome).posicao - 7 > getTime(time2.nome).posicao)
            chanceVitoriaTime1++
        else if(partida.casa == time1.nome && partida.resultado == 'Fora')
            chanceVitoriaTime1-= 2
        else if(partida.casa == time1.nome && partida.resultado == 'Fora' && getTime(time1.nome).posicao - 4 > getTime(time2.nome).posicao)
            chanceVitoriaTime1-= 3
        else if(partida.casa != time1.nome && partida.resultado == 'Empate')
            chanceVitoriaTime1++
        else if(partida.casa == time1.nome && partida.resultado == 'Empate' && getTime(time1.nome).posicao - 4 > getTime(time2.nome).posicao)
            chanceVitoriaTime1--
        else if(partida.casa == time1.nome && partida.resultado == 'Empate' && getTime(time1.nome).posicao < getTime(time2.nome).posicao -4)
            chanceVitoriaTime1++
        })

        time2.jogosAnteriores.map((partida)=>{
        if(partida.casa == time2.nome && partida.resultado == 'Casa')
        chanceVitoriaTime2++
        else if(partida.casa == time2.nome && partida.resultado == 'Casa' && getTime(time2.nome).posicao < getTime(time1.nome).posicao -7)
        chanceVitoriaTime2+=2
        else if(partida.casa != time2.nome && partida.resultado == 'Fora')
        chanceVitoriaTime2+=2
        else if(partida.casa != time2.nome && partida.resultado == 'Fora' && getTime(time2.nome).posicao < getTime(time1.nome).posicao -4)
        chanceVitoriaTime2+=3
        else if(partida.casa != time2.nome && partida.resultado == 'Fora' && getTime(time2.nome).posicao - 7 > getTime(time1.nome).posicao)
        chanceVitoriaTime2++
        else if(partida.casa == time2.nome && partida.resultado == 'Fora')
        chanceVitoriaTime2-= 2
        else if(partida.casa == time2.nome && partida.resultado == 'Fora' && getTime(time2.nome).posicao - 4 > getTime(time1.nome).posicao)
        chanceVitoriaTime2-= 3
        else if(partida.casa != time2.nome && partida.resultado == 'Empate')
        chanceVitoriaTime2++
        else if(partida.casa == time2.nome && partida.resultado == 'Empate' && getTime(time2.nome).posicao - 4 > getTime(time1.nome).posicao)
        chanceVitoriaTime2--
        else if(partida.casa == time2.nome && partida.resultado == 'Empate' && getTime(time2.nome).posicao < getTime(time1.nome).posicao -4)
        chanceVitoriaTime2++
    })

    if(chanceVitoriaTime1>chanceVitoriaTime2)
        ponintsTime1+=10
    else if(chanceVitoriaTime1<chanceVitoriaTime2)
        ponintsTime2+=10
    else{
        ponintsTime1+=10
        ponintsTime2+=10
    }
    }
    const confronto = (time1, time2, partida) => {
        pointsMelhorAtaque(time1,time2)
        pointsMelhorDefesa(time1,time2)
        pointsG_A(time1,time2)
        pointsMandante(time1,partida)
        pointsChanceVitoria(time1,time2)
        pointsUltimasPartidas(time1,time2)
      }
      
      confronto(time1,time2,partida)
    
    
    return {ponintsTime1, ponintsTime2}
}

export default useConfronto