import Model from '../js/model.js';

describe('Model test', () => {
  const model = new Model();
  const uidPattern = expect.stringMatching(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
  );
  const testSite = 'http://some-test-site.com';
  const anotherSite = 'http://localhost:8080';

  it('Should return instanse of Model class', () => {
    expect(new Model() instanceof Model).toBe(true);
  });

  it('Should add items', () => {
    expect(model.saveItem(testSite)).toEqual({
      id: uidPattern,
      urlContent: testSite,
    });
  });

  it('Should define if item exists', () => {
    expect(model.itemExists(testSite)).toBe(true);
    expect(model.itemExists('http://some-weird-site.com')).toBe(false);
  });

  it('Should return all existing items', () => {
    expect(model.getExistingItems() instanceof Array).toBe(true);
    expect(model.getExistingItems()).toEqual([
      {
        id: uidPattern,
        urlContent: testSite,
      },
    ]);
  });

  it('Should delete item', () => {
    const id = model.saveItem(anotherSite).id;
    model.removeItem(id);
    expect(model.itemExists(anotherSite)).toBe(false);
  });
});
