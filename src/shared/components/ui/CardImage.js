import React, {useState} from 'react';
import { Card, Spinner } from 'react-bootstrap';

export default function CardImage({ src }) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  function handleLoad() {
    setIsLoading(false);
  }

  return (
    <Card>
      {
        isLoading && (
          <div className="loading-img">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          </div>
        )
      }
        <Card.Img variant="top" src={imageSrc} onLoad={handleLoad} />
    </Card>
  );
}
