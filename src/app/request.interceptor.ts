import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Request parameter: ",req);

const newRequest = req.clone({
  headers: new HttpHeaders({token: '65435181351846'}),
});
  return next(newRequest);
};
