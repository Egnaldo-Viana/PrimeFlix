import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';

const Filme = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: '5bc4565984f5d84e202811fea28f3b64',
            language: 'pt-BR',
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log('filme não encontrado');
          navigate('/', { replace: true });
          return;
        });
    }
    loadFilme();

    return () => {
      console.log('componente foi desmontado');
    };
  }, [navigate, id]);

  function salvarFilme() {
    // Busca no localStorage a lista de filmes já salva com a chave '@primeflix'
    const minhaLista = localStorage.getItem('@primeflix');

    // Converte a string do localStorage para array ou cria um array vazia se não existir nada
    let filmesSalvos = JSON.parse(minhaLista) || [];

    // Verifica se o filme atual já existe na lista (comparando o id)
    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id,
    );

    // Se o filme já estiver na lista, mostra alerta e interrompe a função
    if (hasFilme) {
      alert('filme na lista');
      return;
    }

    // Se não estiver na lista, adiciona o filme ao array
    filmesSalvos.push(filme);

    // Salva novamente a lista atualizada no localStorage em formato JSON
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
    alert('filme salvo com sucesso');
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} /10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
};

export default Filme;
