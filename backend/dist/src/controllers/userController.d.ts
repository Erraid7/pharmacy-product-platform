import { Request, Response, NextFunction } from 'express';
export declare function createUserController(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getUsersController(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getUserController(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function updateUserController(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteUserController(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=userController.d.ts.map