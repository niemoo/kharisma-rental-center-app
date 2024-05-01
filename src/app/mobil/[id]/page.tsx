import Image from 'next/image';
import agyaManual1 from '../../../../public/agya-manual-1.jpg';

export default function SpecifiedPage({ params: { id } }: { params: { id: string } }) {
  return (
    <main className="max-w-screen-xl mx-auto p-5 md:py-5 md:px-0">
      <div className="md:flex border border-black rounded-lg p-5">
        <div className="md:w-1/2">
          <Image src={agyaManual1} alt="" className="mx-auto md:h-screen w-full md:w-fit rounded-lg" />
          <p>{id}</p>
        </div>
        <div className="md:w-1/2 flex items-center">
          <div className="border-l-2 border-blue-500 h-full mr-2 rounded md:block hidden"></div>
          <h2 className="text-4xl font-semibold">Toyota Agya</h2>
        </div>
      </div>
    </main>
  );
}
