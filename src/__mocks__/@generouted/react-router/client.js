// Mock for @generouted/react-router/client
const mockComponents = () => ({
  Link: 'MockedLink',
  Navigate: 'MockedNavigate',
});

const mockHooks = () => ({
  useModals: jest.fn(),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
});

const mockUtils = () => ({
  redirect: jest.fn(),
});

module.exports = {
  components: mockComponents,
  hooks: mockHooks,
  utils: mockUtils,
};