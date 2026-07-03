import { Request, Response, NextFunction } from 'express';
export declare function createProductController(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getProductsController(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getProductController(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function updateProductController(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteProductController(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function orderProductController(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function unorderProductController(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=productController.d.ts.map