import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly name = signal('Michele Scarciglia');
  protected readonly role = signal('Full Stack Developer');
  protected readonly environment = signal(this.getEnvironment());

  protected readonly projects = signal<Project[]>([
    {
      title: 'CI/CD Portfolio',
      description: 'Portfolio personale con CI/CD automatizzato su GitHub Actions, deploy su GitHub Pages con ambienti dev/prod separati.',
      technologies: ['Angular 20', 'GitHub Actions', 'Jest', 'TypeScript'],
      github: 'https://github.com/Mikes-not-found/test-github-actions',
      demo: 'https://michelescarciglia.com'
    },
    {
      title: 'E-commerce Platform',
      description: 'Piattaforma e-commerce completa con gestione prodotti, carrello e pagamenti.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    },
    {
      title: 'Task Management App',
      description: 'Applicazione per la gestione di task e progetti con team collaboration.',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    }
  ]);

  protected readonly skills = signal([
    'Angular', 'React', 'TypeScript', 'JavaScript',
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
    'Git', 'GitHub Actions', 'Docker', 'CI/CD'
  ]);

  private getEnvironment(): 'production' | 'development' {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '';
    return baseHref.includes('/dev/') ? 'development' : 'production';
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}
