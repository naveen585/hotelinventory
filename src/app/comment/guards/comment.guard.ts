import { ActivatedRouteSnapshot, CanActivateFn, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from '@angular/router';
import { Comments } from '../comment';
import { Observable } from 'rxjs';
import { CommentService } from '../comment.service';

export class commentGuard implements Resolve<Comments[]> {
  constructor(private commentsService: CommentService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Comments[] | RedirectCommand> {
   return this.commentsService.getComments();
  }
}