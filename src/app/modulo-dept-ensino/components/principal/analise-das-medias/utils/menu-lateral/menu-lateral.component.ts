import {Component} from '@angular/core';



@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {

  ngAfterViewInit() {
    setTimeout(() => {
      (window as any).KTLayout?.init();
      (window as any).KTMenu?.init();
    }, 50);
  }

}
