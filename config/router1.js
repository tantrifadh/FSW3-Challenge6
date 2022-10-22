const express = require('express');
const swaggerUI = require('swagger-ui-express');
const controllers = require('../app/controllers');
const apiRouter = express.Router();
const swgDoc = require('../openapi.json');

// open api docs
apiRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swgDoc)); 

// cars router
apiRouter.get(
  '/cars',
  controllers.api.v1.carController.listCar
);
apiRouter.post(
  '/cars',
  controllers.api.v1.authController.adminsAuthorize,
  controllers.api.v1.carController.createCar
);
apiRouter.put(
  '/cars/:id',
  controllers.api.v1.authController.adminsAuthorize, 
  controllers.api.v1.carController.updateCar
);
apiRouter.delete(
  '/cars/:id',
  controllers.api.v1.authController.adminsAuthorize, 
  controllers.api.v1.carController.deleteCar
);


// member
apiRouter.post(
  "/member/add", 
  controllers.api.v1.memberController.createMember
);
apiRouter.post(
  "/member/login", 
  controllers.api.v1.memberController.login
);

// superadmin
apiRouter.post(
  "/superadmin/login", 
  controllers.api.v1.superAdminController.login
);
apiRouter.post(
  "/superadmin/admin/add", 
  controllers.api.v1.authController.superAdminAuthorize, 
  controllers.api.v1.adminController.createAdmin
);
apiRouter.post(
  "/admin/login", 
  controllers.api.v1.adminController.login
);

apiRouter.get(
  "/user", 
  controllers.api.v1.authController.authorize, 
  controllers.api.v1.authController.whoAmI
);
// error handler
apiRouter.get('/api/v1/errors', () => {
  throw new Error(
    "Error ini"
  )
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;

