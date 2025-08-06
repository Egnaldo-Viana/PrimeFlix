import React from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Favoritos = () => {
  const [filmes, setFilmes] = React.useState([]);

  React.useEffect(() => {
    // Busca a lista de filmes salva no localStorage com a chave '@primeflix'
    const minhaLista = localStorage.getItem('@primeflix');

    // Converte o JSON para array e atualiza o estado 'filmes'
    // Se não existir nada no localStorage, será definido como []
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    // Cria um novo array filtrando os filmes que não possuem o id passado
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });

    // Atualiza o estado 'filmes' com o novo array filtrado
    setFilmes(filtroFilmes);

    // Atualiza o localStorage com a nova lista de filmes sem o filme excluído
    localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes));
    toast.success('Filme removido com sucesso');
  }

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>

      {filmes.length === 0 && (
        <span> Você não possui nenhum filme salvo :( </span>
      )}

      <ul>
        {filmes.map((filme) => {
          return (
            <li key={filme.id}>
              <span>{filme.title}</span>
              <div>
                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Favoritos;
