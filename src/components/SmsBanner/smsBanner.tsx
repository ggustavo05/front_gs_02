'use client';

import { useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';

export default function SmsBanner() {
  const [status, setStatus] = useState('');

  const enviarSMS = async () => {
    setStatus('Enviando...');

    try {
      const response = await fetch('https://gssoslocalizajava-production.up.railway.app/sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'Maria Silva',
          ddd: 11,
          phoneNumber: '966696589',
          message: 'Ajuda!',
        }),
      });

      if (!response.ok) throw new Error('Erro ao enviar SMS');
      
      setStatus('✅ SMS enviado com sucesso!');
    } catch (err) {
      console.error(err);
      setStatus('❌ Erro ao enviar SMS');
    }
  };

  return (
    <div className="flex flex-col items-center text-center mt-8 space-y-4 px-6 pb-10">
      <p className="text-[#446EA4] font-semibold text-base">
        Está em uma área de risco?<br />Estamos aqui para ajudar.
      </p>

      <button
        onClick={enviarSMS}
        className="bg-[#8B0000] text-white font-semibold px-6 py-2 rounded-full shadow-md hover:brightness-110 transition flex items-center"
      >
        Enviar SMS
        <FiMessageSquare className="ml-2 text-white" />
      </button>

      {/* Mensagem de status com a cor #446EA4 */}
      {status && <p className="text-[#446EA4] text-sm mt-2">{status}</p>}
    </div>
  );
}
