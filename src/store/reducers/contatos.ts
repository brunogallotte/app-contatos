import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Contato from "../../models/Contato";

type ContatosState = {
  itens: Contato[];
};

const initialState: ContatosState = {
  itens: [
    {
      id: 1,
      name: "Bruno",
      email: "bruno@gmail.com",
      tell: '21986451966',
    }
  ]
}

const contatosSlice = createSlice({
  name: "Contatos",
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
        state.itens = state.itens.filter((contato) => contato.id !== action.payload)
    },
    editar: (state, action: PayloadAction<Contato>) => {
        const indexContato = state.itens.findIndex((contato) => contato.id === action.payload.id) 

        if(indexContato >= 0) {
            state.itens[indexContato] = action.payload
        }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contato, 'id'>>) => {
      const contatoExistente = state.itens.find(contato => contato.name.toLowerCase() === action.payload.name.toLowerCase()) 
      
      const tempTell = action.payload.tell
      if(tempTell.length < 8) {
        alert('Número de telefone inválido!')
      } else {
        if(contatoExistente) {
          alert('O contato já se encontra na lista!')
        } else {
          const ultimoContato = state.itens[state.itens.length - 1]
          
          const novaTarefa = {
            ...action.payload,
            id: ultimoContato ? ultimoContato.id + 1 : 1
          }
  
          state.itens.push(novaTarefa)
          alert('Contato cadastrado!')
        }
      }
      

    }
  },
})

export const { remover, editar, cadastrar } = contatosSlice.actions

export default contatosSlice.reducer
