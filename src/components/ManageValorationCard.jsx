import { Rating } from 'react-simple-star-rating';
import { tiempoDesde } from '../lib/utils';
import { useUser } from '../context/UserContext';

import { toast } from 'sonner';
import { acceptValoration } from '../api/valorations';

const ManageValorationCard = ({ valoration, onNewValoration }) => {
  const { user } = useUser();

  const handleAcceptValoration = async () => {
    const response = await acceptValoration(valoration);
    if (response.status === 200) {
      if (response?.data.user) {
        onNewValoration(valoration._id);
        toast.success('Valoración aceptada correctamente');
        return;
      }
    }
    toast.error('Error al aceptar la valoración');
  };
  return (
    <>
      {!valoration.accepted && (
        <div className='w-full flex flex-col p-4 bg-white shadow-lg rounded-lg mt-2'>
          <div className='flex items-start justify-start gap-4 w-full'>
            <img
              src={valoration.senderId.picture}
              alt='User'
              className='w-8 h-8 rounded-full object-cover'
            />
            <div className='text-start '>
              <p className='text-xs md:text-lg font-semibold'>
                {valoration.senderId.firstname} {valoration.senderId.lastname}
              </p>
              <p className='text-xs md:text-sm text-gray-500'>
                {valoration.senderId.email}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-6 pt-2'>
            <Rating
              SVGclassName={`inline-block`}
              initialValue={valoration.rating}
              transition
              size={18}
              readonly={true}
            />
            <p className='text-xs md:text-sm'>
              Hace {tiempoDesde(valoration.date)}
            </p>
          </div>
          <p className='text-start text-xs md:text-lg text-gray-600 mt-2'>
            {valoration.comment}
          </p>
          <div className='w-full flex justify-end mt-4 gap-3'>
            {user !== null && (
              <button
                className='text-xs md:text-sm text-white hover:bg-black rounded-md bg-gray-500 hover:text-white 
              px-2 py-1 hover:rounded-md whitespace-nowrap'
                onClick={handleAcceptValoration}>
                Aceptar Valoración
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ManageValorationCard;
