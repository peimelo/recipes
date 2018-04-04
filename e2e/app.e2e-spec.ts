import { AjusteFrequenciaPage } from './app.po';

describe('ajuste-frequencia App', () => {
  let page: AjusteFrequenciaPage;

  beforeEach(() => {
    page = new AjusteFrequenciaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
