import { Link } from 'react-router-dom';

const OtherPage = () => {
  return (
    <div>
      Im on another page!
      <br />
      <br />
      <Link to="/">Home Screen</Link>
    </div>
  );
}

export default OtherPage;