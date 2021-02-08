const fetchMock = require("jest-fetch-mock");

fetchMock.enableMocks();

process.env.LOOKUP_API_BASE_URL = "http://fake.test";
process.env.LOOKUP_API_PATH = "/some/fake/path";
