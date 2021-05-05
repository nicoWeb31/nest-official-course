import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decoratot';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly configServ : ConfigService
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get(
            IS_PUBLIC_KEY,
            context.getHandler()
        );

        if (isPublic) {
            return true;
        }

        const req = context.switchToHttp().getRequest<Request>();
        const autheader = req.header('Authorization');

        return autheader === this.configServ.get('API_KEY');
    }
}
