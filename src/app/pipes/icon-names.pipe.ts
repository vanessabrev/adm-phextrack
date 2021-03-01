import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconNames'
})
export class IconNamesPipe implements PipeTransform {

  transform(value: string): string {

    switch (value) {
      case "all": value = "Todos"; break;
      case "action": value = "Ações"; break;
      case "alert": value = "Alertas"; break;
      case "av": value = "AV"; break;
      case "communication": value = "Comunicação"; break;
      case "content": value = "Conteúdos"; break;
      case "device": value = "Dispositivos"; break;
      case "editor": value = "Editores"; break;
      case "file": value = "Arquivos"; break;
      case "hardware": value = "Hardware"; break;
      case "home": value = "Home"; break;
      case "image": value = "Imagens"; break;
      case "maps": value = "Mapas"; break;
      case "navigation": value = "Navegação"; break;
      case "notification": value = "Notificações"; break;
      case "places": value = "Lugares"; break;
      case "search": value = "Pesquisas"; break;
      case "social": value = "Social"; break;
      case "toggle": value = "Botão (Toggle)"; break;
    }

    return value;
  }

}
