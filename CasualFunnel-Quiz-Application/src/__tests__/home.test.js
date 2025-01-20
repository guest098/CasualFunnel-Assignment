global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve({ results: [{}, {}] }),
  });
});
test("mock api call", async () => {
  const res = await fetch("https://opentdb.com/api.php?amount=15");
  const data = await res.json();
  console.log(data);
  expect(data.results.length).toEqual(2);
});
