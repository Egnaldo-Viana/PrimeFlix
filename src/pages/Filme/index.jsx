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
        <button>Salvar</button>
        <button>
          <a
            target="_blank"
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
