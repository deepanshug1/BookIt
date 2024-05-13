// cors.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class currentUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Handle OPTIONS requests
    if (req.method === 'OPTIONS') {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
      );
      res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

      // Respond to OPTIONS request with 200 status
      res.sendStatus(200);
    } else {
      // Continue to the next middleware or route handler
      next();
    }
  }
}
