import { ErrorRequestHandler, Router } from 'express';
import createHttpError from 'http-errors';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';

const routerApi = Router();

routerApi.use('/', authRoutes);
routerApi.use('/v1/users', userRoutes);

// catch 404 and forward to error handler
routerApi.use(async (req, res, next) => {
  next(createHttpError(404));
});

// error handler
routerApi.use((async (err, req, res, next) => {
  // set locals, only providing error in development
  const error = [
    {
      name: err.name,
      msg: err.message,
      ...(req.app.get('env') === 'development' ? { stack: err.stack, err } : {}),
    },
  ];
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.err = error;

  // render the error page
  res.status(err.status || 500);
  next();
}) as ErrorRequestHandler);
routerApi.use((req, res) => {
  res.json(res.locals.err);
});

const router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/api', routerApi);

export default router;
