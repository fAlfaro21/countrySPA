import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: []
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  //El debouncer es un tipo especial de observable
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  //Propiedad placeholder
  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  //Evento que el padre va a poder escuchar de este componente
  @Output()
  public onValue = new EventEmitter<string>();

  //Evento que el padre va a poder escuchar de este componente
  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        value => {
          this.onDebounce.emit( value );
        }
      );
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue( value: string ): void {
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ): void {
    this.debouncer.next( searchTerm );
  }
}
