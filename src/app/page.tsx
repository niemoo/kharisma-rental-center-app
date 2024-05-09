import CarsCard from '@/components/CarsCard';

async function getData() {
  const res = await fetch('http://localhost:3001/cars');
  return res.json();
}

export default async function Home() {
  const carsData = await getData();
  console.log(carsData.data[0]);
  return (
    <main className="max-w-screen-xl mx-auto md:p-0 md:pt-5 p-5">
      <div className="grid md:grid-cols-3 gap-5">
        {carsData.data.map((data: any) => (
          <CarsCard
            key={data.id}
            carId={data.id}
            carName={data.name}
            // carImage={`localhost:3001/${data.image}`} // Fixed URL format
            carCategory={data.category_id}
            carYear={data.year}
            carCapacity={data.capacity}
            carTransmission={data.transmission}
            carPrice_12={data.price_12}
            carPrice_24={data.price_24}
          />
        ))}
      </div>
    </main>
  );
}
