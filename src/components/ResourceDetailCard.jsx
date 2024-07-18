import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import clsx from 'clsx';
import { useUser } from '../context/UserContext';

const ResourceDetailCard = ({ resource }) => {
  console.log(resource);
  const { user } = useUser();
  console.log(user);
  const {
    title,
    description,
    autor,
    creatorId,
    date: publishDate,
    image,
    level,
    discipline,
    subDicipline,
    language,
    externalLink,
    pdfDocument,
    valorationsAverage,
    autor: { socials } = {}
  } = resource;
  
  
  const [rating, setRating] = useState(4);

  const [ratingComment, setRatingComment] = useState('');
  const tooltipArray = ['Malo', 'Regular', 'Bueno', 'Muy bueno', 'Excelente'];
  const [showComments, setShowComments] = useState(false);

  const handleRating = (index) => {
    console.log(index);
    setRating(index);
  };

  const handleValoration = () => {
    console.log(rating, ratingComment);
    const newValoration = {
      rating,
      comment: ratingComment,
      userId: user?._id,
      eventId: resource._id,
    };
    console.log(newValoration);
  };

  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden m-4'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto my-8'>
        <h2 className='font-bold text-2xl md:text-4xl text-gray-800 mb-6 text-center'>
          {title}
        </h2>
        {image && (
          <img
            src={image}
            alt='Resource'
            className='w-full md:w-3/4 h-auto mx-auto rounded-lg mb-6'
          />
        )}
        {description && (
          <p className='text-gray-700 text-lg md:text-xl mb-4'>{description}</p>
        )}
        {autor?.autorName && (
          <p className='text-gray-600 text-lg md:text-xl mb-2'>
            <strong>Autor:</strong> {autor.autorName}
          </p>
        )}
        {creatorId && (
          <p className='text-gray-700 text-lg md:text-xl mb-4'>
            <strong>Página del creador:</strong> <a href={`http://www.eduplat.org/public-profile/${creatorId}`} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Página creador</a>
          </p>
        )}
        {publishDate && (
          <p className='text-gray-600 text-lg md:text-xl mb-2'>
            <strong>Publicado:</strong> {new Date(publishDate).toLocaleDateString()}
          </p>
        )}
        {level && (
          <p className='text-gray-600 text-lg md:text-xl mb-2'>
            <strong>Nivel:</strong> {level}
          </p>
        )}
        {discipline && discipline.length > 0 && (
          <p className='text-gray-600 text-lg md:text-xl mb-2'>
            <strong>Disciplina:</strong> {discipline.join(', ')}
          </p>
        )}
        {subDicipline && subDicipline.length > 0 && (
          <p className='text-gray-600 text-lg md:text-xl mb-2'>
            <strong>Subdisciplina:</strong> {subDicipline.join(', ')}
          </p>
        )}
        {language && (
          <p className='text-gray-600 text-lg md:text-xl mb-2'>
            <strong>Lenguaje:</strong> {language}
          </p>
        )}
        {externalLink && (
          <p className='text-gray-600 text-lg md:text-xl mb-2'>
            <strong>Link externo:</strong> <a href={externalLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{externalLink}</a>
          </p>
        )}
        {pdfDocument && (
          <p className='text-gray-600 text-lg md:text-xl mb-2'>
            <strong>PDF Documento:</strong> <a href={pdfDocument} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Ver documento</a>
          </p>
        )}
        {valorationsAverage && (
          <p className='text-gray-600 text-lg md:text-xl mb-2'>
            <strong>Media de Valoraciones:</strong> {`${valorationsAverage.average}/5 - ${valorationsAverage.votes} evaluaciones`}
          </p>
        )}
        {socials && socials.length > 0 && (
          <p className='text-gray-600 text-lg md:text-xl mb-2'>
            <strong>Sociales:</strong> 
            {socials.map((social, index) => (
              <span key={index} className="block">
                {social.media}: {social.user}
              </span>
            ))}
          </p>
        )}
      </div>


      {/* Comentarios y valoraciones */}
      {user && user !== null && (
        <div className='bg-gray-100 p-6 rounded-lg shadow-lg max-w-6xl mx-auto my-8'>
          <h3 className='text-lg font-semibold mb-4'>
            Deja tu comentario y valoración
          </h3>
          <div className='mb-4'>
            <textarea
              onChange={(e) => setRatingComment(e.target.value)}
              className='w-full p-2 text-gray-700 border rounded-lg focus:outline-none'
              rows='4'
              placeholder='Deja tu comentario...'></textarea>
          </div>

          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center justify-between gap-2'>
              <Rating
                SVGclassName={`inline-block`}
                onClick={handleRating}
                initialValue={rating}
                transition
                size={25}
                showTooltip
                tooltipArray={tooltipArray}
                tooltipClassName={clsx(
                  'text-xs p-1 px-2',
                  rating === 0 && 'hidden',
                  rating === 1 && 'bg-red-500',
                  rating === 2 && 'bg-yellow-500',
                  rating === 3 && 'bg-green-500',
                  rating === 4 && 'bg-green-500',
                  rating === 5 && 'bg-green-500'
                )}
              />
              <button
                onClick={() => setRating(0)}
                type='button'
                className='p-1 mr-10 text-xs bg-black text-white px-2 rounded-md'>
                Reset stars
              </button>
            </div>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs'
              onClick={handleValoration}>
              Enviar
            </button>
          </div>
        </div>
      )}

      {/* Ver más / menos */}
      <div className='flex items-center justify-center py-2 px-2'>
        {' '}
        {/* TODO: Quitar bg */}
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => setShowComments(!showComments)}>
          {showComments ? 'Ocultar Comentarios' : 'Mostrar Comentarios'}
        </button>
        {showComments && <div>{/* Comentarios */}</div>}
      </div>
    </div>
  );
};

export default ResourceDetailCard;
