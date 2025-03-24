import { ErrorHandler } from "@angular/core";
import { concatAll } from "rxjs";

export class GlobalErrorHandler implements ErrorHandler{
    handleError(error: any): void {
        console.log(error);
    }
}