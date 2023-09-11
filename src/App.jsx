import React, { useState, useRef, useEffect } from 'react'
import { Container, H1 } from './styles'
import EstiloGlobal from './styles'
import { v4 as chave } from 'uuid'
import Contato from './components/Contato'

function App() {
  const [contato, setContato] = useState({ id: '', nome: '', telefone: '' })
  const [listaContatos, setListaContatos] = useState([])

  //useRef
  const inputNome = useRef()
  const inputTelefone = useRef()

  function definirNome(event) {
    setContato({ ...contato, nome: event.target.value })
  }

  function definirTelefone(event) {
    setContato({ ...contato, telefone: event.target.value })
  }

  function adicionarContato() {
    // validação dos campos
    if (contato.nome === '' || contato.telefone === '') {
      console.log('return')
      return
    }

    // verifica se o contato já existe
    let duplicado = listaContatos.find(
      (ct) => ct.nome === contato.nome && ct.telefone === contato.telefone
    )
    if (typeof duplicado !== 'undefined') {
      inputTelefone.current.focus()
      return
    }

    // adicionar novo contato
    setListaContatos([...listaContatos, { ...contato, id: chave() }])

    // limpar inputs
    setContato({ nome: '', telefone: '' })

    // colocar focus no input nome
    inputNome.current.focus()
  }

  function enterAdicionarContato(event) {
    if (event.code === 'Enter') {
      adicionarContato()
    }
  }

  // carregar listaContatos localStorage

  useEffect(() => {
    if (localStorage.getItem('meus_contatos') !== null) {
      setListaContatos(JSON.parse(localStorage.getItem('meus_contatos')))
    }
  }, [])

  // atualizar a lista de contatos
  useEffect(() => {
    localStorage.setItem('meus_contatos', JSON.stringify(listaContatos))
  }, [listaContatos])

  // limpar toda a lista
  function limparStorage() {
    setListaContatos([])
  }

  // remover um contato da lista
  function removerContato(id) {
    let tmp = listaContatos.filter((ct) => ct.id !== id)
    setListaContatos(tmp)
  }

  return (
    <>
      <EstiloGlobal />
      <Container>
        <div className="App">
          <H1>Lista de contatos</H1>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              ref={inputNome}
              onChange={definirNome}
              value={contato.nome}
            />
          </div>
          <div>
            <label>Telefone:</label>
            <input
              ref={inputTelefone}
              type="text"
              onChange={definirTelefone}
              onKeyUp={enterAdicionarContato}
              value={contato.telefone}
            />
          </div>
          <button onClick={adicionarContato}>Adicionar</button>
          <button onClick={limparStorage}>Limpar lista</button>
        </div>
        {/* <ListaContatos listaContatos={listaContatos} /> */}
        {listaContatos.map((ct) => {
          return (
            <Contato
              key={ct.id}
              id={ct.id}
              nome={ct.nome}
              telefone={ct.telefone}
              remover={removerContato}
            />
          )
        })}
      </Container>
    </>
  )
}

export default App
