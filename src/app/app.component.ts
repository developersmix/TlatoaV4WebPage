import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', [
        animate('1s ease-in-out')
      ])
    ]),
    trigger('slideInFromLeft', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-50px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', [
        animate('1s ease-out')
      ])
    ]),
    trigger('scaleUp', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden => visible', [
        animate('1s cubic-bezier(0.215, 0.61, 0.355, 1)')
      ])
    ])
  ]
})
export class AppComponent {
  title = 'Tlatoa';
  year = new Date().getFullYear();

  @ViewChildren('animatedSection') sections!: QueryList<ElementRef>;

  sectionStates: { [key: string]: string } = {};

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScroll();
  }

  ngAfterViewInit() {
    this.checkScroll();
  }

  checkScroll() {
    this.sections.forEach((section, index) => {
      const element = section.nativeElement;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.75 && rect.bottom >= 0) {
        this.sectionStates[index] = 'visible';
      } else {
        this.sectionStates[index] = 'hidden';
      }
    });
  }
}
