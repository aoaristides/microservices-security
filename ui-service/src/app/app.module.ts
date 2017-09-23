import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {AlertModule} from "ng2-bootstrap";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {TooltipModule} from "primeng/components/tooltip/tooltip";
import {LoadingIndicator} from "./loading/loading-indicator";
import {MenubarModule} from "primeng/components/menubar/menubar";
import {GrowlModule} from "primeng/components/growl/growl";
import {DialogModule} from "primeng/components/dialog/dialog";
import {PanelModule} from "primeng/components/panel/panel";
import {AuthGuard} from "./components/authguard";
import {HttpService} from "./components/httpservice";
import {LoginService} from "./login/login.service";
import {HomeComponent} from "./home/home.component";
import {SpeakersComponent} from "./speakers/speakers.component";
import {SpeakersService} from "./speakers/speakers.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SpeakersComponent,
    LoadingIndicator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    DataTableModule,
    SharedModule,
    DropdownModule,
    TooltipModule,
    MenubarModule,
    GrowlModule,
    DialogModule,
    PanelModule
  ],
  providers: [
    HttpService,
    LoginService,
    SpeakersService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
