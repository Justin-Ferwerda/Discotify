import { useRouter } from 'next/router';
import { Button, FormControl } from 'react-bootstrap';

function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/albumPreview');
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <p>Go ahead and browse our extensive record collection! Enter an album name below and preview your selection!</p>
      <FormControl type="text" placeholder="Enter Album Name" />
      <Button variant="primary" onclick={handleClick}>Play Record</Button>
    </div>
  );
}

export default Home;
