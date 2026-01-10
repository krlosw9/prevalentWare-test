import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

const ApiDocs = () => (
  <div style={{ paddingBottom: '2rem' }}>
    <SwaggerUI url='/api/openapi.json' />
  </div>
);

export default ApiDocs;
