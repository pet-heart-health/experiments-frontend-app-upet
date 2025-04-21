import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, FloatLabelModule, CardModule, InputTextModule, PasswordModule, FormsModule, DividerModule, ButtonModule, CarouselModule],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {
  value: string | undefined;
  images: any[] = [];
  ngOnInit() {
    this.images = [
      { src: 'https://media.istockphoto.com/id/509052128/es/foto/oro-retriever-sentado-en-frente-de-un-fondo-blanco.jpg?s=612x612&w=0&k=20&c=NGPFMmj2NtcHUjsDf_zWKdjxUtqPz6GgDFyYfABtyY8=', alt: 'Golden Retriever 1' },
      { src: 'https://media.istockphoto.com/id/1482199015/es/foto/feliz-cachorro-galés-corgi-14-semanas-de-edad-perro-guiñando-un-ojo-jadeando-y-sentado-aislado.jpg?s=612x612&w=0&k=20&c=lX65jf64HFLnR8XDD7pphv5KVRMmBCNTQBvzggRvQ14=', alt: 'Golden Retriever 2' },
      { src: 'https://media.istockphoto.com/id/1318666271/es/foto/yorkshire-terrier-perro-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=X6xDljpOY04O7211-pkN4iwXpPYI9lW_XvSZZRrcQI0=', alt: 'Yorkshire Terrier' },
      { src: 'https://media.istockphoto.com/id/1346381655/es/foto/perro-de-montaña-bernés-tricolor-sentado-mirando-a-la-cámara-y-jadeando-aislado-sobre-blanco.jpg?s=612x612&w=0&k=20&c=uCaKLCR-Ddm2NyqemP54J_g4ZdH0NZbz_szFgQjEz1w=', alt: 'Beagle' }
    ];
 }
}
