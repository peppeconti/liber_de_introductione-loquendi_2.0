import { ApplicationConfig } from "@angular/core"
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router"
import { routes } from "./app.routes"

export const AppConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding(), withRouterConfig({
            paramsInheritanceStrategy: 'always'
        }))
    ]
}