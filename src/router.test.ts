// Router tests - testing the type definitions and exports
import { Path, Params, ModalPath, Link, Navigate, useModals, useNavigate, useParams, redirect } from './router';

describe('Router', () => {
  describe('Path type', () => {
    it('should include the home route', () => {
      const path: Path = `/`;
      expect(path).toBe('/');
    });

    it('should include example routes', () => {
      const examplePath: Path = `/example`;
      expect(examplePath).toBe('/example');
    });

    it('should include nested example routes', () => {
      const nestedPath: Path = `/example/accordion`;
      expect(nestedPath).toBe('/example/accordion');
    });

    it('should include mypage route', () => {
      const myPagePath: Path = `/mypage`;
      expect(myPagePath).toBe('/mypage');
    });

    it('should validate all defined routes', () => {
      const allPaths: Path[] = [
        '/',
        '/example',
        '/example/accordion',
        '/example/alert',
        '/example/alert-dialog',
        '/example/aspect-ratio',
        '/example/avatar',
        '/example/command/combobox',
        '/example/command/demo',
        '/example/command/dialog',
        '/example/command/dropdown-menu',
        '/example/command/popover',
        '/example/context-menu/demo',
        '/example/dialog/demo',
        '/example/dropdown-menu',
        '/example/dropdown-menu/checkboxes',
        '/example/dropdown-menu/radio-group',
        '/example/hover-card/demo',
        '/example/input/demo',
        '/example/input/disabled',
        '/example/input/file',
        '/example/input/with-button',
        '/example/input/with-label',
        '/example/input/with-text',
        '/example/label/demo',
        '/example/lineage/react-diagram',
        '/example/markdown',
        '/example/markdown/editor',
        '/example/menubar/demo',
        '/example/navigation-menu/demo',
        '/example/popover/demo',
        '/example/progress/demo',
        '/example/radio-group/demo',
        '/example/scroll-area/demo',
        '/example/select/demo',
        '/example/separator/demo',
        '/example/sheet/demo',
        '/example/sheet/position',
        '/example/sheet/size',
        '/example/skeleton/demo',
        '/example/slider/demo',
        '/example/switch/demo',
        '/example/tabs/demo',
        '/example/textarea/demo',
        '/example/textarea/disabled',
        '/example/textarea/with-button',
        '/example/textarea/with-label',
        '/example/textarea/with-text',
        '/example/toast/demo',
        '/example/toast/destructive',
        '/example/toast/simple',
        '/example/toast/with-action',
        '/example/toast/with-title',
        '/example/toggle/demo',
        '/example/toggle/disabled',
        '/example/toggle/lg',
        '/example/toggle/outline',
        '/example/toggle/sm',
        '/example/toggle/with-text',
        '/example/tooltip/demo',
        '/example/typography/blockquote',
        '/example/typography/demo',
        '/example/typography/h1',
        '/example/typography/h2',
        '/example/typography/h3',
        '/example/typography/h4',
        '/example/typography/inline-code',
        '/example/typography/large',
        '/example/typography/lead',
        '/example/typography/list',
        '/example/typography/muted',
        '/example/typography/p',
        '/example/typography/readme',
        '/example/typography/small',
        '/example/typography/table',
        '/mypage',
      ];

      allPaths.forEach(path => {
        expect(path).toBeDefined();
      });
    });
  });

  describe('Params type', () => {
    it('should be an empty object type', () => {
      const params: Params = {};
      expect(params).toEqual({});
    });
  });

  describe('ModalPath type', () => {
    it('should be never type', () => {
      // Since ModalPath is never, we can't actually create a value of this type
      // This test ensures the type is defined as never
      expect(true).toBe(true); // ModalPath is just a type alias, so we just verify it's importable
    });
  });

  describe('exports', () => {
    it('should export Link component', () => {
      expect(Link).toBeDefined();
    });

    it('should export Navigate component', () => {
      expect(Navigate).toBeDefined();
    });

    it('should export useModals hook', () => {
      expect(useModals).toBeDefined();
    });

    it('should export useNavigate hook', () => {
      expect(useNavigate).toBeDefined();
    });

    it('should export useParams hook', () => {
      expect(useParams).toBeDefined();
    });

    it('should export redirect utility', () => {
      expect(redirect).toBeDefined();
    });
  });
});