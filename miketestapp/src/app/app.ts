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

interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
  type: 'work' | 'education';
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  logo?: string;
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
      title: 'Daisy App',
      description: 'Smart Task & Expense Manager - Gestione task quotidiani con integrazione Open Banking per tracciamento automatico delle spese e insights finanziari in tempo reale.',
      technologies: ['TypeScript', 'React Native', 'Node.js', 'MongoDB', 'Express', 'Open Banking API'],
      github: 'https://github.com/Mikes-not-found/daisy_app',
      image: 'https://raw.githubusercontent.com/Mikes-not-found/daisy_app/main/frontend/assets/dashboard.jpg'
    },
    {
      title: 'Social App',
      description: 'Clone di WhatsApp - Applicazione di messaggistica con comunicazione real-time, architettura scalabile con API backend, client frontend e layer WebSocket.',
      technologies: ['JavaScript', 'WebSocket', 'CSS', 'HTML', 'Node.js'],
      github: 'https://github.com/ProjectN23/SocialApp',
      image: '💬'
    },
    {
      title: 'Boat User',
      description: 'Applicazione Angular per la gestione barche - Frontend modulare con architettura component-based, testing integrato e interfaccia utente moderna.',
      technologies: ['Angular 15', 'TypeScript', 'SCSS', 'HTML', 'Karma'],
      github: 'https://github.com/ProjectN7/boat-user',
      image: '⛵'
    }
  ]);

  protected readonly skills = signal([
    'Angular', 'React', 'TypeScript', 'JavaScript',
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
    'Git', 'GitHub Actions', 'Docker', 'CI/CD'
  ]);

  protected readonly profileImage = '/1758729543920.jpg';

  protected readonly experiences = signal<Experience[]>([
    {
      role: 'Consultant',
      company: 'Deloitte',
      period: 'dic 2023 - Presente',
      location: 'Bari, Italia',
      description: 'Competenze: Java · JavaScript · React · React Native · ReactJS · Framework Spring · Spring · SQL',
      skills: ['Java', 'JavaScript', 'React', 'React Native', 'Spring Framework', 'SQL'],
      type: 'work'
    },
    {
      role: 'Custom Software Engineering Analyst',
      company: 'Accenture',
      period: 'giu 2023 - set 2023',
      location: 'Bari, Puglia, Italia',
      description: 'Competenze: TypeScript · JavaScript · Java · Framework Spring · NodeJS · Keycloak · PostgreSQL',
      skills: ['TypeScript', 'JavaScript', 'Java', 'Spring Framework', 'Node.js', 'Keycloak', 'PostgreSQL'],
      type: 'work'
    },
    {
      role: 'Docente di Informatica Corso Erasmus+',
      company: 'Cultura e Dintorni',
      period: 'apr 2021 - mag 2021',
      location: 'Martina Franca, Puglia, Italia',
      description: 'Gestione e presentazione corso di mobilità internazionale tenuto interamente in lingua inglese rivolto alla preparazione di studenti nello sviluppo e programmazione web. CMS, programmazione base (php-html-css), troubleshooting, protocolli di rete, studio del malware, spyware, sicurezza informatica.',
      skills: ['JavaScript', 'Node.js', 'Angular', 'Routing Protocol', 'CMS'],
      type: 'education'
    },
    {
      role: 'Docente di Informatica (Garanzia giovani)',
      company: 'WOOVI Italia',
      period: 'ott 2020 - nov 2020',
      location: 'Martina Franca, Puglia, Italia',
      description: 'Gestione e presentazione corso specializzante rivolto alla preparazione di studenti per certificazione informatica pubblica nazionale (Garanzia Giovani). Pacchetto office completo, creazioni siti web con CMS, programmazione base (php-html-css), troubleshooting, protocolli di rete, studio del malware, spyware, sicurezza informatica.',
      skills: ['Architettura di rete', 'Routing Protocol', 'HTML5', 'CSS', 'JavaScript'],
      type: 'education'
    },
    {
      role: 'Docente di informatica corso Erasmus+',
      company: 'Cultura e Dintorni',
      period: 'set 2020 - ott 2020',
      location: 'Martina Franca, Puglia, Italia',
      description: 'Gestione e presentazione corso di mobilità internazionale tenuto interamente in lingua inglese rivolto alla preparazione di studenti nello sviluppo e programmazione web. CMS, programmazione base (php-html-css), troubleshooting, protocolli di rete, studio del malware, spyware, sicurezza informatica.',
      skills: ['JavaScript', 'Node.js', 'Angular', 'Routing Protocol', 'CMS'],
      type: 'education'
    },
    {
      role: 'Web Master',
      company: 'Crea il tuo Business',
      period: 'gen 2019 - feb 2020',
      location: 'Crispiano',
      description: 'Creazione preventivi, Design di piccole-medie campagne pubblicitarie di marketing social, Creazione e gestione siti web per richiesta clienti, Design e personalizzare per ritenzione fedelta clienti, Videomaking pubblicitario.',
      skills: ['JavaScript'],
      type: 'work'
    },
    {
      role: 'Responsabile eCommerce',
      company: 'Boutique Max1960',
      period: 'gen 2017 - feb 2018',
      location: 'Conversano, Puglia, Italia',
      description: 'Gestione e amministrazione della parte eCommerce. Acqui dei miei compiti erano: Database MySql, creazione script in Piattaforma Magento, Gestione Prodotti e magazine, Creazione e invio Newsletter, Gestione di metioni fedelta clienti / Social',
      skills: [],
      type: 'work'
    }
  ]);

  protected readonly certifications = signal<Certification[]>([
    {
      name: 'Oracle Cloud Infrastructure 2024 Generative AI Certified Professional',
      issuer: 'Oracle',
      date: '2024',
      credentialUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=DEB88DD2B4B5DD265CC10B5D85CCCFEDE6831BF4FEC737808135F9C055AC72BB',
      logo: '🎓'
    }
  ]);

  ngOnInit(): void {
    this.setupParallax();
    this.setupScrollAnimations();
  }

  @HostListener('window:scroll')
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
