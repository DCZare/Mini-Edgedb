import { NextPage } from 'next';
import Head from 'next/head';
import './globals.css'; // Ensure to import your CSS file

type Work = {
  id: string;
  title: string;
  doi: string;
  abs: string;
}


const HomePage: NextPage = () => {
  const works = [
    {
      id: 'work1',
      title: 'The First Work',
      doi: '10.123',
      abs: 'Information found here.'
    },
    {
      id: 'work2',
      title: 'Another One',
      doi: '10.abc',
      abs: 'Not bad, chief.',
    }
  ];

  return (
    <div className="centered-container">
      <Head>
        <title>UBNS Bibliometrics Manager</title>
      </Head>
      <h1 className="centered-title">UBNS Bibliometrics Management Dashboard</h1>
      <div>
        {works.map(work => (
          <div key={work.id}>
            <h2 className="text-xl">{work.title}</h2> 
            <h2 className='text'>{work.abs}</h2>
            <h2 className='text'>{work.doi}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage;
