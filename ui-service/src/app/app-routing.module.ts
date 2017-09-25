import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./components/authguard";
import {SpeakersComponent} from "./speakers/speakers.component";
import {SessionsComponent} from "./sessions/sessions.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'speakers', component: SpeakersComponent, canActivate: [AuthGuard]},
  {path: 'sessions', component: SessionsComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
