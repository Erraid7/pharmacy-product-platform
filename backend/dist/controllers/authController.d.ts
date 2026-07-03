import { Request, Response, NextFunction } from 'express';
export declare function loginController(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function logoutController(req: Request, res: Response): Promise<void>;
export declare function meController(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authController.d.ts.map