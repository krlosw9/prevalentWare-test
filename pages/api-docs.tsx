import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

function ApiDocs() {
  return (
    <div style={{ paddingBottom: '2rem' }}>
      <SwaggerUI url="/api/docs" />
    </div>
  );
}

export default ApiDocs;
