/* eslint-disable no-console */
import express from 'express';
import errorMiddleware from './middlewares/ErrorMiddleware';
import carRouter from './Routes/carRouter';

// import 'express-async-errors';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(carRouter);
    // Rota de Erro!
    this.app.use(errorMiddleware);

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
const { app } = new App();

export default app;
