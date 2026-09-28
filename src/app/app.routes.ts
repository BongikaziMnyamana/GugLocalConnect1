import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginCustomerComponent } from './pages/login-customer/login-customer.component';
import { LoginBusinessComponent } from './pages/login-business/login-business.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SignupCustomerComponent } from './pages/signup-customer/signup-customer.component';
import { SignupBusinessComponent } from './pages/signup-business/signup-business.component';
import { DashboardCustomerComponent } from './pages/dashboard-customer/dashboard-customer.component';
import { DashboardBusinessComponent } from './pages/dashboard-business/dashboard-business.component';
import { SearchComponent } from './pages/search/search.component';
import { BusinessDetailComponent } from './pages/business-detail/business-detail.component';
import { ChatComponent } from './pages/chat/chat.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { BookingComponent } from './pages/booking/booking.component';
import { AddServiceComponent } from './pages/add-service/add-service.component';
import { MyServicesComponent } from './pages/my-services/my-services.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

// Mirrors the page flow from the original README (customer flow / business flow / signup flow)
export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'login/customer', component: LoginCustomerComponent },
  { path: 'login/business', component: LoginBusinessComponent },

  { path: 'signup', component: SignupComponent },
  { path: 'signup/customer', component: SignupCustomerComponent },
  { path: 'signup/business', component: SignupBusinessComponent },

   { path: 'dashboard', component: DashboardCustomerComponent, canActivate: [authGuard, roleGuard], data: { role: 'CUSTOMER' } },
  { path: 'dashboard/business', component: DashboardBusinessComponent, canActivate: [authGuard, roleGuard], data: { role: 'BUSINESS_OWNER' } },

  { path: 'search', component: SearchComponent },
  { path: 'business/:id', component: BusinessDetailComponent },
  { path: 'chat/:businessId', component: ChatComponent, canActivate: [authGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [authGuard] },
  { path: 'booking/:businessId', component: BookingComponent, canActivate: [authGuard] },

    { path: 'add-service', component: AddServiceComponent, canActivate: [authGuard] },
  { path: 'my-services', component: MyServicesComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];
