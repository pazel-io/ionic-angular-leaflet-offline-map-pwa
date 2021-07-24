/// <reference types="google.maps" />

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import AutocompleteResponse = google.maps.places.AutocompleteResponse;
import AutocompletePrediction = google.maps.places.AutocompletePrediction;

@Component({
  selector: 'app-address-search-component',
  templateUrl: './address-search-component.component.html',
  styleUrls: ['./address-search-component.component.scss'],
})
export class AddressSearchComponentComponent {
  @ViewChild('result') result: any;
  @Output() placeSelect: EventEmitter<any> = new EventEmitter();
  public predictions: AutocompletePrediction[] = [];
  public predictionsVisible = false;
  private autocompleteService: google.maps.places.AutocompleteService;
  private placesService: google.maps.places.PlacesService;
  private sessionToken: google.maps.places.AutocompleteSessionToken;

  constructor() {
  }

  public async lookupAddress(event) {
    if(event.target.value === ''){
      return;
    }
    const addressQuery = event.target.value;
    const autocompleteResponse = await this.getPlacePredictions(addressQuery);
    this.predictions = autocompleteResponse.predictions;
    this.predictionsVisible = this.predictions.length > 0;
    console.log('predictions', autocompleteResponse.predictions);
  }

  public showPredictions() {
    this.predictionsVisible = this.predictions.length > 0;
  }

  public clearPredictions() {
    this.predictionsVisible = false;
    this.predictions = [];
  }

  public getPlaceDetails(placeId: string) {
    this.predictionsVisible = false;
    this.getPlacesService().getDetails({
      placeId,
      sessionToken: this.getSessionToken(),
      fields: ['formatted_address', 'geometry'],
    }, (placeResult) => this.placeSelect.emit(placeResult));
  }

  private getPlacePredictions(addressQuery: string): Promise<AutocompleteResponse> {
    return this.getAutocompleteService().getPlacePredictions({
      componentRestrictions: {country: ['au']},
      input: addressQuery,
      sessionToken: this.getSessionToken(),
      types: ['address'],
    });
  }

  private getPlacesService() {
    if (this.placesService) {
      return this.placesService;
    }
    this.placesService = new google.maps.places.PlacesService(this.result.nativeElement);
    return this.placesService;
  }

  private getAutocompleteService() {
    if (this.autocompleteService) {
      return this.autocompleteService;
    }
    this.autocompleteService = new google.maps.places.AutocompleteService();
    return this.autocompleteService;
  }

  private getSessionToken() {
    if (this.sessionToken) {
      return this.sessionToken;
    }
    this.sessionToken = new google.maps.places.AutocompleteSessionToken();
    return this.sessionToken;
  }
}
