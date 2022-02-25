import { Router } from "express";

import AuthenticateUserController from "../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import RefreshTokenController from "../../../../modules/accounts/useCases/refreshToken/RefreshTokenController";

const authencitcateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authencitcateRoutes.post("/sessions", authenticateUserController.handle);
authencitcateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authencitcateRoutes };
