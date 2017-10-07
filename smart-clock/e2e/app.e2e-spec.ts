import { SmartClockPage } from './app.po';

describe('smart-clock App', () => {
  let page: SmartClockPage;

  beforeEach(() => {
    page = new SmartClockPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
