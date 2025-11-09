import { Component, signal, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly name = signal('Michele Scarciglia');
  protected readonly role = signal('Full Stack Developer');
  protected readonly environment = signal(this.getEnvironment());
  protected scrollY = signal(0);

  protected readonly projects = signal<Project[]>([
    {
      title: 'CI/CD Portfolio',
      description: 'Portfolio personale con CI/CD automatizzato su GitHub Actions, deploy su GitHub Pages con ambienti dev/prod separati.',
      technologies: ['Angular 20', 'GitHub Actions', 'Jest', 'TypeScript'],
      github: 'https://github.com/Mikes-not-found/test-github-actions',
      demo: 'https://michelescarciglia.com',
      image: '🚀'
    },
    {
      title: 'E-commerce Platform',
      description: 'Piattaforma e-commerce completa con gestione prodotti, carrello e pagamenti integrati con sistema di tracking ordini.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒'
    },
    {
      title: 'Task Management App',
      description: 'Applicazione per la gestione di task e progetti con team collaboration in tempo reale e dashboard analytics.',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      image: '✓'
    }
  ]);

  protected readonly skills = signal([
    'Angular', 'React', 'TypeScript', 'JavaScript',
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
    'Git', 'GitHub Actions', 'Docker', 'CI/CD'
  ]);

  ngOnInit(): void {
    this.setupParallax();
    this.setupScrollAnimations();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.scrollY.set(window.scrollY);
    this.updateParallaxElements();
  }

  private setupParallax(): void {
    // Initial setup
    this.updateParallaxElements();
  }

  private updateParallaxElements(): void {
    const scrolled = this.scrollY();

    // Update parallax backgrounds
    const hero = document.querySelector('.hero-bg') as HTMLElement;
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Reveal animations on scroll
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.75;
      if (isVisible) {
        el.classList.add('active');
      }
    });
  }

  private setupScrollAnimations(): void {
    // Intersection Observer for smooth reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 100);
  }

  private getEnvironment(): 'production' | 'development' {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '';
    return baseHref.includes('/dev/') ? 'development' : 'production';
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}
