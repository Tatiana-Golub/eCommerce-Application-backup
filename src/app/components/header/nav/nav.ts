import { router } from '@app/router';
import BaseComponent from '@common-components/base-component';
//import { createH3, createImg, createButton } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import { NavItem } from './nav-item/nav-item';
import './nav.scss';

class NavComponent extends BaseComponent<HTMLDivElement> {
  private readonly homeBtn: BaseComponent<HTMLButtonElement>;
  private readonly storeBtn: BaseComponent<HTMLButtonElement>;
  private readonly aboutUsBtn: BaseComponent<HTMLButtonElement>;
  private readonly cartBtn: BaseComponent<HTMLButtonElement>;
  private readonly loginBtn: BaseComponent<HTMLButtonElement>;
  private readonly registerBtn: BaseComponent<HTMLButtonElement>;
  private readonly profileBtn: BaseComponent<HTMLButtonElement>;
  private readonly logoutBtn: BaseComponent<HTMLButtonElement>;

  constructor(id: string = 'nav-component', className: string = 'nav-component') {
    super(Tags.DIV, id, className);
    this.homeBtn = NavItem('home', 'button nav-item', 'home', 'Home');
    this.storeBtn = NavItem('store', 'button nav-item', 'store', 'Store');
    this.aboutUsBtn = NavItem('about-us', 'button nav-item', 'about-us', 'About Us');
    this.cartBtn = NavItem('cart', 'button nav-item', 'cart', 'Cart');
    this.loginBtn = NavItem('login', 'button nav-item', 'profile', 'Login');
    this.registerBtn = NavItem('register', 'button nav-item', 'register', 'Register');
    this.profileBtn = NavItem('profile', 'button nav-item hidden', 'profile', 'Profile');
    this.logoutBtn = NavItem('logout', 'button nav-item hidden', 'logout', 'Logout');

    this.init();
  }

  protected renderComponent(): void {
    this.homeBtn.appendTo(this.getElement());
    this.storeBtn.appendTo(this.getElement());
    this.aboutUsBtn.appendTo(this.getElement());
    this.cartBtn.appendTo(this.getElement());
    this.loginBtn.appendTo(this.getElement());
    this.registerBtn.appendTo(this.getElement());
    this.profileBtn.appendTo(this.getElement());
    this.logoutBtn.appendTo(this.getElement());
  }

  protected addEventListeners(): void {
    this.homeBtn.addEventListener('click', () => {
      router.navigate('#/main');
    });
    this.storeBtn.addEventListener('click', () => {
      router.navigate('#/store');
    });
    this.aboutUsBtn.addEventListener('click', () => {
      router.navigate('#/about-us');
    });
    this.cartBtn.addEventListener('click', () => {
      router.navigate('#/cart');
    });
    this.loginBtn.addEventListener('click', () => {
      router.navigate('#/login');
    });
    this.registerBtn.addEventListener('click', () => {
      router.navigate('#/register');
    });
    this.profileBtn.addEventListener('click', () => {
      router.navigate('#/profile');
    });
    this.logoutBtn.addEventListener('click', () => {
      // logout();
      // isLogined = false;
      router.navigate('#/main');
    });
  }
}

export const Nav = (): NavComponent => new NavComponent();
