import { Component, OnInit, Inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DOCUMENT, Location } from '@angular/common';
import { Meta, Title, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PropiedadesService } from '../../../../services/propiedades/propiedades.service';
import { environment } from '../../../../../environments/environment';
import { slugify } from '../../../../shared/utils/slug';

interface PropiedadImagen {
  id: number;
  imagen: string;
  orden: number;
}

interface Propiedad {
  id: number;
  nombre: string;
  descripcion: string | null;
  tipo: string;
  operacion: 'Venta' | 'Renta';
  estado: string;
  municipio: string;
  colonia: string;
  calle: string | null;
  numero: string | null;
  precio: number;
  moneda: string;
  recamaras: number | null;
  banos: number | null;
  estacionamiento: number | null;
  m2_construccion: number | null;
  m2_terreno: number | null;
  antiguedad: number | null;
  niveles: number | null;
  imagenes: PropiedadImagen[];
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrl: './propiedades.component.scss'
})
export class PropiedadesComponent implements OnInit {

  propiedad: Propiedad | null = null;
  loading = true;
  notFound = false;

  liked = false;
  shared = false;

  toggleLike(): void {
    this.liked = !this.liked;
  }

  openItem: string | null = 'detalles';

  toggle(id: string): void {
    this.openItem = this.openItem === id ? null : id;
  }

  isOpen(id: string): boolean {
    return this.openItem === id;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private propiedadesService: PropiedadesService,
    private meta: Meta,
    private title: Title,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      this.notFound = true;
      return;
    }

    this.propiedadesService.show(+id).subscribe({
      next: (res: any) => {
        this.propiedad = res.data;
        this.notFound = !res.success;
        this.loading = false;
        if (this.propiedad) {
          this.setSeoTags(this.propiedad);
          this.normalizeUrl(this.propiedad);
        }
      },
      error: () => {
        this.loading = false;
        this.notFound = true;
      },
    });
  }

  /** Ruta relativa "bonita" de esta propiedad (incluye el nombre como slug), para compartir. */
  private slugPath(p: Propiedad): string {
    return `/view/propiedad/${p.id}/${slugify(p.nombre)}`;
  }

  /**
   * Si llegaron sin slug o con uno desactualizado (ej. /view/propiedad/12),
   * corrige la URL visible en el navegador sin recargar el componente.
   */
  private normalizeUrl(p: Propiedad): void {
    const desired = this.slugPath(p);
    if (this.location.path() !== desired) {
      this.location.replaceState(desired);
    }
  }

  /** URL canónica y permanente de esta propiedad, usada para SEO y para compartir. */
  canonicalUrl(): string {
    if (!this.propiedad) return this.document.location.origin;
    return `${this.document.location.origin}${this.slugPath(this.propiedad)}`;
  }

  private setSeoTags(p: Propiedad): void {
    const url = this.canonicalUrl();
    const descripcion = p.descripcion ?? `${p.tipo} en ${p.operacion.toLowerCase()} en ${this.ubicacion()}`;

    this.title.setTitle(`${p.nombre} | Inmobiness`);

    this.meta.updateTag({ name: 'description', content: descripcion });
    this.meta.updateTag({ property: 'og:title', content: p.nombre });
    this.meta.updateTag({ property: 'og:description', content: descripcion });
    this.meta.updateTag({ property: 'og:image', content: this.imagenPrincipal() });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'product' });

    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  async compartir(): Promise<void> {
    const p = this.propiedad;
    if (!p) return;

    const shareData = {
      title: p.nombre,
      text: `${p.nombre} - $${this.formatPrecio()} ${p.moneda}`,
      url: this.canonicalUrl(),
    };

    if ((navigator as any).share) {
      try {
        await (navigator as any).share(shareData);
        return;
      } catch {
        // el usuario canceló el share nativo; seguimos con el fallback
      }
    }

    await navigator.clipboard.writeText(shareData.url);
    this.shared = true;
    setTimeout(() => (this.shared = false), 2000);
  }

  imagenPrincipal(): string {
    if (!this.propiedad?.imagenes?.length) {
      return 'https://placehold.co/800x600?text=' + encodeURIComponent(this.propiedad?.tipo ?? 'Propiedad');
    }
    const base = environment.appUrl.replace(/\/api\/?$/, '');
    return `${base}/api/propiedad_imagenes/${this.propiedad.imagenes[0].imagen}`;
  }

  ubicacion(): string {
    if (!this.propiedad) return '';
    const { colonia, municipio, estado } = this.propiedad;
    return `${colonia}, ${municipio}, ${estado}`;
  }

  /** Dirección completa para el mapa: calle y número si existen, más colonia/municipio/estado. */
  direccionCompleta(): string {
    if (!this.propiedad) return '';
    const { calle, numero } = this.propiedad;
    const calleNumero = [calle, numero].filter(Boolean).join(' ');
    return [calleNumero, this.ubicacion()].filter(Boolean).join(', ');
  }

  mapUrl(): SafeResourceUrl {
    const query = encodeURIComponent(this.direccionCompleta());
    const url = `https://www.google.com/maps?q=${query}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  formatPrecio(): string {
    if (!this.propiedad) return '';
    return this.propiedad.precio.toLocaleString('es-MX', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
}
