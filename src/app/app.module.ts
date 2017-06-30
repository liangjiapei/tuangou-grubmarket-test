import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { DealsComponent } from './deals/deals.component';
import { DealListComponent } from './deals/deal-list/deal-list.component';
import { DealComponent } from './deals/deal-list/deal/deal.component';
import { DealItemComponent } from './deals/deal-list/deal/deal-item/deal-item.component';

import { DealService } from './deals/deal.service';
import { requestOptionsProvider } from './shared/http-client.service';
import { TimeService } from './shared/time.service';
import { DealDetailComponent } from './deals/deal-detail/deal-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    DropdownDirective,
    DealsComponent,
    DealListComponent,
    DealComponent,
    DealItemComponent,
    DealDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  providers: [ DealService, requestOptionsProvider, TimeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
