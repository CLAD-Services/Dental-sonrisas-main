import { Play } from 'lucide-react';

export default function FloatingBanner() {
  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[1000] w-[calc(100vw-6.5rem)] md:w-auto">
      <div className="bg-[#263b5e] rounded-xl shadow-2xl p-3 md:p-4 pr-3 md:pr-5 flex items-center gap-3 md:gap-4 border border-white/5 font-sans overflow-hidden">
        
        {/* Ícono de Play */}
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
          <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-white ml-0.5 md:ml-1" />
        </div>

        {/* Textos */}
        <div className="flex flex-col flex-1 min-w-0 md:mr-2">
          <h3 className="text-white font-bold text-[13px] md:text-[15px] leading-tight truncate md:whitespace-normal">
            Previsualización en Vivo<span className="md:hidden"> por </span><span className="hidden md:inline"><br />por </span>CLAD Services
          </h3>
          <p className="text-[#8ba2c4] text-[9px] md:text-[10px] font-bold tracking-wide mt-0.5 md:mt-1 leading-tight truncate md:whitespace-normal">
            SOLUCIONES DIGITALES <span className="md:hidden">WEB EMPREDEDOR</span><span className="hidden md:inline">WEB<br />EMPREDEDOR</span>
          </p>
        </div>

        {/* Botón Contratar */}
        <a
          href="https://wa.me/51925928592?text=Hola%20quiero%20cotizar%20la%20pagina%20Dental%20sonrisas"
          className="bg-white text-[#263b5e] px-4 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl font-bold text-xs md:text-sm hover:bg-gray-100 transition-transform active:scale-95 shadow-sm shrink-0"
        >
          Contratar
        </a>
        
      </div>
    </div>
  );
}