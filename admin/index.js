const AdminBro = require('admin-bro');
const { Users, SalesData, Auctions, Requests, Views } = require('../models');
const { UserResource, CompanyResource } = require('./resources');
const sidebarGroups = {
  user: {
    name: 'User Management',
    icon: 'User',
  }
};
const adminBro = new AdminBro({
  rootPath: '/admin',
  loginPath: '/admin/login',
  resources: [{
      resource: Users,
      options: {
        ...UserResource,
        parent: sidebarGroups.users,
      }
    },
    { resource: SalesData, options: { listProperties: [
      'VIN', 'LotNumber', 'Make', 'ModelDetail', 'BodyStyle', 'Color'
    ] } },
    Auctions,
    Requests,
    Views,
  ],
  colors: {
    primary100: '#000'
  },
  dashboard: {
    handler: async () => {
      return { some: 'output' }
    },
    component: AdminBro.bundle('./dashboard.jsx'),
  },
  branding: {
    logo: 'https://autoastat.com/build/images/logo_temp_desktop.37bb5de7.svg',
    favicon: 'https://autoastat.com/favicon.ico',
    companyName: 'Panel administracyjny - Car AutoAstat Detector',
    softwareBrothers: false,
  },
  locale: {
    translations: {
      labels: {
        carhunter_prod: 'Linki',
        Salesdata: 'Przeglądaj samochody',
        Auctions: 'Wyniki aukcji',
        Users: 'Użytkownicy',
        Requests: 'Statystyki',
        Views: 'Wyświetlenia',
        navigation: 'Nawigacja',
        pages: 'Strony',
        selectedRecords: 'Zaznaczono ({{selected}})',
        filters: 'Filtry',
        adminVersion: 'Admin: {{version}}',
        appVersion: 'App: {{version}}',
        loginWelcome: 'Zapraszamy',
        email: 'Adres email',
        password: 'Hasło'
      },
      actions: {
        new: 'Stwórz nowy',
        edit: 'Edytuj',
        show: 'Zobacz więcej',
        delete: 'Usuń',
        bulkDelete: 'Usuń wszystko',
        list: 'Lista',
      },
      buttons: {
        save: 'Zapisz',
        confirmRemovalMany_1: 'Potwierdź usunięcie {{count}} rekordu',
        confirmRemovalMany_2: 'Potwierdź usunięcie {{count}} rekordów',
        addNewItem: 'Add New Item',
        filter: 'Filtruj',
        applyChanges: 'Akceptuj zmiany',
        resetFilter: 'Resetuj',
        confirmRemovalMany: 'Potwierdź usunięcie {{count}} rekordów',
        confirmRemovalMany_plural: 'Potwierdź usunięcie {{count}} rekordów',
        logout: 'Wyloguj się',
        login: 'Zaloguj się',
        createFirstRecord: 'Utwórz pierwszy rekord',
      },
      properties: {
        length: 'Długość',
        from: 'Od',
        to: 'Do',
      },
      messages: {
        noRecords: 'Brak rekordów',
        successfullyBulkDeleted: 'Usunięto {{count}} rekordów',
        successfullyBulkDeleted_plural: 'Usunięto {{count}} rekordów',
        successfullyDeleted: 'Usunięto rekord',
        successfullyUpdated: 'Zaktualizowano rekord',
      },
      resources: {
        Auctions: {
          properties: {
            Make: 'Marka',
            ModelGroup: 'Seria',
            ModelDetail: 'Detale',
            BodyStyle: 'Rodzaj',
            Color: 'Kolor'
          }
        }
      }
    },
  },
});

module.exports = adminBro;