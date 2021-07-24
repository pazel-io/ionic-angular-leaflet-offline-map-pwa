import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AddressSearchComponentComponentModule } from '../address-search-component/address-search-component.module';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeafletModule,
    HomePageRoutingModule,
    AddressSearchComponentComponentModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
