
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit{
 // @Input() color:string ='blue';
 @Input() appHover:string ='blue;'

  //@Inject(DOCUMENT) document : Document
  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    //this.element.nativeElement.style.backgroundColor = this.color;  
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      //this.color
      this.appHover
    );
  }

  
  //If we want to perform operation s ased on the events perfromed on the parent control, the hostlistners will be used it will
  //listen to the every event of this particular directive parent control and perfrom the actions mentioned.
  @HostListener('mouseenter') onMouseEnter(){
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'green'
    );
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'yellow'
    );
  }

}
