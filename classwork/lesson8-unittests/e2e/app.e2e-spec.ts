import { Lesson8UnittestsPage } from './app.po';

describe('lesson8-unittests App', () => {
  let page: Lesson8UnittestsPage;

  beforeEach(() => {
    page = new Lesson8UnittestsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
