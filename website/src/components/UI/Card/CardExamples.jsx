import { Card } from '@site/src/components/UI';

const ProtocolIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z"/>
  </svg>
);

const ToolsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z"/>
  </svg>
);

const TutorialsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M17 17H7V15H17V17M17 13H7V11H17V13M17 9H7V7H17V9Z"/>
  </svg>
);


const CardExamples = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Card Component Examples</h2>
      
      <div className="row" style={{ marginBottom: '40px' }}>
        <div className="col col--4">
          <Card
            title="Card Básica"
            description="Esta es una card básica sin variantes especiales."
          >
            <p>Contenido adicional puede ir aquí.</p>
          </Card>
        </div>
        <div className="col col--4">
          <Card
            title="Card con Link"
            description="Esta card funciona como un enlace."
            href="/docs/getting-started"
          />
        </div>
        <div className="col col--4">
          <Card
            title="Card Clickeable"
            description="Esta card ejecuta una función al hacer click."
            onClick={() => alert('¡Card clickeada!')}
          />
        </div>
      </div>

      <h3>Cards con Íconos</h3>
      <div className="row" style={{ marginBottom: '40px' }}>
        <div className="col col--4">
          <Card
            variant="icon"
            title="Protocolo"
            description="Aprende sobre el protocolo NEAR y sus características principales."
            href="/docs/protocol"
            icon={<ProtocolIcon />}
          />
        </div>
        <div className="col col--4">
          <Card
            variant="icon"
            title="Herramientas"
            description="Explora las herramientas de desarrollo disponibles."
            href="/docs/tools"
            icon={<ToolsIcon />}
          />
        </div>
        <div className="col col--4">
          <Card
            variant="icon"
            title="Tutoriales"
            description="Sigue nuestros tutoriales paso a paso para comenzar."
            href="/docs/tutorials"
            icon={<TutorialsIcon />}
          />
        </div>
      </div>

      <h3>Cards con Imágenes</h3>
      <div className="row" style={{ marginBottom: '40px' }}>
        <div className="col col--6">
          <Card
            variant="image"
            title="Ejemplo con Imagen"
            description="Esta card incluye una imagen en la parte superior."
            image="https://via.placeholder.com/400x200/4f46e5/ffffff?text=NEAR"
            href="/docs/example"
          />
        </div>
        <div className="col col--6">
          <Card
            variant="image"
            title="Otro Ejemplo"
            description="Otra card con imagen para mostrar la flexibilidad del componente."
            image="https://via.placeholder.com/400x200/06b6d4/ffffff?text=Card"
            onClick={() => console.log('Card con imagen clickeada')}
          />
        </div>
      </div>

      <h3>Cards con Variantes de Color</h3>
      <div className="row" style={{ marginBottom: '40px' }}>
        <div className="col col--4">
          <Card
            color="mint"
            title="Have a question? Ask our experts"
            description="NEAR is a global community of Web3 enthusiasts and innovators. Dive into one of our social channels to engage in discussion with our lively community."
            href="/community"
          >
            <h4>CHANNELS</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '12px' }}>
              <div>📱 Telegram</div>
              <div>💬 Discord</div>
              <div>📚 Docs</div>
              <div>💬 WeChat</div>
              <div>🐙 GitHub</div>
              <div>𝕏 X</div>
            </div>
          </Card>
        </div>
        <div className="col col--4">
          <Card
            color="purple"
            title="Office Hours:"
            description="Jump in a voice call with our developers"
            href="/office-hours"
          >
            <p><strong>Thursdays: 11:00hs & 18:00hs GMT</strong></p>
            <div style={{ marginTop: '16px' }}>
              <button style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '6px',
                color: 'inherit'
              }}>
                🎮 Join our Discord
              </button>
            </div>
          </Card>
        </div>
        <div className="col col--4">
          <Card
            color="orange"
            title="Resolve an issue"
            description="Get in touch with our customer care team"
            href="/support"
          >
            <div style={{ marginTop: '16px' }}>
              <button style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '6px',
                color: 'inherit'
              }}>
                📋 Launch support form
              </button>
            </div>
          </Card>
        </div>
      </div>

      <h3>Card con Contenido Personalizado</h3>
      <div className="row">
        <div className="col col--8">
          <Card title="Contenido Personalizado">
            <p>Esta card contiene contenido personalizado:</p>
            <ul>
              <li>Lista de elementos</li>
              <li>Enlaces personalizados: <a href="/docs">Documentación</a></li>
              <li>Texto con formato <strong>en negrita</strong></li>
            </ul>
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '4px' }}>
              <code>código de ejemplo</code>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CardExamples;
