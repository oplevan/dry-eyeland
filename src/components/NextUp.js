import Data from '../pageData.json';
import { Link } from 'react-router-dom';
import '../styles/components/next-up.scss';

export default function NextUp(props) {
  const nextData = Data.filter((item) => item.url === props.url)[0];

  return (
    <section className='container next-up'>
      <h2>Next up:</h2>
      <div className='box'>
        <div>
          <img src={require(`../assets/${nextData.nextImage}`).default} alt='Lorem ipsum' />
        </div>

        <div className='text'>
          <h3>{nextData.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: nextData.nextUpText }}></p>
          <Link to={nextData.url} className='link'>
            Let's go
          </Link>
        </div>
      </div>
    </section>
  );
}
