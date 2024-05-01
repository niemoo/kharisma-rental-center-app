import CarsCard from '@/components/CarsCard';
import agyaManual1 from '../../../public/agya-manual-1.jpg';
import agyaManual2 from '../../../public/agya-manual-2.jpg';
import avanzaVeloz1 from '../../../public/avanza-veloz-1.jpg';
import avanzaVeloz2 from '../../../public/avanza-veloz-2.jpg';
import pickup1 from '../../../public/pickup-1.jpg';
import pickup2 from '../../../public/pickup-2.jpg';

export default function Mobil() {
  return (
    <main className="max-w-screen-xl mx-auto md:p-0 md:pt-5 p-5">
      <div className="grid md:grid-cols-3 gap-5">
        <CarsCard foto={agyaManual1} />
        <CarsCard foto={agyaManual2} />
        <CarsCard foto={avanzaVeloz1} />
        <CarsCard foto={avanzaVeloz2} />
        <CarsCard foto={pickup1} />
        <CarsCard foto={pickup2} />
      </div>
    </main>
  );
}
